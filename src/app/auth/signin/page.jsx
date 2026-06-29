"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const res = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (res?.error) {
                toast.error(res.error.message || "Invalid credentials");
                return;
            }

            toast.success("Signed in successfully!");
        } catch (err) {
            console.log("SIGNIN ERROR:", err);
            toast.error(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error(
                error?.message || "Google login failed"
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#f6f1e8] px-4 py-6 text-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 lg:grid-cols-[1fr_1.05fr]">
                <section className="hidden bg-[#17211e] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
                        <span className="grid size-9 place-items-center rounded-xl bg-[#e7b34f] text-zinc-950">
                            <ShieldCheck size={18} />
                        </span>
                        Account Portal
                    </Link>

                    <div className="max-w-md">
                        <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 text-sm text-white/75">
                            Secure access
                        </p>

                        <h1 className="text-5xl font-semibold leading-tight tracking-normal">
                            Sign in with confidence and continue your work.
                        </h1>

                        <p className="mt-5 text-base leading-7 text-white/70">
                            Access your dashboard using your email and password, or continue quickly with Google.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm text-white/70">
                        {["Protected login", "Fast access", "Google OAuth"].map((item) => (
                            <div key={item} className="rounded-2xl border border-white/10 p-3">
                                <ShieldCheck className="mb-2 text-[#e7b34f]" size={16} />
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <div className="mb-5 flex items-center gap-2 lg:hidden">
                                <span className="grid size-9 place-items-center rounded-xl bg-[#17211e] text-white">
                                    <ShieldCheck size={18} />
                                </span>
                                <span className="text-sm font-semibold">Account Portal</span>
                            </div>

                            <p className="text-sm font-medium text-[#9a6b17]">
                                Welcome back
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950">
                                Sign in to your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-zinc-600">
                                Enter your details below to continue to your dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField
                                icon={Mail}
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />

                            <PasswordField
                                showPassword={showPassword}
                                onToggle={() => setShowPassword((value) => !value)}
                            />

                            <div className="flex items-center justify-between gap-4">
                                <label className="flex items-center gap-2 text-sm text-zinc-600">
                                    <input
                                        type="checkbox"
                                        className="size-4 rounded border-zinc-300 text-[#17211e] focus:ring-[#d39a2d]"
                                    />
                                    Remember me
                                </label>

                                <button
                                    className="text-sm font-semibold text-zinc-950 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#17211e] px-4 text-sm font-semibold text-white transition hover:bg-[#24322e] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}

                                {!loading && (
                                    <ArrowRight
                                        size={17}
                                        className="transition group-hover:translate-x-0.5"
                                    />
                                )}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-zinc-200" />
                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                                or
                            </span>
                            <div className="h-px flex-1 bg-zinc-200" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={googleLoading || loading}
                            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    fill="#FFC107"
                                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4C16.1 4 9.2 8.6 6.3 14.7z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.1 39.5 15.6 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40.9 35.6 44 30.8 44 24c0-1.3-.1-2.3-.4-3.5z"
                                />
                            </svg>

                            {googleLoading ? "Redirecting..." : "Continue with Google"}
                        </button>

                        <p className="mt-6 text-center text-sm text-zinc-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="font-semibold text-zinc-950 hover:underline"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

function InputField({
    icon: Icon,
    label,
    name,
    type,
    placeholder,
    autoComplete,
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">
                {label}
            </span>

            <span className="relative block">
                <Icon
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required
                    autoComplete={autoComplete}
                    className="h-12 w-full rounded-xl border border-zinc-300 bg-white pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#d39a2d] focus:ring-4 focus:ring-[#d39a2d]/15"
                />
            </span>
        </label>
    );
}

function PasswordField({ showPassword, onToggle }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">
                Password
            </span>

            <span className="relative block">
                <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-zinc-300 bg-white pl-11 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#d39a2d] focus:ring-4 focus:ring-[#d39a2d]/15"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </span>
        </label>
    );
}