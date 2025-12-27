import { HomeIcon, Popcorn, } from "lucide-react";
import { usePage } from '@inertiajs/react';
import { SharedData } from "resources/js/types/index";
import VideoCameraOutlinedIcon from "./VideoCameraOutlinedIcon";

export default function AdminSideBar() {
    const menuItems = [
        { label: "Home", href: "/admin", icon: HomeIcon },
        { label: "Halls", href: "/admin/halls", icon: Popcorn },
        { label: "Movies", href: "/admin/movies", icon: VideoCameraOutlinedIcon },
        { label: "Shows", href: "/admin/shows", icon: HomeIcon },
    ];

    const { auth } = usePage<SharedData>().props;

    return (
        <aside className="h-max w-64  text-gray-300 p-4 flex flex-col">
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
                {menuItems.map((item) => {
                    // Assign the icon to a capitalized variable name so React recognizes it as a component
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-800 hover:text-white transition "
                        >
                            {/* Render the specific icon for this item */}
                            <Icon size={18} />
                            {item.label}
                        </a>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-4 text-xs text-gray-500">
                Cinema Admin Panel
            </div>
        </aside>
    );
}
