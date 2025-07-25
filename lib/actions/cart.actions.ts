"use server";
import type { CartItem } from "@/lib/types";


export async function addItemToCart(data: CartItem) {
    return {
        success: true,
        message: "Item added to cart successfully",
    }
}