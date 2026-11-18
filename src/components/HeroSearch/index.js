import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {__RouterContext as RouterContext} from 'react-router';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SearchBar from '@theme/SearchBar';
import styles from './styles.module.css';

/*
 * Kategori seçmeli büyük arama kutusu.
 * Kategoriler docusaurus.config.js içindeki searchContextByPaths ile aynı olmalıdır.
 * Seçilen kategori, arama eklentisine o platformun sayfasındaymış gibi gösterilir;
 * böylece anlık öneriler yalnızca o platformun dokümanlarından gelir.
 */
const CATEGORIES = [
  {id: '', label: {tr: 'Tümü', en: 'All'}},
  {id: 'docs/intro', label: {tr: 'Genel', en: 'General'}},
  {id: 'docs/flexostack-cloud', label: {tr: 'FlexoStack Cloud', en: 'FlexoStack Cloud'}},
  {id: 'docs/object-storage', label: {tr: 'Object Storage', en: 'Object Storage'}},
];

const T = {
  tr: {search: 'Ara', category: 'Kategori'},
  en: {search: 'Search', category: 'Category'},
};

export default function HeroSearch() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'en' ? 'en' : 'tr';
  const t = T[locale];
  const history = useHistory();
  const router = useContext(RouterContext);
  const baseUrl = useBaseUrl('/');
  const searchPage = useBaseUrl('/search');

  const [ctx, setCtx] = useState('');
  const [open, setOpen] = useState(false);
  const pendingValue = useRef('');
  const wrapRef = useRef(null);

  // Arama eklentisine seçilen platformun adresini gösteren sahte konum
  const routerValue = useMemo(() => {
    if (!ctx || !router) return router;
    return {...router, location: {...router.location, pathname: `${baseUrl}${ctx}/`, search: '', hash: ''}};
  }, [ctx, router, baseUrl]);

  // Dışarı tıklanınca menüyü kapat
  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  // Kategori değişince yazılan metni koru ve aramayı yeniden çalıştır.
  // Arama kutusu React tarafından yönetildiği için değer, React'in de göreceği
  // şekilde (yerel setter + input olayı) yazılır; dizin yüklenince arama tetiklenir.
  useEffect(() => {
    const value = pendingValue.current;
    if (!value) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    const getInput = () => wrapRef.current?.querySelector('.hero-searchbox input');
    const write = (input) => {
      setter.call(input, value);
      input.dispatchEvent(new Event('input', {bubbles: true}));
    };
    let tries = 0;
    let poll;
    const start = setTimeout(() => {
      const input = getInput();
      if (!input) return;
      write(input);
      input.focus();
      poll = setInterval(() => {
        const el = getInput();
        tries += 1;
        if (el && el.classList.contains('aa-input')) {
          clearInterval(poll);
          if (el.value !== value) write(el);
          el.dispatchEvent(new Event('input', {bubbles: true}));
        } else if (tries > 40) {
          clearInterval(poll);
        }
      }, 150);
    }, 60);
    return () => {
      clearTimeout(start);
      clearInterval(poll);
    };
  }, [ctx]);

  const choose = (id) => {
    pendingValue.current = wrapRef.current?.querySelector('.hero-searchbox input')?.value || '';
    setCtx(id);
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const input = wrapRef.current?.querySelector('.hero-searchbox input');
    const q = (input?.value || '').trim();
    if (!q) {
      input?.focus();
      return;
    }
    const params = new URLSearchParams({q});
    if (ctx) params.set('ctx', ctx);
    history.push(`${searchPage}?${params.toString()}`);
  };

  const current = CATEGORIES.find((c) => c.id === ctx) ?? CATEGORIES[0];

  return (
    <form ref={wrapRef} className={styles.row} onSubmit={submit} role="search">
      <div className={styles.category}>
        <button
          type="button"
          className={styles.categoryBtn}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t.category}
          onClick={() => setOpen((o) => !o)}>
          {current.label[locale]}
          <span className={styles.caret} aria-hidden="true" />
        </button>
        {open && (
          <ul className={styles.menu} role="listbox" aria-label={t.category}>
            {CATEGORIES.map((c) => (
              <li key={c.id || 'all'}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.id === ctx}
                  className={c.id === ctx ? styles.active : undefined}
                  onClick={() => choose(c.id)}>
                  {c.label[locale]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`hero-searchbox ${styles.box}`}>
        <RouterContext.Provider value={routerValue}>
          <SearchBar key={ctx || 'all'} />
        </RouterContext.Provider>
      </div>

      <button type="submit" className={styles.submit}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M10 2a8 8 0 0 1 6.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
        </svg>
        {t.search}
      </button>
    </form>
  );
}
