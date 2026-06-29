"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    History, 
    User, 
    MessageSquare, 
    Briefcase, 
    FileText, 
    Users, 
    CreditCard, 
    BarChart3, 
    LogOut, 
    Menu, 
    X, 
    ArrowLeft, 
    Scale 
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export const dashboardLinks = {
    client: [
        { label: "Overview", path: "/dashboard/user", icon: LayoutDashboard },
        { label: "Hiring History", path: "/dashboard/user/hiring-history", icon: History },
        { label: "Update Profile", path: "/dashboard/user/update-profile", icon: User },
        { label: "Comments", path: "/dashboard/user/comments", icon: MessageSquare },
    ],
    lawyer: [
        { label: "Overview", path: "/dashboard/lawyer", icon: LayoutDashboard },
        { label: "Hiring Requests", path: "/dashboard/lawyer/hiring-history", icon: Briefcase },
        { label: "Manage Legal Profile", path: "/dashboard/lawyer/manage-legal-profile", icon: FileText },
    ],
    admin: [
        { label: "Overview", path: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Manage Users", path: "/dashboard/admin/manage-users", icon: Users },
        { label: "All Transactions", path: "/dashboard/admin/all-transactions", icon: CreditCard },
        { label: "Analytics", path: "/dashboard/admin/analytics", icon: BarChart3 },
    ],
};

export default function DashboardClient({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const { data: session, isPending, error } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1220]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin border-4 border-indigo-500 border-t-transparent rounded-full shadow-lg" />
                    <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Loading your legal workspace...</p>
                </div>
            </div>
        );
    }

    if (error || !session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1220]">
                <div className="rounded-2xl border border-red-100 dark:border-red-950/30 bg-white dark:bg-zinc-900/40 backdrop-blur px-8 py-6 text-center shadow-lg">
                    <h2 className="text-lg font-bold text-red-600">Session unavailable</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 mb-4">Please log in to access the dashboard.</p>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const user = session.user;
    const role = (user.role || "client").toLowerCase();
    const links = dashboardLinks[role] || [];

    // Role specific styles
    const roleConfig = {
        admin: {
            badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
            text: "Admin Console",
            orb: "bg-amber-500/10 dark:bg-amber-500/5",
        },
        lawyer: {
            badge: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
            text: "Legal Counsel",
            orb: "bg-blue-500/10 dark:bg-blue-500/5",
        },
        client: {
            badge: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
            text: "Client Account",
            orb: "bg-violet-500/10 dark:bg-violet-500/5",
        }
    }[role] || {
        badge: "bg-gray-500 text-white",
        text: "Client Account",
        orb: "bg-indigo-500/10 dark:bg-indigo-500/5",
    };

    const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-[#0B1220] dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
            {/* Background Glows */}
            <div className={`absolute w-[600px] h-[600px] -top-40 -right-40 rounded-full blur-[140px] pointer-events-none ${roleConfig.orb}`} />
            <div className="absolute w-[600px] h-[600px] -bottom-40 -left-40 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

            {/* SIDEBAR */}
            <aside className="hidden md:flex w-72 flex-col bg-white/60 dark:bg-[#0F1629]/40 backdrop-blur-xl border-r border-slate-200/50 dark:border-white/5 relative z-20">
                {/* Brand Header */}
                <div className="p-6 border-b border-slate-200/50 dark:border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                            <Scale size={16} />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                            LegalEase
                        </span>
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="p-6 border-b border-slate-200/50 dark:border-white/5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/25 shrink-0">
                        {userInitial}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-extrabold text-slate-800 dark:text-white truncate text-sm">{user.name}</p>
                        <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${roleConfig.badge}`}>
                            {roleConfig.text}
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-1">
                    {links.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                                    isActive
                                        ? "text-indigo-600 dark:text-white font-bold font-semibold"
                                        : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeSidebarNav"
                                        className="absolute inset-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 border-l-4 border-indigo-600 z-0"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <Icon size={18} className={`relative z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-500"}`} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Bottom Action */}
                <div className="p-4 border-t border-slate-200/50 dark:border-white/5 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                    >
                        <ArrowLeft size={14} />
                        Back to Main Site
                    </Link>
                    
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={18} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* MAIN PANEL */}
            <div className="flex-1 flex flex-col relative z-10 min-w-0">

                {/* MOBILE BAR */}
                <header className="md:hidden flex items-center justify-between px-6 h-16 border-b border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-[#0F1629]/70 backdrop-blur-xl shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow">
                            <Scale size={14} />
                        </div>
                        <span className="text-lg font-black bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                            LegalEase
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </header>

                {/* MOBILE DRAWER */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 left-0 h-full w-72 bg-white/95 dark:bg-[#0F1629]/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col md:hidden"
                            >
                                <div className="p-6 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                                            <Scale size={16} />
                                        </div>
                                        <span className="text-lg font-black bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                                            LegalEase
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)} 
                                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Drawer Profile Card */}
                                <div className="p-6 border-b border-slate-200/50 dark:border-white/5 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25">
                                        {userInitial}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-extrabold text-slate-800 dark:text-white truncate text-sm">{user.name}</p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${roleConfig.badge}`}>
                                            {roleConfig.text}
                                        </span>
                                    </div>
                                </div>

                                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                                    {links.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.path;

                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-indigo-500/10 text-indigo-600 dark:text-white font-bold border-l-4 border-indigo-600"
                                                        : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white"
                                                }`}
                                            >
                                                <Icon size={18} className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-500"} />
                                                <span>{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                <div className="p-4 border-t border-slate-200/50 dark:border-white/5 space-y-2">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to Main Site
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-200"
                                    >
                                        <LogOut size={18} />
                                        Sign out
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* CHILDREN CONTAINER */}
                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}