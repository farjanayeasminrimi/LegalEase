"use client";

import { updateHireLawyerStatus } from "@/lib/actions.js/Lawyer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditHireLawyer = ({ item }) => {
    // console.log(item.pay);
    const router = useRouter();

    const handleAccept = async () => {
        try {
            await updateHireLawyerStatus(item._id, {
                status: "accepted",
                pay: "paynow"
            });

            toast.success("Request accepted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to accept request");
        }
    };

    const handleReject = async () => {
        try {
            await updateHireLawyerStatus(item._id, {
                status: "rejected",
                pay: "Pay unable",
            });

            toast.success("Request rejected");
            router.refresh();
        } catch (error) {
            toast.error("Failed to reject request");
        }
    };

    return (
        <div>
            {item.pay?.toLowerCase() === "paid" ? (
                <span className="px-4 py-1.5 bg-green-100 text-green-700 border border-green-300 rounded-full text-sm font-medium">
                    Paid
                </span>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={handleAccept}
                        className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg"
                    >
                        Accept
                    </button>

                    <button
                        onClick={handleReject}
                        className="px-5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm rounded-lg"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditHireLawyer;