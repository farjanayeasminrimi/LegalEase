import { getAllhireList } from "@/lib/api/data";
import HireTable from "./HireTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UserHiring = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const hireHistory = (await getAllhireList()) || [];

    const userEmail = session?.user?.email;

    const filteredHireHistory = hireHistory.filter(
        (item) => item.clientEmail === userEmail
    );

    if (filteredHireHistory.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold">No Hiring History Found</h2>
                <p className="mt-2 text-gray-500">
                    You have not hired any lawyers yet.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <HireTable hireHistory={filteredHireHistory} />
        </div>
    );
};

export default UserHiring;