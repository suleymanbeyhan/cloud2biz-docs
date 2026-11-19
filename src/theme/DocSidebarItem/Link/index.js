import {useEffect, useState, useSyncExternalStore} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import LinkItem from '@theme-original/DocSidebarItem/Link';
import {getServerToc, getToc, subscribe} from '@site/src/components/SidebarToc/store';

/*
 * Hetzner Docs gibi: "İçindekiler" sağda değil, kenar çubuğunda açık sayfanın hemen
 * altında gösterilir. Kaydırdıkça bulunulan başlık vurgulanır.
 */
const MAX_LEVEL = 3;
const clean = (p) => decodeURI(p || '').replace(/\/$/, '');

function useActiveHeading(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!ids.length) return undefined;
    const onScroll = () => {
      const offset = 120;
      let found = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) found = id;
      }
      setActive(found);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

function SidebarToc({toc}) {
  const items = toc.filter((h) => h.level <= MAX_LEVEL);
  const active = useActiveHeading(items.map((h) => h.id));
  if (!items.length) return null;
  return (
    <li className="sidebar-toc-wrap">
      <ul className="sidebar-toc">
        {items.map((h) => (
          <li key={h.id} className={`sidebar-toc__item sidebar-toc__item--l${h.level}`}>
            <Link
              to={`#${h.id}`}
              className={`sidebar-toc__link${active === h.id ? ' sidebar-toc__link--active' : ''}`}
              dangerouslySetInnerHTML={{__html: h.value}}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function LinkWrapper(props) {
  const {pathname} = useLocation();
  const toc = useSyncExternalStore(subscribe, getToc, getServerToc);
  const isCurrent = props.item.docId && clean(props.item.href) === clean(pathname);
  return (
    <>
      <LinkItem {...props} />
      {isCurrent && toc && toc.length > 0 && <SidebarToc toc={toc} />}
    </>
  );
}
