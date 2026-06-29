"use client";

import CommentDelete from "@/components/comments/CommentDelete";
import UpdateComment from "@/components/comments/UpdateComment";
import { Avatar } from "@heroui/react";

export default function CommentTable({ comments = [] }) {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[700px] table-fixed text-left">

                    {/* HEADER */}
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            <th className="w-[28%] px-5 py-4">Lawyer</th>
                            <th className="w-[34%] px-5 py-4">Comment</th>
                            <th className="w-[22%] px-5 py-4">Date</th>
                            <th className="w-[16%] px-5 py-4">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {comments.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <td className="px-5 py-6">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <Avatar.Image
                                                src={item.lawyerimage}
                                                alt={item.lawyername}
                                            />
                                            <Avatar.Fallback>
                                                {(item.lawyername || "")
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </Avatar.Fallback>
                                        </Avatar>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">
                                                {item.lawyername}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.lawyerspecilization}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-6 text-sm text-gray-700 dark:text-gray-300">
                                    <p className="line-clamp-2">{item.comment}</p>
                                </td>

                                <td className="px-5 py-6 text-sm">
                                    {item.date
                                        ? new Date(item.date).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td className="px-5 py-6">
                                    <div className="flex gap-3">
                                        <UpdateComment comment={item.comment} id={item._id}></UpdateComment>
                                        <CommentDelete id={item._id}></CommentDelete>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4 p-4">
                {comments.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <Avatar.Image src={item.lawyerimage} />
                                <Avatar.Fallback>
                                    {(item.lawyername || "")
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </Avatar.Fallback>
                            </Avatar>

                            <div>
                                <p className="text-sm font-semibold">
                                    {item.lawyername}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.lawyerspecilization}
                                </p>
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                            {item.comment}
                        </p>

                        <div className="mt-3 text-xs text-gray-500">
                            {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                        </div>

                        <div className="mt-3 flex gap-3">
                            <UpdateComment comment={item.comment} id={item._id}></UpdateComment>
                            <CommentDelete id={item._id}></CommentDelete>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}