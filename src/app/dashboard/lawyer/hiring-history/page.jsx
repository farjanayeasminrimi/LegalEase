import { getAllhireList } from "@/lib/api/data";
import HireTable from "./HireTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LawyerHiringPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // console.log(session);

    const hireHistory = (await getAllhireList()) || [];
    console.log(hireHistory);


    const userEmail = session?.user?.email;

    const filteredHireHistory = hireHistory.filter(
        (item) => item.lawyerEmail === userEmail
    );

    return (
        <div className="p-6">
            <HireTable hireHistory={filteredHireHistory} />
        </div>
    );
};

export default LawyerHiringPage;