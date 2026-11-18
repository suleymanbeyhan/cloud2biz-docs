import DocSidebarDesktop from '@theme-original/DocSidebar/Desktop';
import SearchBar from '@theme/SearchBar';

export default function DocSidebarDesktopWrapper(props) {
  return (
    <>
      <div className="sidebar-search"><SearchBar /></div>
      <DocSidebarDesktop {...props} />
    </>
  );
}
