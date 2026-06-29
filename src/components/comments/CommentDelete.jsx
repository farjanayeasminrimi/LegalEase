"use client";
import { deletecomment } from "@/lib/actions.js/comments";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const CommentDelete = ({ id }) => {
    // console.log(id, "commentid");
    const router = useRouter();
    const handleDelete = async () => {
        try {
            await deletecomment(id);

            toast.success("Comment deleted successfully");
            router.refresh();
        } catch (error) {
            // console.error(error);
            toast.error("Failed to delete comment");
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger">
                <Trash2 />
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Comment permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                        </AlertDialog.Body> <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button slot="close" variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CommentDelete;