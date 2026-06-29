"use client";

import toast from "react-hot-toast";
import { handleCommentPost } from "@/lib/actions.js/comments";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Star } from "@gravity-ui/icons";
import { MessageCircle } from "lucide-react";

export default function CommentClient({ id, lawyer }) {
    const {
        data: session,
        isPending,
    } = authClient.useSession();

    const router = useRouter();

    const handlecomment = async (e) => {
        e.preventDefault();
        // console.log(lawyer);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const result = await handleCommentPost({
                lawyerId: id,
                lawyername: lawyer.name,
                lawyerimage: lawyer.image,
                lawyerspecilization: lawyer.specialization,
                date: new Date(),
                comment: data.comment,
                email: session?.user?.email,
            });

            toast.success(result?.message || "Comment posted successfully");
            e.target.reset();
            router.refresh();
        } catch (error) {
            toast.error(error?.message || "Failed to post comment");
        }
    };
    if (session?.user?.role === "lawyer") return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 border-b border-zinc-200/50 dark:border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        <MessageCircle size={16} />
                        Client Feedback
                    </div>

                    <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">Reviews & Comments</h2>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 backdrop-blur-md">
                    <Star size={20} className="fill-amber-400 text-amber-400" />
                    <div>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-white">4.9 out of 5</p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-semibold uppercase tracking-wider">120 reviews</p>
                    </div>
                </div>

            </div>
            <form
                onSubmit={handlecomment}
                className="rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 p-6 shadow-md backdrop-blur-xl"
            >
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Leave a Comment
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                        Share your experience or ask a public query.
                    </p>
                </div>

                <div className="space-y-4">
                    <textarea
                        name="comment"
                        rows={4}
                        placeholder="Write your feedback here..."
                        required
                        className="w-full rounded-2xl p-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 resize-none outline-none glass-input"
                    />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}