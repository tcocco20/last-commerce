"use server";
import type { CartItem } from "@/lib/types";
import { cookies } from "next/headers";
import { formatError } from "../utils";

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Session cart ID not found");
    }

    

    return {
      success: true,
      message: "Item added to cart successfully",
    };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}
