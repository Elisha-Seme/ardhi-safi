"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Users,
    MessageSquare,
    LogOut,
    ChevronRight,
    Building2
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Hero Slides", href: "/admin/hero", icon: ImageIcon },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Leads", href: "/admin/leads", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) return <>{children}</>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-xl">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold">AS</span>
                        </div>
                        <span className="font-heading text-lg tracking-tight">Ardhi Safi</span>
                    </Link>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-4 font-bold">Administration</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-4">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-accent text-primary shadow-lg shadow-accent/20"
                                    : "hover:bg-white/5 text-white/70 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon size={18} className={isActive ? "text-primary" : "text-accent"} />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </div>
                                {isActive && <ChevronRight size={14} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <LogOut size={18} className="text-red-400" />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-primary p-4 flex items-center justify-between sticky top-0 z-50">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                            <span className="text-primary text-[10px] font-bold">AS</span>
                        </div>
                        <span className="font-heading text-white tracking-tight">Ardhi Safi Admin</span>
                    </Link>
                    <button onClick={() => signOut()} className="p-2 text-red-400 font-bold uppercase tracking-widest text-[10px]">
                        Log Out
                    </button>
                </header>

                <div className="p-6 md:p-10 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
