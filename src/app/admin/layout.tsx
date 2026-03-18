"use client";

import { useState } from "react";
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
    Building2,
    Menu,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Hero Slides", href: "/admin/hero", icon: ImageIcon },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Leads", href: "/admin/leads", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    if (isLoginPage) return <>{children}</>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* ── Desktop Sidebar ── */}
            <aside className="w-64 bg-primary text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-xl flex-shrink-0">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">AS</span>
                        </div>
                        <span className="font-heading text-lg tracking-tight">Ardhi Safi</span>
                    </Link>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-4 font-bold">Administration</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
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

            {/* ── Main Content ── */}
            <main className="flex-1 relative flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-primary text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-[10px] font-bold">AS</span>
                        </div>
                        <span className="font-heading text-white tracking-tight text-base">Ardhi Safi</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-white/50 text-[10px] uppercase tracking-widest hidden sm:block">Admin</span>
                        <button
                            onClick={() => setMobileNavOpen(true)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Open navigation"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </header>

                {/* Mobile Nav Drawer */}
                <AnimatePresence>
                    {mobileNavOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                                onClick={() => setMobileNavOpen(false)}
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed inset-y-0 left-0 w-72 bg-primary text-white z-50 flex flex-col shadow-2xl lg:hidden"
                            >
                                {/* Drawer Header */}
                                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                    <Link href="/" className="flex items-center gap-3" onClick={() => setMobileNavOpen(false)}>
                                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                                            <span className="text-primary font-bold text-sm">AS</span>
                                        </div>
                                        <div>
                                            <span className="font-heading text-lg tracking-tight block">Ardhi Safi</span>
                                            <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Administration</span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => setMobileNavOpen(false)}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Drawer Nav */}
                                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                                    {sidebarLinks.map((link) => {
                                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setMobileNavOpen(false)}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive
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

                                {/* Drawer Footer */}
                                <div className="p-4 border-t border-white/10">
                                    <button
                                        onClick={() => { setMobileNavOpen(false); signOut({ callbackUrl: "/admin/login" }); }}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                    >
                                        <LogOut size={18} className="text-red-400" />
                                        <span className="text-sm font-medium">Log Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Page Content */}
                <div className="p-4 sm:p-6 md:p-10 pb-24 lg:pb-10 min-w-0">
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
