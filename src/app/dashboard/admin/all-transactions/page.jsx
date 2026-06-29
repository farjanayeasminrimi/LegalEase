import { Table } from "@heroui/react";
import { getAllPay } from "@/lib/api/data";
import React from "react";

const AllTransactions = async () => {
    const allPayData = await getAllPay();
    console.log(allPayData);

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return "$0";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="p-6 text-gray-500 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                All Transactions
            </h1>

            <Table aria-label="Transactions Table">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[600px] bg-white dark:bg-gray-900">
                        <Table.Header className="bg-gray-100 dark:bg-gray-800">
                            <Table.Column isRowHeader className="text-gray-700 dark:text-gray-200">
                                Transaction ID
                            </Table.Column>
                            <Table.Column className="text-gray-700 dark:text-gray-200">
                                User/Lawyer Email
                            </Table.Column>
                            <Table.Column className="text-gray-700 dark:text-gray-200">
                                Amount
                            </Table.Column>
                            <Table.Column className="text-gray-700 dark:text-gray-200">
                                Date
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {allPayData?.map((tx, index) => (
                                <Table.Row key={tx._id || index} className="border-b border-gray-200 dark:border-gray-400">
                                    <Table.Cell className="font-medium text-gray-600 dark:text-gray-300">
                                        {`TXN${String(index + 1).padStart(3, "0")}`}
                                    </Table.Cell>

                                    <Table.Cell className="text-gray-700 dark:text-gray-200">
                                        {tx.clientEmail || tx.lawyerEmail}
                                    </Table.Cell>

                                    <Table.Cell className="font-semibold text-gray-800 dark:text-gray-100">
                                        {formatCurrency(tx.amount)}
                                    </Table.Cell>

                                    <Table.Cell className="text-gray-600 dark:text-gray-300">
                                        {formatDate(tx.paidAt || tx.createdAt)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default AllTransactions;