"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scale } from "lucide-react";
import { motion } from "framer-motion";

import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";
import ThemeSwitch from "./ThemeSwitch";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Browse Lawyers", href: "/browselawyers" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-white/20 dark:border-white/5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <nav className="mx-auto flex h-16 items-center justify-between gap-4 px-6">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-label="Toggle menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-white/20 dark:hover:bg-white/10 transition lg:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: [-6, 6, -6, 6, 0] }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                        >
                            <Scale size={20} className="stroke-[2.2]" />
                        </motion.div>

                        <motion.span 
                            className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                            animate={{
                                backgroundPosition: ["0% center", "200% center"]
                            }}
                            transition={{
                                duration: 4,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                        >
                            LegalEase
                        </motion.span>
                    </Link>
                </div>

                {/* DESKTOP LINKS */}
                <div className="hidden lg:flex items-center gap-1 rounded-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.03] p-1">
                    {NAV_LINKS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                        ? "text-zinc-900 dark:text-zinc-900 font-semibold"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 rounded-lg bg-white dark:bg-white shadow-sm z-0"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* SEARCH */}
                <div className="hidden lg:block flex-1 max-w-sm">
                    <SearchBar />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    <ThemeSwitch />
                    <UserAvatar />
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl transition-all duration-300 rounded-b-2xl ${
                    menuOpen ? "max-h-[500px] border-t border-zinc-200/50 dark:border-white/5 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-4 p-4">
                    <SearchBar />

                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}