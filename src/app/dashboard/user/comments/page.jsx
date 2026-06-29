import { getAllComment } from "@/lib/api/data";
import CommentTable from "./CommentTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CommentPage = async () => {
    const comments = await getAllComment();
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    // console.log(session);

    const userEmail = session?.user?.email;
    // console.log(userEmail, "email");

    const filteredComments = userEmail
        ? comments.filter((comment) => comment.email === userEmail)
        : [];

    return (
        <div className="p-4">
            {filteredComments.length === 0 ? (
                <div className="flex h-72 items-center justify-center">
                    <div className="text-center space-y-3 rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        {/* Icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            No comments yet
                        </h2>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            You don’t have any comments right now. Once users comment, they will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                <CommentTable comments={filteredComments} />
            )}
        </div>
    );
};

export default CommentPage;