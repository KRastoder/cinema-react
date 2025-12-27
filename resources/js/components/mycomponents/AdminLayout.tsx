import React from "react";
import AdminSideBar from "./AdminSideBar";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-950">
        {children}
      </main>
    </div>
  );
}
