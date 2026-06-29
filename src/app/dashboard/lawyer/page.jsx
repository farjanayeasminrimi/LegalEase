"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, FileText, Scale, ArrowRight, ShieldCheck, DollarSign, Calendar } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LawyerPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const quickStats = [
        { label: "Pending Hires", value: "3 Requests", icon: Briefcase, color: "from-blue-500/10 to-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
        { label: "Total Completed", value: "24 Hires", icon: ShieldCheck, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
        { label: "Accrued Revenue", value: "$4,850", icon: DollarSign, color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400" }
    ];

    const actions = [
        { title: "Review Hiring Requests", desc: "Inspect and manage your current hiring requests, details, and billing status.", href: "/dashboard/lawyer/hiring-history", icon: Briefcase, actionText: "Manage Hires" },
        { title: "Manage Professional Profile", desc: "Update your profile biography, specialization tags, images, and consultation fees.", href: "/dashboard/lawyer/manage-legal-profile", icon: FileText, actionText: "Edit Profile" },
        { title: "Schedule Consultations", desc: "Manage your client booking schedule, consultation links, and availability logs.", href: "#", icon: Calendar, actionText: "Manage Calendar" }
    ];

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Welcome Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-white/20 dark:border-white/5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white p-8 md:p-10 shadow-xl"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[70px] -mr-20 -mt-20 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
                            <Scale size={12} />
                            Counselor Console
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Welcome, Counselor {user?.name || "Lawyer"}
                        </h1>
                        <p className="text-blue-100 text-sm max-w-xl">
                            Track client hiring inquiries, review your billing reports, update your professional bio page, and manage your consultation fees and focus areas easily.
                        </p>
                    </div>
                    <Link 
                        href="/dashboard/lawyer/manage-legal-profile"
                        className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white text-indigo-600 px-6 py-4 font-bold text-sm shadow-lg shadow-black/10 hover:bg-slate-100 active:scale-95 transition-all duration-200"
                    >
                        Edit Legal Profile
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {quickStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="p-6 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md flex items-center gap-5 shadow-sm"
                        >
                            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shrink-0`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">{stat.label}</p>
                                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">{stat.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Actions panel */}
            <div className="space-y-4">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">Workspace Shortcuts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {actions.map((act, idx) => {
                        const Icon = act.icon;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx + 3) * 0.08, duration: 0.5 }}
                                className="group p-6 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div>
                                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 flex items-center justify-center mb-5 shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white">{act.title}</h3>
                                    <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400 mt-2.5">{act.desc}</p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-white/5">
                                    <Link 
                                        href={act.href} 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 group/link"
                                    >
                                        {act.actionText}
                                        <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}