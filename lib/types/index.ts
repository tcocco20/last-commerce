import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
} from "../validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema> & {
  id: string;
};
export type CartItem = z.infer<typeof cartItemSchema>;
