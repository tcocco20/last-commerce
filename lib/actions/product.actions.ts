"use server";

import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertProductSchema, updateProductSchema } from "../validators";
import { Product } from "../types";

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

export async function getProductById(id: string) {
  try {
    const data = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (!data) {
      throw new Error("Product not found");
    }
    return convertToPlainObject(data) as Product;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
}

export async function getAllProducts({
  // query,
  limit = PAGE_SIZE,
  page,
}: // category,
{
  // query: string;
  limit?: number;
  page: number;
  // category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) {
      throw new Error("Product not found");
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) {
      throw new Error("Product not found");
    }

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
