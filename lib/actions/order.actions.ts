"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";

export async function createOrder() {
  try {
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: formatError(error),
    };
  }
}
