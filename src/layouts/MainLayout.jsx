import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSidebarStore } from "../store";

export default function MainLayout() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main
          className={`
          flex-1 overflow-auto p-6 transition-all duration-300
          ${isOpen ? "lg:ml-0" : "lg:ml-0"}
        `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
