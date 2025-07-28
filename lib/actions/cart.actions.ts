"use server";
import type { Cart, CartItem } from "@/lib/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, roundTwo } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundTwo(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = roundTwo(itemsPrice > 100 ? 0 : 10),
    taxPrice = roundTwo(itemsPrice * 0.15),
    totalPrice = roundTwo(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Session cart ID not found");
    }

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart successfully`,
      };
    } else {
      const existentItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existentItem) {
        if (product.stock < existentItem.qty + item.qty)
          throw new Error("Not enough stock available");

        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existentItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Not enough stock available");

        cart.items.push(item);
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existentItem ? "quantity increased in" : "added to"
        } cart successfully`,
      };
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Session cart ID not found");
  }

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : null;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  }) as Cart;
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session cart ID not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const exists = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );

    if (!exists) throw new Error("Item not found in cart");

    let newItems: CartItem[] = [];

    if (exists.qty === 1) {
      console.error("Removing item from cart:", exists);
      newItems = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exists.productId
      );
    } else {
      newItems = (cart.items as CartItem[]).map((x) =>
        x.productId === productId ? { ...x, qty: x.qty - 1 } : x
      );
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: newItems,
        ...calcPrice(newItems as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
