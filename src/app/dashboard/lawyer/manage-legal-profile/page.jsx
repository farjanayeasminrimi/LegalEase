import React from "react";
import AddServiceForm from "./AddService";
import LaywerTable from "@/components/LaywerTable";

export default function ManageLegalPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage Legal Services</h1>
            <p className="text-sm text-muted-foreground">
              Add, update, and manage all legal service providers
            </p>
          </div>

          {/* Action Button / Form */}
          <div className="flex items-center gap-3">
            <AddServiceForm />
          </div>
        </div>

        {/* Content Section */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
          <LaywerTable />
        </div>
      </div>
    </div>
  );
}
