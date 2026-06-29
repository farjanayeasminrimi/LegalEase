"use client";

import { useState } from "react";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";
import { Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail("");
    };

    return (
        <footer className="border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 transition-colors">

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-3">

                {/* Column 1 */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                            <Scale size={16} />
                        </div>
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
                        >
                            LegalEase
                        </motion.span>
                    </div>

                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                        © {new Date().getFullYear()} MyWebsite. All rights reserved.
                    </p>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                        Quick Links
                    </h3>

                    <ul className="mt-3 space-y-2 text-sm">
                        {["About", "Contact", "Privacy Policy"].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                        Newsletter
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Subscribe to get updates.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full rounded-l-lg border
                                border-zinc-300 dark:border-white/10
                                bg-white dark:bg-white/[0.05]
                                px-3 py-2 text-sm
                                text-zinc-900 dark:text-white
                                outline-none transition
                                focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20
                            "
                        />

                        <button
                            type="submit"
                            className="
                                rounded-r-lg px-4 text-sm font-medium
                                bg-zinc-900 dark:bg-white
                                text-white dark:text-black
                                hover:bg-zinc-700 dark:hover:bg-zinc-200
                                transition
                            "
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-zinc-200 dark:border-white/10 px-6 py-4">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

                    {/* Social */}
                    <div className="flex gap-4 text-zinc-600 dark:text-zinc-400">
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
                            <LogoFacebook size={18} />
                        </a>
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
                            <LogoLinkedin size={18} />
                        </a>
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
                            <LogoGithub size={18} />
                        </a>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        Built with React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}