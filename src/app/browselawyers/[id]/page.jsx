import React from "react";
import Image from "next/image";
import { getLawyerById } from "@/lib/actions.js/action";

import {
    BadgeCheck,
    Star,
    Clock3,
    Globe,
    BriefcaseBusiness,
    CalendarDays,
    ShieldCheck,
    Scale,
    GraduationCap,
    ChevronRight,
    Sparkles,
    UserCheck,
    MapPin,
    Award
} from "lucide-react";

import AllComment from "@/components/AllComment";
import CommentClient from "@/components/CommentClient";
import Hirelawyer from "@/components/hirelawyers/Hirelawyer";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const fallbackBio = "This professional has not provided a summary yet.";

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 px-5 py-4 hover:border-indigo-500/20 hover:bg-white/60 dark:hover:bg-zinc-900/30 hover:shadow-sm transition-all duration-300">
            <span className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-zinc-400">
                <Icon size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                {label}
            </span>

            <span className="text-right text-sm font-bold text-slate-900 dark:text-white">
                {value}
            </span>
        </div>
    );
}

function StatCard({ icon: Icon, value, label, color }) {
    return (
        <div className="relative group overflow-hidden rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-zinc-900/30 p-5 shadow-sm backdrop-blur-md text-center transition-all duration-300 hover:border-indigo-500/20 hover:shadow-md">
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20 -mr-4 -mt-4 bg-${color}-500`} />
            <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 text-slate-700 dark:text-zinc-300">
                <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="mt-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">{label}</p>
        </div>
    );
}

export default async function LawyerDetailsPage({ params }) {
    const { id } = await params;
    const lawyer = await getLawyerById(id);
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userRole = session?.user?.role;
    
    if (!lawyer) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 dark:bg-[#0B1220] px-6">
                <div className="rounded-3xl border border-red-100 dark:border-red-950/30 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl px-10 py-8 text-center shadow-xl max-w-md">
                    <div className="mx-auto h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 mb-4">
                        ⚠️
                    </div>
                    <h2 className="text-xl font-bold text-red-650 dark:text-red-500">
                        Lawyer Profile Unreachable
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
                        This profile may have been removed, or the URL address contains structural errors.
                    </p>
                    <a href="/browselawyers" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-650 hover:bg-indigo-600 text-white px-6 py-3 text-sm font-semibold transition-all">
                        Browse Other Lawyers
                    </a>
                </div>
            </main>
        );
    }

    const joinDate = lawyer.createdAt
        ? new Date(lawyer.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    const bio = lawyer.bio || fallbackBio;

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Drifting background glows */}
            <div className="absolute w-[600px] h-[600px] -top-80 -left-60 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute w-[600px] h-[600px] bottom-10 right-10 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 space-y-10">
                
                {/* HERO BOARD */}
                <section className="relative overflow-hidden rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl p-6 md:p-10 shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="grid gap-8 md:grid-cols-[260px_1fr] items-center">
                        {/* LEFT (Portrait Card) */}
                        <div className="space-y-5">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-white dark:border-white/10 shadow-xl group">
                                <Image
                                    src={lawyer.image || "/default-avatar.png"}
                                    alt={lawyer.name}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-103"
                                    sizes="260px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            
                            {userRole !== "lawyer" && (
                                <div className="w-full">
                                    <Hirelawyer hirelawyer={lawyer} />
                                </div>
                            )}
                        </div>

                        {/* RIGHT (Identity details) */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                                    Active Now
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 backdrop-blur-md">
                                    <ShieldCheck size={13} />
                                    Verified Counsel
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                                        {lawyer.name}
                                    </h1>
                                    <BadgeCheck size={26} className="text-blue-500 shrink-0" />
                                </div>
                                <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent inline-block">
                                    {lawyer.specialization} Expert
                                </p>
                            </div>

                            {/* Brief Stats Row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <Star size={15} className="fill-amber-400 text-amber-400" />
                                    <span className="font-extrabold text-slate-800 dark:text-white">4.9</span>
                                    <span>(120 Client Reviews)</span>
                                </div>
                                <div className="h-3 w-px bg-zinc-300 dark:bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={15} />
                                    <span>Supreme Court Chambers</span>
                                </div>
                                <div className="h-3 w-px bg-zinc-300 dark:bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <Award size={15} />
                                    <span>Senior Partner</span>
                                </div>
                            </div>

                            {/* Stat Tiles */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                <StatCard icon={Clock3} value={`$${lawyer.fee}`} label="Per Consultation" color="indigo" />
                                <StatCard icon={BriefcaseBusiness} value="10+ Years" label="Experience Level" color="blue" />
                                <StatCard icon={Scale} value="300+" label="Cases Resolved" color="emerald" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* TWO COLUMN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT (2/3 columns): Narrative details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Biography */}
                        <section className="p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl shadow-lg space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50 dark:border-white/5">
                                <Sparkles size={18} className="text-indigo-500" />
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
                                    Professional Narrative
                                </h2>
                            </div>
                            <p className="leading-relaxed text-sm md:text-base text-slate-600 dark:text-zinc-300">
                                {bio}
                            </p>
                        </section>

                        {/* Focus area */}
                        <section className="p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl shadow-lg space-y-6">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50 dark:border-white/5">
                                <Scale size={18} className="text-indigo-500" />
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
                                    Practice Domains
                                </h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[lawyer.specialization, "Contract Negotiation", "Litigation & Appeals", "Preventative Counsel"].map((focus) => (
                                    <div
                                        key={focus}
                                        className="flex items-center justify-between rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-zinc-900/30 px-5 py-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/60 dark:hover:bg-zinc-900/40 hover:translate-x-1"
                                    >
                                        <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">{focus}</span>
                                        <ChevronRight size={16} className="text-slate-400" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Credentials Timeline */}
                        <section className="p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl shadow-lg space-y-6">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50 dark:border-white/5">
                                <GraduationCap size={20} className="text-indigo-500" />
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
                                    Education & Credentials
                                </h2>
                            </div>

                            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10 space-y-8 py-2">
                                {/* Academic Item 1 */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0.5 h-4.5 w-4.5 rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-900 flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Harvard Law School</h3>
                                        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Doctor of Law (JD) — Focus in Constitutional Jurisprudence</p>
                                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400">Class of 2012</span>
                                    </div>
                                </div>

                                {/* Academic Item 2 */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0.5 h-4.5 w-4.5 rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-900 flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Yale University</h3>
                                        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Bachelor of Arts (BA) in Political Science & History</p>
                                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400">Class of 2009</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT (1/3 columns): Metadata Sidebar */}
                    <div className="space-y-8">
                        <section className="p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl shadow-lg space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-200/50 dark:border-white/5">
                                <UserCheck size={17} className="text-indigo-500" />
                                <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">
                                    Consultation Details
                                </h2>
                            </div>

                            <div className="space-y-3.5">
                                <DetailItem icon={Clock3} label="Hourly Billing Rate" value={`$${lawyer.fee} / hr`} />
                                <DetailItem icon={BriefcaseBusiness} label="Practice Period" value="10+ Years" />
                                <DetailItem icon={Globe} label="Languages Spoken" value="English, Spanish" />
                                <DetailItem icon={CalendarDays} label="Platform Member" value={joinDate} />
                            </div>
                        </section>
                    </div>
                </div>

                {/* COMMENTS BOARD */}
                <section className="rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl p-6 md:p-8 shadow-lg">
                    <CommentClient lawyer={lawyer} id={id} />

                    <div className="mt-10 space-y-6">
                        <h3 className="font-extrabold text-slate-900 dark:text-white border-b border-zinc-200/50 dark:border-white/5 pb-3">Client Reviews</h3>
                        <AllComment id={id} />
                    </div>
                </section>
            </div>
        </main>
    );
}