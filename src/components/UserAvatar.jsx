"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Dropdown, Avatar, Label } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserAvatar() {
    const router = useRouter();
    const {
        data: session,
        isPending,
        error,
        refetch,
    } = authClient.useSession();

    const user = session?.user;
    console.log(user);

    const dashboardRoutes = {
        admin: "/dashboard/admin",
        client: "/dashboard/user",
        lawyer: "/dashboard/lawyer",
    };

    const dashboardPath = dashboardRoutes[user?.role] || "/dashboard";

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push('/')
    };

    const initials =
        user?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    // Loading State
    if (isPending) {
        return (
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
        );
    }

    // Not Logged In
    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/auth/signin"
                    className="
                        rounded-lg px-3 py-2 text-sm font-medium
                        text-zinc-700 dark:text-zinc-300
                        hover:bg-zinc-100 dark:hover:bg-white/10
                        hover:text-zinc-900 dark:hover:text-white
                        transition
                    "
                >
                    Sign In
                </Link>

                <Link
                    href="/auth/signup"
                    className="
                        rounded-lg px-3 py-2 text-sm font-semibold
                        bg-zinc-900 text-white
                        dark:bg-white dark:text-zinc-950
                        hover:bg-zinc-700 dark:hover:bg-zinc-200
                        transition
                    "
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <Dropdown>
            {/* Avatar Trigger */}
            <Dropdown.Trigger>
                <div className="cursor-pointer">
                    <Avatar
                        src={user?.image || undefined}
                        name={user?.name || initials}
                        className="h-10 w-10"
                    >
                        {!user?.avatar && initials}
                    </Avatar>
                </div>
            </Dropdown.Trigger>

            {/* Dropdown Content */}
            <Dropdown.Popover placement="bottom right">
                {/* User Info */}
                <div className="px-3 pt-3 pb-2 border-b border-gray-200">
                    <p className="text-sm font-semibold truncate">
                        {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                    </p>
                </div>

                {/* Menu */}
                <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link
                            href={dashboardPath}
                            className="flex items-center gap-2 w-full"
                        >
                            <User size={16} />
                            <Label>Dashboard</Label>
                        </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                        onClick={handleSignOut}
                    >
                        <div className="flex items-center justify-between w-full text-red-500">
                            <Label>Log Out</Label>
                            <ArrowRightFromSquare className="size-4" />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}