"use client";

import { useState } from "react";
import { updateUser } from "@/lib/actions.js/user";
import { Select, Label, ListBox } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditUserRole = ({ user }) => {
    const {
        data: session,
        refetch,
    } = authClient.useSession();

    const [role, setRole] = useState(user?.role || "");
    const router = useRouter();

    const handleUpdateRole = async (newRole) => {
        const selectedRole =
            typeof newRole === "object" && newRole.currentKey
                ? newRole.currentKey
                : String(newRole);

        if (!selectedRole) return;

        const previousRole = role;
        setRole(selectedRole);

        try {
            await updateUser(user._id, { role: selectedRole });

            toast.success("Updated role successfully");

            // Refresh session data
            await refetch();

            // If current logged-in user changed their own role
            // from admin to another role, sign them out and redirect.
            if (
                session?.user?.id === user?._id &&
                selectedRole !== "admin"
            ) {
                await authClient.signOut();

                toast.success("Admin access removed");

                router.push("/");
                router.refresh();
                return;
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to update role");

            // Revert UI state on error
            setRole(previousRole);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                className="w-[200px]"
                placeholder="Select role"
                selectedKey={role}
                onSelectionChange={handleUpdateRole}
            >
                <Label>Role Change</Label>

                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="admin" textValue="Admin">
                            Admin
                            <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="client" textValue="User">
                            Client
                            <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="lawyer" textValue="Lawyer">
                            Lawyer
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
};

export default EditUserRole;