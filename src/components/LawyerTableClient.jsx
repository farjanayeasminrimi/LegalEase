"use client";

import Image from "next/image";
import EditService from "./EditLawyer";
import { DeleteLawyer } from "./DeleteLawyer";

export default function ServiceTable({ data = [] }) {
    const services = data;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        Services
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your available services and fees
                    </p>
                </div>

                <span className="w-fit rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
                    {services.length} services
                </span>
            </div>

            {/* ================= TABLE (desktop) ================= */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                        <thead className="border-b border-border bg-muted">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Service
                                </th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Specialization
                                </th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Fee
                                </th>
                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {services.map((item) => (
                                <tr key={item._id} className="hover:bg-muted/50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={56}
                                                height={56}
                                                className="h-14 w-14 rounded-lg border border-border object-cover"
                                            />
                                            <p className="font-semibold">{item.name}</p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm">
                                            {item.specialization}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 font-semibold">
                                        ${item.fee}
                                    </td>

                                    <td className="px-5 py-4 flex items-center">
                                        <div className="flex items-center justify-end gap-2">
                                            <EditService services={item}></EditService>

                                            <button className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500 hover:bg-red-500/20">
                                                <DeleteLawyer service={item._id}></DeleteLawyer>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="grid gap-4 md:hidden">
                {services.length > 0 ? (
                    services.map((item) => (
                        <div
                            key={item._id}
                            className="rounded-xl border border-border bg-card p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="h-12 w-12 rounded-lg border object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.specialization}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="font-semibold">
                                    ${item.fee}
                                </span>

                                <div className="flex gap-2">
                                    <EditService services={item}></EditService>

                                    <button className="rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">
                        No services found
                    </p>
                )}
            </div>
        </div>
    );
}