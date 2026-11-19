import {useEffect} from 'react';
import Layout from '@theme-original/DocItem/Layout';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {setToc} from '@site/src/components/SidebarToc/store';

// Sayfanın başlıklarını, kenar çubuğunda aktif sayfanın altında gösterilmek üzere yayınlar.
export default function LayoutWrapper(props) {
  const {toc, frontMatter} = useDoc();
  useEffect(() => {
    setToc(frontMatter.hide_table_of_contents ? null : toc);
    return () => setToc(null);
  }, [toc, frontMatter.hide_table_of_contents]);
  return <Layout {...props} />;
}
