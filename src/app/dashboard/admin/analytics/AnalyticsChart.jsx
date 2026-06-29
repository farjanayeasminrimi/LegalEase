"use client";

import { useTheme } from "next-themes";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({
    payments = 0,
    hires = 0,
    users = 0,
    comments = 0,
    lawyers = 0,
}) {
    const { theme } = useTheme();

    const COLORS =
        theme === "dark"
            ? ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#C084FC"]
            : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    const chartData = [
        { name: "Payments", value: payments },
        { name: "Hires", value: hires },
        { name: "Users", value: users },
        { name: "Comments", value: comments },
        { name: "Lawyers", value: lawyers },
    ];

    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={theme === "dark" ? "#ffffff" : "#000000"}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
            >
                {`${name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-5">
                <div className="p-5 rounded-xl shadow bg-blue-100 dark:bg-blue-900">
                    <h2 className="font-medium text-gray-600 dark:text-gray-300">
                        Payments
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {payments}
                    </p>
                </div>

                <div className="p-5 rounded-xl shadow bg-green-100 dark:bg-green-900">
                    <h2 className="font-medium text-gray-600 dark:text-gray-300">
                        Hires
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {hires}
                    </p>
                </div>

                <div className="p-5 rounded-xl shadow bg-yellow-100 dark:bg-yellow-900">
                    <h2 className="font-medium text-gray-600 dark:text-gray-300">
                        Users
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {users}
                    </p>
                </div>

                <div className="p-5 rounded-xl shadow bg-red-100 dark:bg-red-900">
                    <h2 className="font-medium text-gray-600 dark:text-gray-300">
                        Comments
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {comments}
                    </p>
                </div>

                <div className="p-5 rounded-xl shadow bg-purple-100 dark:bg-purple-900">
                    <h2 className="font-medium text-gray-600 dark:text-gray-300">
                        Lawyers
                    </h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {lawyers}
                    </p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Data Overview
                </h2>

                <div className="w-full h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={180}
                                label={renderCustomLabel}
                                labelLine={false}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#1F2937"
                                            : "#FFFFFF",
                                    color:
                                        theme === "dark"
                                            ? "#FFFFFF"
                                            : "#000000",
                                    border:
                                        theme === "dark"
                                            ? "1px solid #374151"
                                            : "1px solid #E5E7EB",
                                    borderRadius: "8px",
                                }}
                            />

                            <Legend
                                wrapperStyle={{
                                    color:
                                        theme === "dark"
                                            ? "#FFFFFF"
                                            : "#000000",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}