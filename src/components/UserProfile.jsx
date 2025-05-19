import React from "react";
import { LogOut } from "lucide-react";

const UserProfileSection = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      {/* User Profile */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
          {/* Using placeholder image for avatar */}
          <img  src="/akun.png" alt="User Avatar" className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Savannah N</h3>
          <p className="text-xs text-gray-500">Food Quality Manager</p>
        </div>
      </div>

      {/* Logout Button */}
      <button className="flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-100 rounded-lg bg-red-50 transition-colors w-full">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default UserProfileSection;
