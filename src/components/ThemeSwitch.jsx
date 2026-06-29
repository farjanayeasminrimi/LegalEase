"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const current = theme === "system" ? resolvedTheme : theme;

    return (
        <button
            onClick={() =>
                setTheme(current === "dark" ? "light" : "dark")
            }
            className="
                p-2 rounded-md
                bg-gray-200 dark:bg-gray-800
                text-gray-900 dark:text-white
                transition-all duration-300
                hover:scale-105 cursor-pointer
            "
            aria-label="Toggle theme"
        >
            {current === "dark" ? (
                <Sun size={18} />
            ) : (
                <Moon size={18} />
            )}
        </button>
    );
}