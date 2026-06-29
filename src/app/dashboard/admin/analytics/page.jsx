export const dynamic = 'force-dynamic';


import AnalyticsChart from "./AnalyticsChart";
import {
    getAllComment,
    getAllhireList,
    getAllLawyers,
    getAllPay,
    getAllUser,
} from "@/lib/api/data";

export default async function Page() {
    const payments = await getAllPay();
    const hires = await getAllhireList();
    const users = await getAllUser();
    const comments = await getAllComment();
    const { lawyers } = await getAllLawyers();

    // console.log(payments);

    const chartData = [
        {
            name: "Payments",
            value: payments?.length || 0,
        },
        {
            name: "Hires",
            value: hires?.length || 0,
        },
        {
            name: "Users",
            value: users?.length || 0,
        },
        {
            name: "Comments",
            value: comments?.length || 0,
        },
        {
            name: "Lawyers",
            value: lawyers?.length || 0,
        },
    ];

    return (
        <AnalyticsChart
            chartData={chartData}
            payments={payments?.length || 0}
            hires={hires?.length || 0}
            users={users?.length || 0}
            comments={comments?.length || 0}
            lawyers={lawyers?.length || 0}
        />
    );
}