"use server";

import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

// get latest products
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: LATEST_PRODUCTS_LIMIT,
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw error;
  }
}

// get single product by slug
export async function getProductBySlug(slug: string) {
  try {
    const data = await prisma.product.findFirst({
      where: {
        slug,
      },
    });
    if (!data) {
      throw new Error("Product not found");
    }
    return convertToPlainObject(data);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
}
