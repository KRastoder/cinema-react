import { HomeIcon } from "lucide-react";
import { usePage } from '@inertiajs/react';
import { SharedData } from "resources/js/types/index";

export default function AdminSideBar() {
    const menuItems = [
        { label: "Home", href: "/admin" },
        { label: "Halls", href: "/admin/halls" },
        { label: "Movies", href: "/admin/movies" },
        { label: "Shows", href: "/admin/shows", },
    ];

    const { auth } = usePage<SharedData>().props;

    return (
        <aside className="h-screen w-64  text-gray-300 p-4 flex flex-col">
            {/* Profile */}
            <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-white">
                    {auth.user?.name?.charAt(0).toUpperCase() || '#'}
                </div>
                <div>
                    <h4 className="font-semibold text-white">{auth.user?.name || 'Admin'}</h4>
                    <p className="text-xs text-gray-400">{auth.user?.email}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-900 hover:text-white transition"
                    >
                        <HomeIcon size={18} />
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-4 text-xs text-gray-500">
                Cinema Admin Panel
            </div>
        </aside>
    );
}
