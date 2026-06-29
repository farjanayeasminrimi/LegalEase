"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    ArrowRight,
    Briefcase,
    Check,
    Eye,
    EyeOff,
    Image,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const passwordRules = [
    { label: "8+ characters", test: (value) => value.length >= 8 },
    { label: "One uppercase", test: (value) => /[A-Z]/.test(value) },
    { label: "One number", test: (value) => /\d/.test(value) },
];

export default function SignUpPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");

    const completedRules = useMemo(
        () => passwordRules.filter((rule) => rule.test(password)).length,
        [password]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const {
            name,
            email,
            image,
            password: formPassword,
            confirmPassword,
        } = Object.fromEntries(formData.entries());

        if (!name || !email || !formPassword || !confirmPassword) {
            toast.error("Please complete all required fields");
            return;
        }

        if (formPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (completedRules < 3) {
            toast.error("Please choose a stronger password");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password: formPassword,
                role,
                image,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error?.message || "Failed to create account");
                return;
            }

            toast.success("Account created successfully");
            router.push('/')
            // console.log("User:", data);
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            console.log(result);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Google login failed");
        }
    };

    return (
        <main className="min-h-screen bg-[#f5f1ea] px-4 py-6 text-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="hidden bg-[#15201d] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
                        <span className="grid size-9 place-items-center rounded-lg bg-[#e9b44c] text-zinc-950">
                            <ShieldCheck size={18} />
                        </span>
                        Account Portal
                    </Link>

                    <div className="max-w-md">
                        <p className="mb-4 inline-flex rounded-full border border-white/15 px-3 py-1 text-sm text-white/75">
                            Secure onboarding
                        </p>

                        <h1 className="text-5xl font-semibold leading-tight tracking-normal">
                            Start with a clear, trusted account experience.
                        </h1>

                        <p className="mt-5 text-base leading-7 text-white/70">
                            Register with your email and password, or continue instantly with Google.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm text-white/70">
                        {["Encrypted login", "Fast setup", "Google OAuth"].map((item) => (
                            <div key={item} className="rounded-xl border border-white/10 p-3">
                                <Check className="mb-2 text-[#e9b44c]" size={16} />
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <div className="mb-5 flex items-center gap-2 lg:hidden">
                                <span className="grid size-9 place-items-center rounded-lg bg-[#15201d] text-white">
                                    <ShieldCheck size={18} />
                                </span>
                                <span className="text-sm font-semibold">Account Portal</span>
                            </div>

                            <p className="text-sm font-medium text-[#9a6b17]">
                                Create your account
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950">
                                Welcome aboard
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-zinc-600">
                                Use your details below, or sign up in one step with Google.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={googleLoading || loading}
                            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                        ><svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
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
                            Continue with Google
                        </button>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-zinc-200" />
                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                                or
                            </span>
                            <div className="h-px flex-1 bg-zinc-200" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Field
                                icon={User}
                                label="Full name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                autoComplete="name"
                            />

                            <Field
                                icon={Mail}
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            <Field
                                icon={Image}
                                label="Profile Image URL"
                                name="image"
                                type="url"
                                placeholder="https://example.com/profile.jpg"
                                autoComplete="url"
                            />

                            <div>
                                <span className="mb-2 block text-sm font-medium text-zinc-800">
                                    Role
                                </span>

                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: "client", label: "Client", icon: User },
                                        { value: "lawyer", label: "Lawyer", icon: Briefcase },
                                    ].map(({ value, label, icon: Icon }) => (
                                        <label
                                            key={value}
                                            className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition ${role === value
                                                ? "border-[#d39a2d] bg-[#fff9ec] text-[#7a4d07]"
                                                : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={value}
                                                checked={role === value}
                                                onChange={() => setRole(value)}
                                                className="sr-only"
                                            />

                                            <Icon
                                                size={18}
                                                className={
                                                    role === value ? "text-[#c07d10]" : "text-zinc-400"
                                                }
                                            />

                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <PasswordField
                                label="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                show={showPassword}
                                onToggle={() => setShowPassword((value) => !value)}
                            />

                            <PasswordField
                                label="Confirm password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                show={showConfirmPassword}
                                onToggle={() => setShowConfirmPassword((value) => !value)}
                            />

                            <button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#15201d] px-4 text-sm font-semibold text-white transition hover:bg-[#22302c] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}


                                {!loading && (
                                    <ArrowRight
                                        size={17}
                                        className="transition group-hover:translate-x-0.5"
                                    />
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-zinc-600">
                            Already have an account?{" "}
                            <Link
                                href="/auth/signin"
                                className="font-semibold text-zinc-950 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

function Field({ icon: Icon, label, name, type, placeholder, autoComplete }) {
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

function PasswordField({ label, name, value, onChange, show, onToggle }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">
                {label}
            </span>

            <span className="relative block">
                <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="Enter password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-zinc-300 bg-white pl-11 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#d39a2d] focus:ring-4 focus:ring-[#d39a2d]/15"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </span>
        </label>
    );
}