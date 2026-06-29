"use client"

export const addhirelawyer = async (formData) => {
    // console.log(formData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hirelawyer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error("Failed to add data");
    }

    const resdata = await res.json();
    // console.log(resdata);
    return resdata;
};





export const updateHireLawyerStatus = async (id, updatedData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hirelawyer/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }
    );

    if (!res.ok) {
        throw new Error("Update failed");
    }

    return await res.json();
};