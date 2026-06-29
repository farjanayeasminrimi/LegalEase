"use client";

import { useState } from "react";
import { ImagePlus, Plus, Scale, Upload } from "lucide-react";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { imageUpload } from "@/lib/imgUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Pencil } from "@gravity-ui/icons";
import { updateLawyer } from "@/lib/actions.js/action";

const specializations = [
    "Family Law",
    "Criminal Law",
    "Property Law",
    "Corporate Law",
    "Immigration Law",
    "Tax Law",
    "Civil Litigation",
];

export default function EditService({ services }) {
    // console.log(services._id);
    // console.log(services._id);
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState("");
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    // console.log(session.user.email);
    const [imageName, setImageName] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageName(file.name);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // console.log(object);
        const image = await imageUpload(data.image);

        const updatedData = {
            ...data,
            image: image.url,
            email: session.user.email
        };

        const result = await updateLawyer(services._id, updatedData);
        if (result?.success || result) {
            toast.success("Service updated successfully!");
            router.refresh();
        } else {
            toast.error("Update failed!");
        }
    };

    return (
        <Modal>
            <Button color="primary" className="gap-2">
                <Pencil size={18} />
                Edit
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden">
                        <Modal.CloseTrigger />

                        <Modal.Header className="border-b border-default-200 bg-default-50/70 px-4 py-4 sm:px-6 sm:py-5">
                            <Modal.Icon className="bg-primary/10 text-primary">
                                <Scale size={20} />
                            </Modal.Icon>

                            <div>
                                <Modal.Heading>
                                    Update Legal Service
                                </Modal.Heading>

                                <p className="mt-1 text-sm text-muted">
                                    Update the service details clients will see
                                    before booking.
                                </p>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="overflow-y-auto p-0">
                            <form
                                id="service-form"
                                onSubmit={handleSubmit}
                                className="grid lg:grid-cols-[1fr_320px]"
                            >
                                {/* Left Side */}
                                <Surface
                                    variant="default"
                                    className="rounded-none border-0 p-4 sm:p-6"
                                >
                                    <div className="grid gap-5">
                                        <TextField
                                            defaultValue={services?.name}
                                            className="w-full"
                                            name="name"
                                            variant="secondary"
                                        >
                                            <Label>Service Name</Label>
                                            <Input

                                                name="name"
                                                placeholder="Property Dispute Consultation"
                                                required
                                            />
                                        </TextField>

                                        <div className="space-y-2">
                                            <Label>
                                                Service Description
                                            </Label>

                                            <textarea
                                                defaultValue={services.bio}
                                                name="bio"
                                                required
                                                placeholder="Describe what clients get from this service..."
                                                rows={5}
                                                className="min-h-32 w-full resize-none rounded-lg border border-default-200 bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="grid gap-5 md:grid-cols-2">
                                            <TextField
                                                defaultValue={services?.fee}
                                                className="w-full"
                                                name="fee"
                                                variant="secondary"
                                            >
                                                <Label>
                                                    Consultation Fee
                                                </Label>

                                                <Input
                                                    name="fee"
                                                    type="number"
                                                    required
                                                    placeholder="5000"
                                                    startContent={
                                                        <span className="text-sm text-muted">
                                                            BDT
                                                        </span>
                                                    }
                                                />
                                            </TextField>

                                            <div className="space-y-2">
                                                <Label>
                                                    Specialization
                                                </Label>

                                                <select
                                                    defaultValue={services?.specialization}
                                                    name="specialization"
                                                    required
                                                    className="h-11 w-full rounded-lg border border-default-200 bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <option value="">
                                                        Select specialization
                                                    </option>

                                                    {specializations.map(
                                                        (item) => (
                                                            <option
                                                                key={item}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </Surface>

                                {/* Right Side */}
                                <aside className="border-t border-default-200 bg-default-50/60 p-4 sm:p-6 lg:border-l lg:border-t-0">
                                    <div className="space-y-3">
                                        <Label>Service Image</Label>

                                        <label className="group flex min-h-[220px] sm:min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-default-300 bg-background text-center transition hover:border-primary hover:bg-primary/5">
                                            {imagePreview ? (
                                                <Image
                                                    src={imagePreview || "/placeholder.png"}
                                                    alt="Service Preview"
                                                    width={500}
                                                    height={300}
                                                    className="h-[220px] sm:h-[260px] w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center px-5 py-8">
                                                    <span className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
                                                        <ImagePlus size={24} />
                                                    </span>

                                                    <span className="text-sm font-medium">
                                                        Upload Service Image
                                                    </span>

                                                    <span className="mt-1 text-xs text-muted">
                                                        PNG, JPG or WEBP
                                                    </span>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                required
                                                onChange={handleImageChange}
                                                className="sr-only"
                                            />
                                        </label>

                                        <div className="flex min-h-10 items-center gap-2 rounded-lg border border-default-200 bg-background px-3 text-xs text-muted">
                                            <Upload size={14} />

                                            <span className="truncate">
                                                {imageName ||
                                                    "No file selected"}
                                            </span>
                                        </div>
                                    </div>
                                </aside>
                                <Modal.Footer className="flex flex-col-reverse gap-3 border-t border-default-200 bg-background px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                        className="w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        form="service-form"
                                        color="primary"
                                        className="w-full gap-2 sm:w-auto"
                                    >
                                        <Plus size={16} />
                                        Update Service
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>


                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}