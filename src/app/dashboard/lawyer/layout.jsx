import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const LawyerLayout = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Not logged in
    if (!session) {
        redirect("/login");
    }

    // Not a lawyer
    if (session.user.role !== "lawyer") {
        redirect("/");
        // or redirect("/unauthorized");
    }

    return <>{children}</>;
};

export default LawyerLayout;