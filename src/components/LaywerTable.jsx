import { getAllLawyers } from "@/lib/api/data";
import LawyerTableClient from "./LawyerTableClient";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function LawyerTable() {
    const data = await getAllLawyers();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userEmail = session?.user?.email;

    const filteredData = userEmail
        ? data.lawyers.filter((lawyer) => lawyer.email === userEmail)
        : [];

    if (filteredData.length === 0) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-border bg-content1 p-10">
                <div className="mb-4 text-6xl">⚖️</div>
                <h2 className="text-2xl font-bold">No Services Yet</h2>
                <p className="mt-2 text-center text-default-500">
                    You have not added any legal services.
                    Start by creating your first service.
                </p>
            </div>
        );
    }

    return <LawyerTableClient data={filteredData} />;
}