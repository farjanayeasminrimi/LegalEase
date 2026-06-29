'use server'


export const handleCommentPost = async (comment) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to post comment");
    }

    const data = await res.json();
    return data;
};






// Delete Comment 

export const deletecomment = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${id}`,
            {
                method: "DELETE",
            }
        );

        return await res.json();
    } catch (error) {
        // console.error("Delete Lawyer Error:", error);
        throw error;
    }
};





export const updateComment = async (id, updatedData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${id}`,
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