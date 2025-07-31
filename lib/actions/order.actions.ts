"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem } from "../types";

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated.");
    }

    const cart = await getMyCart();
    const userId = session!.user?.id;

    if (!userId) {
      throw new Error("User not found.");
    }

    const user = await getUserById(userId);

    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
        redirectTo: "/cart",
      };
    }
    if (!user?.address) {
      return {
        success: false,
        message: "Your address is not set.",
        redirectTo: "/shipping-address",
      };
    }
    if (!user?.paymentMethod) {
      return {
        success: false,
        message: "Your payment method is not set.",
        redirectTo: "/payment-method",
      };
    }

    const order = insertOrderSchema.parse({
      userId: user.id,
      items: cart.items,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({
        data: order,
      });

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }

      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) {
      throw new Error("Failed to create order.");
    }

    return {
      success: true,
      message: "Order created successfully.",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: formatError(error),
    };
  }
}
