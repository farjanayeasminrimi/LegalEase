"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-all duration-500 px-6 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-black/10 dark:bg-white/10 blur-3xl rounded-full" />
            <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-black/10 dark:bg-white/10 blur-3xl rounded-full" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl p-10 text-center transition-all duration-500">

                <h1 className="text-[120px] leading-none font-black tracking-tight text-black dark:text-white">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    Lost in Space
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-[1.02] transition"
                    >
                        <Home className="w-4 h-4" />
                        Back Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>

                {/* Bottom Line */}
                <div className="mt-10 flex justify-center">
                    <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-black dark:via-white to-transparent opacity-30" />
                </div>
            </div>
        </div>
    );
}