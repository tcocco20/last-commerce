"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";
import { convertToPlainObject } from "../utils";

// get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();
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
  } finally {
    await prisma.$disconnect();
  }
}
