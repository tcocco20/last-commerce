import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ShippingAddress } from "@/lib/types";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./ShippingAddressForm";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("No user ID");
  }

  const user = await getUserById(userId);

  return (
    <>
      <ShippingAddressForm address={user?.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
