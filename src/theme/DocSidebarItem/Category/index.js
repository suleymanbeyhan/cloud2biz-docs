import Category from '@theme-original/DocSidebarItem/Category';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Hetzner Docs gibi: açılan her kategorinin en üstünde "Tümünü göster" bağlantısı.
export default function CategoryWrapper(props) {
  const {i18n} = useDocusaurusContext();
  const {item} = props;
  if (!item.href) return <Category {...props} />;
  const showAll = {
    type: 'link',
    label: i18n.currentLocale === 'en' ? 'Show all' : 'Tümünü göster',
    href: item.href,
    className: 'sidebar-show-all',
    unlisted: false,
  };
  return <Category {...props} item={{...item, items: [showAll, ...item.items]}} />;
}
