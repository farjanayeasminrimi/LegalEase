"use client";

import { motion } from "framer-motion";

const practiceAreas = [
    { name: "Family Law", icon: "❤️", color: "from-rose-500/20 to-pink-500/20", border: "hover:border-rose-500/30", glow: "group-hover:bg-rose-500/10 text-rose-500" },
    { name: "Criminal Law", icon: "⚖️", color: "from-amber-500/20 to-orange-500/20", border: "hover:border-amber-500/30", glow: "group-hover:bg-amber-500/10 text-amber-500" },
    { name: "Property Law", icon: "🏠", color: "from-violet-500/20 to-purple-500/20", border: "hover:border-violet-500/30", glow: "group-hover:bg-violet-500/10 text-violet-500" },
    { name: "Corporate Law", icon: "🏢", color: "from-emerald-500/20 to-teal-500/20", border: "hover:border-emerald-500/30", glow: "group-hover:bg-emerald-500/10 text-emerald-500" },
    { name: "Immigration Law", icon: "✈️", color: "from-cyan-500/20 to-blue-500/20", border: "hover:border-cyan-500/30", glow: "group-hover:bg-cyan-500/10 text-cyan-500" },
    { name: "Civil Litigation", icon: "📜", color: "from-indigo-500/20 to-violet-500/20", border: "hover:border-indigo-500/30", glow: "group-hover:bg-indigo-500/10 text-indigo-500" },
];

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
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    return (
        <section className="relative py-24 px-6 overflow-hidden bg-slate-50 dark:bg-[#0B1220] transition-colors duration-300">
            {/* Background Glows */}
            <div className="absolute w-96 h-96 -top-20 -left-20 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute w-96 h-96 -bottom-20 -right-20 bg-fuchsia-500/20 dark:bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
                        Our Domains
                    </span>
                    <h2 className="text-3xl font-extrabold mt-3 text-gray-900 dark:text-white md:text-4xl">
                        Practice Areas
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {practiceAreas.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                rotate: 0.5,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`
                                group relative overflow-hidden
                                rounded-3xl p-8 cursor-pointer
                                border border-zinc-200 dark:border-white/5
                                bg-white/45 dark:bg-zinc-900/30 backdrop-blur-xl
                                ${item.border}
                                shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl
                                transition-all duration-300
                            `}
                        >
                            {/* Inner glow gradient border effect on hover */}
                            <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                            <div className="flex items-center justify-between mb-6">
                                <div className="text-4xl">{item.icon}</div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-zinc-200/50 dark:bg-white/5 ${item.glow} transition-colors duration-300`}>
                                    →
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 dark:text-white text-left group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-zinc-400 text-left mt-3 leading-relaxed">
                                Get expert legal support and representation in all aspects of {item.name.toLowerCase()}.
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}