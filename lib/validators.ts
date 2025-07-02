import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name mus be at least 3 characters long"),
  slug: z.string().min(3, "Slug mus be at least 3 characters long"),
  category: z.string().min(3, "Category mus be at least 3 characters long"),
  brand: z.string().min(3, "Brand mus be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description mus be at least 3 characters long"),
  stock: z.coerce.number(),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
