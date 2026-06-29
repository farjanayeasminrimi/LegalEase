import FilterLawyer from "@/components/FilterLawyer";
import { getAllLawyers } from "@/lib/api/data";
import Link from "next/link";
import LawyerListClient from "@/components/LawyerListClient";

const Lawyers = async ({ searchParams }) => {
    // 1. Fetch data from your API helper
    const rawData = await getAllLawyers();

    // 2. Comprehensive check for backend array wrappers
    let lawyerdata = [];
    if (Array.isArray(rawData)) {
        lawyerdata = rawData;
    } else if (rawData && typeof rawData === 'object') {
        lawyerdata = rawData.data || rawData.lawyers || rawData.result || [];
    }

    const params = await searchParams;

    const search = params?.search?.toLowerCase() || "";
    const specialization = params?.specialization || "";
    const sort = params?.sort || "";

    // 3. PAGINATION CONFIGURATION
    const currentPage = Number(params?.page) || 1;
    const itemsPerPage = 3; 

    let filteredLawyers = [...lawyerdata];

    // Search
    if (search) {
        filteredLawyers = filteredLawyers.filter(
            (lawyer) =>
                lawyer.name?.toLowerCase().includes(search) ||
                lawyer.specialization?.toLowerCase().includes(search)
        );
    }

    // Filter by specialization
    if (specialization && specialization !== "all") {
        filteredLawyers = filteredLawyers.filter(
            (lawyer) => lawyer.specialization === specialization
        );
    }

    // Sort by fee
    if (sort === "low") {
        filteredLawyers.sort((a, b) => Number(a.fee || 0) - Number(b.fee || 0));
    }
    if (sort === "high") {
        filteredLawyers.sort((a, b) => Number(b.fee || 0) - Number(a.fee || 0));
    }

    // 4. PAGINATION CALCULATIONS
    const totalItems = filteredLawyers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedLawyers = filteredLawyers.slice(startIndex, endIndex);

    const createPageURL = (pageNumber) => {
        const query = new URLSearchParams();
        if (search) query.set("search", search);
        if (specialization) query.set("specialization", specialization);
        if (sort) query.set("sort", sort);
        query.set("page", pageNumber);
        return `/browselawyers?${query.toString()}`;
    };

    return (
        <section className="relative min-h-screen bg-slate-50 dark:bg-[#0B1220] overflow-hidden transition-colors duration-300">
            {/* Drifting background glow blobs */}
            <div className="absolute w-[500px] h-[500px] top-10 right-10 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] bottom-10 left-10 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16">

                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">
                            ⚖ Legal Experts Network
                        </span>

                        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                            Find Trusted Lawyers
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Browse verified lawyers by specialization, experience, and consultation fee.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-zinc-300 shadow-sm backdrop-blur-xl shrink-0">
                        ✨ {totalItems} Experts Available
                    </div>
                </div>

                <div className="mb-10"> 
                    <FilterLawyer />
                </div>

                {paginatedLawyers.length ? (
                    <>
                        <LawyerListClient lawyers={paginatedLawyers} />

                        {/* 5. PAGINATION NAVIGATION CONTROLS */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex items-center justify-center gap-3">
                                {/* Previous Page Button */}
                                <Link
                                    href={createPageURL(currentPage - 1)}
                                    className={`flex h-12 items-center justify-center rounded-2xl border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-zinc-900/30 px-5 text-sm font-bold shadow-sm backdrop-blur-md transition-all ${currentPage <= 1
                                        ? "pointer-events-none opacity-30"
                                        : "hover:bg-slate-100 dark:hover:bg-white/10"
                                        }`}
                                >
                                    ← Prev
                                </Link>

                                {/* Page Number Buttons */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                    <Link
                                        key={pageNumber}
                                        href={createPageURL(pageNumber)}
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-extrabold shadow-sm transition-all ${currentPage === pageNumber
                                            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                            : "border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-zinc-900/30 hover:bg-slate-100 dark:hover:bg-white/10"
                                            }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                ))}

                                {/* Next Page Button */}
                                <Link
                                    href={createPageURL(currentPage + 1)}
                                    className={`flex h-12 items-center justify-center rounded-2xl border border-zinc-200/80 dark:border-white/5 bg-white/40 dark:bg-zinc-900/30 px-5 text-sm font-bold shadow-sm backdrop-blur-md transition-all ${currentPage >= totalPages
                                        ? "pointer-events-none opacity-30"
                                        : "hover:bg-slate-100 dark:hover:bg-white/10"
                                        }`}
                                >
                                    Next →
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-white/10 bg-white/30 dark:bg-zinc-900/10 p-16 text-center shadow-sm backdrop-blur-md">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            No lawyers found
                        </h2>
                        <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
                            {search ? `No lawyer matches "${search}".` : "No lawyers available at the moment."}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Lawyers;