"use client";

import { deleteLawyer } from "@/lib/actions.js/action";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteLawyer({ service }) {
    const router = useRouter();
    // console.log(service);
    const handleDeleteLawyer = async () => {
        try {
            const data = await deleteLawyer(service);

            if (data.deletedCount > 0) {
                toast.success("Lawyer deleted successfully");


                router.refresh();
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <AlertDialog>
            <Button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                <TrashBin size={14} />
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete service permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{service.name}</strong> and
                                all of its data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteLawyer}
                                slot="close"
                                variant="danger"
                            >
                                Delete Service
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
