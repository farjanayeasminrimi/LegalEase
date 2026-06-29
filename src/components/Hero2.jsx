import Link from "next/link";
import { getAllLawyers } from "@/lib/api/data";
import LawyerCardsClient from "./LawyerCardsClient";

const Hero2 = async () => {
  const alldata = await getAllLawyers();
  const lawyers = alldata?.lawyers?.slice(0, 6) || [];
  
  return (
    <section className="relative py-24 bg-white dark:bg-[#0B1220] overflow-hidden transition-colors duration-300 border-t border-zinc-200/50 dark:border-white/5">
      {/* Background Glows */}
      <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">
            ⚖ Featured Experts
          </span>
          <h2 className="text-3xl font-extrabold mt-3 text-gray-900 dark:text-white md:text-4xl">
            Top Legal Experts
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Connect with experienced, hand-picked and verified lawyers who achieve results.
          </p>
        </div>

        <LawyerCardsClient lawyers={lawyers} />

        <div className="mt-16 text-center">
          <Link
            href="/browselawyers"
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-white/10 px-8 py-4 font-bold text-sm bg-white/40 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition duration-300 shadow-sm active:scale-95"
          >
            Explore All Lawyers
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
