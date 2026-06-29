"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ArrowRight, Briefcase, GraduationCap } from "lucide-react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function LawyerListClient({ lawyers }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
        >
            {lawyers.map((lawyer, index) => (
                <motion.article
                    key={lawyer._id || index}
                    variants={cardVariants}
                    whileHover={{ 
                        x: 8,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-900/35 backdrop-blur-xl p-6 transition-[box-shadow,background-color,border-color] duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_15px_35px_rgba(99,102,241,0.03)]"
                >
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Image wrapper */}
                        <div className="relative h-40 w-full md:w-40 shrink-0 overflow-hidden rounded-2xl border border-white/20 dark:border-white/5">
                            {lawyer.image && (
                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.name || "Lawyer Profile"}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            )}
                            
                            <div className="absolute top-2 left-2 rounded-full bg-black/45 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white border border-white/10">
                                {lawyer.specialization}
                            </div>
                        </div>

                        {/* Middle Content */}
                        <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                    {lawyer.name}
                                </h2>

                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                                    <ShieldCheck size={12} />
                                    Verified
                                </span>
                            </div>

                            <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                {lawyer.bio}
                            </p>

                            {/* Info row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-500 font-semibold pt-2">
                                <div className="flex items-center gap-1.5">
                                    <Star size={14} className="fill-amber-400 text-amber-400" />
                                    <span className="text-slate-700 dark:text-zinc-300">4.9</span>
                                    <span>(120 reviews)</span>
                                </div>
                                <div className="h-3 w-px bg-zinc-200 dark:bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <Briefcase size={14} />
                                    <span>10+ Years Exp</span>
                                </div>
                                <div className="h-3 w-px bg-zinc-200 dark:bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <GraduationCap size={14} />
                                    <span>Harvard Law</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content / Actions */}
                        <div className="w-full md:w-auto shrink-0 flex md:flex-col items-between md:items-end justify-between gap-4 border-t md:border-t-0 border-zinc-200/50 dark:border-white/5 pt-4 md:pt-0">
                            <div className="text-left md:text-right">
                                <p className="text-[10px] tracking-wider uppercase text-slate-400 dark:text-zinc-500 font-bold">Consultation Fee</p>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                                    ${lawyer.fee}
                                </p>
                            </div>

                            <Link
                                href={`/browselawyers/${lawyer._id}`}
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-indigo-500 dark:to-violet-500 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/10 hover:brightness-110 active:scale-95 transition-all duration-200"
                            >
                                View Profile
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    );
}
