import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeBreadcrumbItem from '@theme-original/DocBreadcrumbs/Items/Home';

// Her platformun kendi kenar çubuğu olduğu için, sayfanın ait olduğu platform
// ana sayfa simgesinden hemen sonra breadcrumb olarak gösterilir.
const PLATFORMS = [
  {path: '/docs/flexostack-cloud', to: '/docs/flexostack-cloud', label: {tr: 'FlexoStack Cloud', en: 'FlexoStack Cloud'}},
  {path: '/docs/object-storage', to: '/docs/object-storage', label: {tr: 'Object Storage', en: 'Object Storage'}},
  {path: '/docs/genel', to: '/docs/genel', label: {tr: 'Genel', en: 'General'}},
];

export default function HomeBreadcrumbItemWrapper(props) {
  const {pathname} = useLocation();
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'en' ? 'en' : 'tr';
  const found = PLATFORMS.find((p) => pathname.includes(p.path));
  // Platformun kendi ana sayfasında tekrar gösterme
  const platform = found && !pathname.replace(/\/$/, '').endsWith(found.to) ? found : null;
  return (
    <>
      <HomeBreadcrumbItem {...props} />
      {platform && (
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={platform.to}>
            <span>{platform.label[locale]}</span>
          </Link>
        </li>
      )}
    </>
  );
}
