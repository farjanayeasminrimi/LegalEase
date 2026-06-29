"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterLawyer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            params.set("search", e.target.value);
        } else {
            params.delete("search");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSpecialization = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value !== "all") {
            params.set("specialization", e.target.value);
        } else {
            params.delete("specialization");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSort = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            params.set("sort", e.target.value);
        } else {
            params.delete("sort");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mb-12 p-4 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl grid grid-cols-1 gap-4 md:grid-cols-3 shadow-sm">
            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
                />

                <input
                    type="text"
                    placeholder="Search lawyer name or area..."
                    defaultValue={searchParams.get("search") || ""}
                    onChange={handleSearch}
                    className="w-full h-12 rounded-xl pl-11 pr-4 text-sm text-slate-900 dark:text-white outline-none glass-input"
                />
            </div>

            {/* Filter */}
            <select
                defaultValue={searchParams.get("specialization") || "all"}
                onChange={handleSpecialization}
                className="w-full h-12 rounded-xl px-4 text-sm text-slate-700 dark:text-zinc-300 outline-none cursor-pointer glass-input"
            >
                <option value="all" className="bg-white dark:bg-zinc-900">All Specializations</option>
                <option value="Family Law" className="bg-white dark:bg-zinc-900">Family Law</option>
                <option value="Criminal Law" className="bg-white dark:bg-zinc-900">Criminal Law</option>
                <option value="Property Law" className="bg-white dark:bg-zinc-900">Property Law</option>
                <option value="Corporate Law" className="bg-white dark:bg-zinc-900">Corporate Law</option>
                <option value="Immigration Law" className="bg-white dark:bg-zinc-900">Immigration Law</option>
                <option value="Civil Litigation" className="bg-white dark:bg-zinc-900">Civil Litigation</option>
            </select>

            {/* Sort */}
            <select
                defaultValue={searchParams.get("sort") || ""}
                onChange={handleSort}
                className="w-full h-12 rounded-xl px-4 text-sm text-slate-700 dark:text-zinc-300 outline-none cursor-pointer glass-input"
            >
                <option value="" className="bg-white dark:bg-zinc-900">Sort By Fee</option>
                <option value="low" className="bg-white dark:bg-zinc-900">Fee: Low → High</option>
                <option value="high" className="bg-white dark:bg-zinc-900">Fee: High → Low</option>
            </select>
        </div>
    );
};

export default FilterLawyer;