import Header from '@theme-original/Navbar/MobileSidebar/Header';
import SearchBar from '@theme/SearchBar';

// Mobil menü: logonun altına Hetzner tarzı arama kutusu ekler.
export default function MobileSidebarHeader(props) {
  return (
    <>
      <Header {...props} />
      <div className="mobile-sidebar-search">
        <SearchBar />
      </div>
    </>
  );
}
