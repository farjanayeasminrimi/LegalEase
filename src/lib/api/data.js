"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const getAllLawyers = async (search = "", page = 1, limit = 9) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/alllaywer?search=${search}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getPayments = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pay`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  return res.json();
};

export const getAllComment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`, {
      cache: "no-store",
    });
    // console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    // console.error(error);
  }
};

export const getAllUser = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
export const getAllhireList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hirelawyer`);
    // console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    // console.error(error);
  }
};

export const getAllPay = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pay`);
    // console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    // console.error(error);
  }
};
