import { LayoutDashboard, Package, Users, UtensilsCrossed, Palette, FileText, Shield, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "../store";
import UserProfileSection from "./UserProfile";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  // { icon: UtensilsCrossed, label: "Product", path: "/product" },
  { icon: Package, label: "Stock", path: "/product" },
  { icon: Users, label: "Customer", path: "/customer" },
  // { icon: UtensilsCrossed, label: "Restaurant", path: "/restaurant" },
  { icon: Palette, label: "Purchase", path: "/pesanan" },
  { icon: FileText, label: "Report", path: "/report" },
  { icon: Shield, label: "Role & Admin", path: "/role-admin" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40" onClick={close} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isOpen ? "w-64" : "lg:w-16"}
        bg-white shadow-lg border-r border-gray-200
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              {isOpen && <span className="text-xl font-bold text-gray-800">Square</span>}
            </div>

            {/* Close button for mobile */}
            <button onClick={close} className="lg:hidden p-1 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && close()}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors
                    ${isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}
                    ${!isOpen ? "justify-center" : ""}
                  `}
                  title={!isOpen ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                  {isActive && !isOpen && <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</div>}
                </Link>
              );
            })}
          </nav>

          {/* Integration Section */}
          {isOpen && <UserProfileSection />}
        </div>
      </aside>
    </>
  );
}
