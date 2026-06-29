"use client";

import { updateComment } from "@/lib/actions.js/comments";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateComment = ({ comment, id }) => {
    const router = useRouter();
    const [commentText, setCommentText] = useState(comment || "");

    const handleUpdate = async () => {
        try {
            await updateComment(id, {
                comment: commentText,
            });

            toast.success("Comment updated successfully");
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Failed to update comment");
        }
    };

    return (
        <Modal>
            <Button isIconOnly className="h-8 w-8 bg-blue-600 text-white">
                <Pencil className="h-4 w-4" />
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md">
                        {() => (
                            <>
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                    <Modal.Heading>
                                        Update Comment
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body className="p-6">
                                    <Surface variant="default">
                                        <div className="flex flex-col gap-4">
                                            <TextField
                                                className="w-full"
                                                variant="secondary"
                                            >
                                                <Label>Comment</Label>

                                                <Input
                                                    value={commentText}
                                                    onChange={(e) =>
                                                        setCommentText(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Update your comment"
                                                />
                                            </TextField>
                                        </div>
                                    </Surface>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button slot="close"
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        slot="close" variant="danger"
                                        color="primary"
                                        onClick={() =>
                                            handleUpdate()
                                        }
                                    >
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateComment;