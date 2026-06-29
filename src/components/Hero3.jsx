"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
    {
        q: "How can I hire a lawyer?",
        a: "You can browse our list of experienced lawyers, view their profiles, check their specialization and consultation fees, and hire the lawyer that best fits your legal needs."
    },
    {
        q: "What types of legal services are available?",
        a: "Our platform provides access to lawyers specializing in Criminal Law, Family Law, Corporate Law, Immigration Law, Property Law, Civil Litigation, and many other legal fields."
    },
    {
        q: "How do consultation fees work?",
        a: "Each lawyer sets their own consultation fee. The fee is displayed on the lawyer's profile, allowing you to compare options and choose a lawyer that matches your budget."
    },
    {
        q: "Is my personal information secure?",
        a: "Yes. We take privacy and security seriously. Your personal information and legal discussions are handled securely and shared only when necessary to provide legal services."
    },
    {
        q: "Can I view a lawyer's profile before hiring?",
        a: "Absolutely. You can review each lawyer's profile, including their experience, specialization, biography, and consultation fee before making a hiring decision."
    },
    {
        q: "How do I contact a hired lawyer?",
        a: "After successfully hiring a lawyer, you will gain access to their contact information and can communicate with them regarding your legal matter."
    }
];

function FAQItem({ item, isOpen, onClick, index }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen 
                    ? "border-indigo-500 bg-white/70 dark:bg-zinc-900/60 shadow-[0_10px_30px_rgba(99,102,241,0.06)]" 
                    : "border-zinc-200 dark:border-white/5 bg-white/45 dark:bg-zinc-900/25 hover:border-zinc-300 dark:hover:border-white/10 shadow-sm"
            } backdrop-blur-xl mb-4`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 transition-colors ${isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-500"}`} />
                    <span className="font-bold text-base text-gray-800 dark:text-white leading-relaxed">
                        {item.q}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-slate-500 dark:text-zinc-400"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-200/50 dark:border-white/5 mt-1 ml-9">
                            {item.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Hero3() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-slate-50 dark:bg-[#0B1220] transition-colors duration-300 border-t border-zinc-200/50 dark:border-white/5">
            {/* Background Glow */}
            <div className="absolute w-[450px] h-[450px] bottom-10 left-10 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl font-extrabold mt-3 text-gray-900 dark:text-white md:text-4xl">
                        Common Legal Queries
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto mt-4 rounded-full" />
                </div>

                <div className="w-full">
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index}
                            item={item}
                            index={index}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}