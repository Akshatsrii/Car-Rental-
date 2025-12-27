import { Outlet } from "react-router-dom";
import Sidebar from "../../components/owner/Sidebar";
import NavbarOwner from "../../components/owner/NavbarOwner";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <NavbarOwner />

        {/* PAGE CONTENT */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* SMALL FOOTER */}
        <footer className="border-t border-borderColor text-center py-3 text-xs text-gray-500">
          © {new Date().getFullYear()} CarRental Admin Panel
        </footer>
      </div>
    </div>
  );
};

export default Layout;
