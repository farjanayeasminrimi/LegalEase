"use client";

import { deleteuser } from "@/lib/actions.js/user";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteUser = ({ id }) => {
    const router = useRouter();
    const handleDeleteUser = async () => {
        try {
            await deleteuser(id);
            // console.log("User deleted:", id);
            toast.success("User Delete Successfully")
            router.refresh();
        } catch (error) {
            toast.error("Delete Failed")
            // console.error("Delete failed:", error);
        }
    };

    return (
        <AlertDialog>
            {/* Trigger button */}
            <Button
                as="button"
                variant="light"
                className="
                    inline-flex items-center justify-center
                    rounded-lg border border-danger/20
                    bg-content1 p-2
                    text-danger transition-colors
                    hover:bg-danger/10
                "
            >
                Delete
            </Button>

            {/* Backdrop */}
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete user permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p>
                                This action will permanently delete this user and all related data.
                                This cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                variant="danger"
                                onPress={handleDeleteUser}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteUser;