import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const AdminDashboardlayout = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Not logged in
    if (!session) {
        redirect("/login");
    }

    // Not a lawyer
    if (session.user.role !== "admin") {
        redirect("/");
        // or redirect("/unauthorized");
    }

    return <>{children}</>;
};

export default AdminDashboardlayout;