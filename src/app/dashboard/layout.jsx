import DashboardClient from "./DashboardClient";

export default function DashboardLayout({ children }) {
    return (
        <DashboardClient>
            {children}
        </DashboardClient>
    );
}