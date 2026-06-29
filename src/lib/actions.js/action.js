"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const addData = async (formData) => {
  // console.log(formData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/laywerdata`, {
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

export const updateLawyer = async (id, updatedData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Update failed:", error);
  }
};

// lib/actions/lawyer.js

export const deleteLawyer = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error) {
    // console.error("Delete Lawyer Error:", error);
    throw error;
  }
};

// export const getLawyerById = async (id) => {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer/${id}`,
//             {
//                 cache: "no-store",
//             }
//         );

//         if (!res.ok) {
//             throw new Error("Failed to fetch lawyer");
//         }

//         return await res.json();
//     } catch (error) {
//         // console.error("Error fetching lawyer:", error);
//         return null;
//     }
// };

export const getLawyerById = async (id) => {
  try {
    // console.log("Getting token...");

    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    // console.log("Token:", token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // console.log("Status:", res.status);

    return await res.json();
  } catch (error) {
    // console.error(error);
  }
};
