"use client";

import React from "react";
import { Table } from "@heroui/react";
import EditHireLawyer from "@/components/hirelawyers/EditHireLawyer";

const HireTable = ({ hireHistory = [] }) => {
    console.log(hireHistory);
    return (
        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm transition-colors">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Client hire requests"
                        className="min-w-[600px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader className="text-gray-700 dark:text-gray-200 font-bold">
                                Client Name
                            </Table.Column>

                            <Table.Column className="text-gray-700 dark:text-gray-200 font-bold">
                                Request Date
                            </Table.Column>

                            <Table.Column className="text-gray-700 dark:text-gray-200 font-bold text-center">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {hireHistory.map((item, index) => (
                                <Table.Row
                                    key={item.id || index}
                                    className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                                >
                                    <Table.Cell className="text-gray-800 dark:text-gray-100 font-medium py-4">
                                        {item.clientName}
                                    </Table.Cell>

                                    <Table.Cell className="text-gray-500 dark:text-gray-400 py-4">
                                        {new Date(item.date).toLocaleString()}
                                    </Table.Cell>

                                    <Table.Cell className="py-4">
                                        <div className="flex items-center justify-center gap-3 flex-wrap">

                                            <EditHireLawyer item={item}></EditHireLawyer>



                                        </div>
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

export default HireTable;