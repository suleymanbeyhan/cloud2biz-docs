import {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Sağ altta "yukarı çık" düğmesi (Hetzner Docs gibi). Sayfa biraz kaydırılınca görünür.
export default function BackToTop() {
  const {i18n} = useDocusaurusContext();
  const label = i18n.currentLocale === 'en' ? 'Back to top' : 'Yukarı çık';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`c2b-back-to-top${show ? ' c2b-back-to-top--show' : ''}`}
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M12 7.6 4.7 14.9l1.4 1.4L12 10.4l5.9 5.9 1.4-1.4Z" />
      </svg>
    </button>
  );
}
