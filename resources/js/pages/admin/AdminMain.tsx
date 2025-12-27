import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/components/mycomponents/AdminLayout";

const AdminMain = () => {
  return (
    <>
      <Head title="Admin Dashboard" />

      <div className="flex flex-col items-start p-6 space-y-4 text-white">
        <h1 className="text-3xl font-bold">Hello, Admin</h1>
        <p className="text-gray-300">Welcome to your dashboard!</p>
      </div>
    </>
  );
};

AdminMain.layout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminMain;
