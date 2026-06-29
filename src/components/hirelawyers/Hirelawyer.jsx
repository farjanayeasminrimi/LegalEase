"use client";

import { addhirelawyer } from "@/lib/actions.js/Lawyer";
import { authClient } from "@/lib/auth-client";
import { CircleCheckFill } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

const Hirelawyer = ({ hirelawyer }) => {
    const { data: session } = authClient.useSession();

    const handleHireLawyer = async () => {
        try {
            const formData = {
                status: "pending",
                specialization: hirelawyer.specialization,
                lawyerName: hirelawyer.name,
                fee: hirelawyer.fee,
                date: new Date().toISOString(),
                clientName: session?.user?.name,
                clientEmail: session?.user?.email,
                lawyerEmail: hirelawyer.email,
                pay: "Pay unable",
            };

            const res = await addhirelawyer(formData);

            if (res) {
                toast.success("Lawyer hired successfully");
            }
        } catch (error) {
            toast.error("You already hired this lawyer");
        }
    };

    return (
        <AlertDialog>
            <Button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
                <CircleCheckFill size={18} />
                Hire Lawyer
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[450px]">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="warning" />
                            <AlertDialog.Heading>
                                Confirm Hiring
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p>
                                Are you sure you want to hire{" "}
                                <strong>{hirelawyer.name}</strong>?
                            </p>

                            <div className="mt-3 space-y-1 text-sm">
                                <p>
                                    <strong>Specialization:</strong>{" "}
                                    {hirelawyer.specialization}
                                </p>
                                <p>
                                    <strong>Fee:</strong> ${hirelawyer.fee}
                                </p>
                            </div>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                onPress={handleHireLawyer}
                                className="bg-green-600 text-white hover:bg-green-700 font-semibold px-6"
                            >
                                Confirm & Hire Lawyer
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default Hirelawyer;