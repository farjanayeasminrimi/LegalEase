"use client";

import { authClient } from "@/lib/auth-client";
import { Pencil } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";

const ModelUpdateUser = ({ user }) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        // 1. Gather form data using FormData and Object.fromEntries
        const formData = new FormData(e.currentTarget);
        const { name, photo } = Object.fromEntries(formData);

        // 2. Client-side validation
        if (!name || !photo) {
            toast.error("All fields are required");
            return;
        }

        // 3. Call your auth service
        const { error } = await authClient.updateUser({
            name: name.toString(),
            image: photo.toString(),
        });

        if (!error) {
            toast.success("Profile updated successfully");

            // 4. Reset the form fields easily without individual states
            e.currentTarget.reset();
        } else {
            toast.error("Update failed");
        }
    };

    return (
        <Modal>
            {/* The trigger button */}
            <Button variant="primary" className="w-full sm:w-auto flex items-center gap-2">
                <Pencil size={18} />
                Edit Profile
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading className="text-xl text-center">Update Profile</Modal.Heading>
                        </Modal.Header>

                        {/* We attach the form wrapper here */}
                        <form onSubmit={onSubmit}>
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <div className="flex flex-col gap-5">

                                        <TextField defaultValue={user?.name} className="w-full" name="name" type="text" variant="secondary">
                                            <Label>Name</Label>
                                            <Input placeholder="Enter your name" />
                                        </TextField>

                                        <TextField
                                            defaultValue={user?.image}
                                            className="w-full" name="photo" type="text" variant="secondary">
                                            <Label>Photo URL</Label>
                                            <Input placeholder="Enter photo URL" />
                                        </TextField>

                                    </div>
                                </Surface>
                            </Modal.Body>

                            <Modal.Footer className="flex flex-col sm:flex-row justify-end gap-3">
                                <Button slot="close" type="button" variant="secondary">
                                    Cancel
                                </Button>
                                {/* Note: We don't use slot="close" here so the modal stays open if validation fails */}
                                <Button type="submit" variant="primary">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ModelUpdateUser;