import { getAllComment } from "@/lib/api/data";

const AllComment = async ({ id }) => {
    const allComment = await getAllComment();
    // console.log(allComment);

    const filteredComments = allComment.filter(
        (comment) => comment.lawyerId === id
    );

    return (
        <div className="w-full">
            {filteredComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-3xl border-zinc-200 dark:border-white/5 bg-white/20 dark:bg-zinc-900/10 backdrop-blur-xl">
                    <svg
                        className="w-12 h-12 text-slate-400 dark:text-zinc-500 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>

                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                        No comments yet
                    </h3>

                    <p className="text-xs text-slate-405 dark:text-zinc-500 mt-1">
                        Be the first to share your feedback.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div
                            key={comment._id}
                            className="p-5 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-2.5">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs font-bold uppercase border border-indigo-500/25">
                                    {comment.email ? comment.email.substring(0, 2) : "CL"}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">{comment.email || "Client"}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500">Verified Client</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed pl-11">
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllComment;