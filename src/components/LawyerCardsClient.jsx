"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 16,
        },
    },
};

export default function LawyerCardsClient({ lawyers }) {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {lawyers.map((lawyer) => (
                <motion.article
                    key={lawyer._id}
                    variants={cardVariants}
                    whileHover={{ 
                        y: -12,
                        scale: 1.02,
                    }}
                    className="group overflow-hidden rounded-3xl border border-white/20 dark:border-white/5 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-xl transition-[box-shadow,background-color,border-color] duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.05)]"
                >
                    {/* Image Area */}
                    <div className="relative h-72 w-full overflow-hidden">
                        <Image
                            src={lawyer.image}
                            alt={lawyer.name}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        
                        {/* Shimmer gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/0 to-zinc-950/30 opacity-80" />

                        {/* Floating elements inside image */}
                        <div className="absolute top-4 left-4 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white border border-white/20">
                            ⚖️ {lawyer.specialization}
                        </div>

                        <div className="absolute top-4 right-4 rounded-full bg-emerald-500/80 backdrop-blur-md p-1.5 text-white border border-emerald-400/30 shadow">
                            <ShieldCheck size={16} />
                        </div>

                        {/* Name on image bottom */}
                        <div className="absolute bottom-4 left-5 right-5 text-white">
                            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                                <Star size={13} className="fill-current" />
                                <span>4.9 (120 reviews)</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-white">
                                {lawyer.name}
                            </h3>
                        </div>
                    </div>

                    {/* Content area */}
                    <div className="p-6 space-y-6">
                        <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed min-h-[60px]">
                            {lawyer.bio}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-5">
                            <div>
                                <p className="text-[10px] tracking-wider uppercase text-slate-400 dark:text-zinc-500 font-bold">Consultation Fee</p>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                                    ${lawyer.fee}
                                </p>
                            </div>

                            <Link
                                href={`/browselawyers/${lawyer._id}`}
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-indigo-500 dark:to-violet-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 active:scale-95 transition-all duration-200"
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
