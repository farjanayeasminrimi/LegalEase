"use client";

import Image from "next/image";
import ModelUpdateUser from "./ModelUPdateUser";
import { authClient } from "@/lib/auth-client";

const Profile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <section className="min-h-screen px-4 py-8 md:py-12 bg-base-200 transition-colors">
            <div className="max-w-5xl mx-auto">
                <div className="card bg-base-100 shadow-2xl border border-base-300">

                    <div className="card-body p-6 sm:p-8 md:p-10">

                        {/* Profile Image */}
                        <div className="flex justify-center">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring ring-primary ring-offset-2">
                                <Image
                                    src={user?.image || "/default-user.png"}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center mt-6">
                            <h2 className="text-2xl md:text-3xl font-bold">
                                {user?.name || "Guest User"}
                            </h2>

                            <p className="text-base-content/70 mt-2 break-all text-sm sm:text-base">
                                {user?.email || "No email available"}
                            </p>
                        </div>

                        <div className="divider my-6"></div>

                        {/* Actions */}
                        <div className="flex justify-center">
                            <ModelUpdateUser user={user} />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Profile;