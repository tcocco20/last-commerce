"use client";

import { ShippingAddress } from "@/lib/types";
import { shippingAddressSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();

  return <>ShippingAddressForm</>;
};

export default ShippingAddressForm;
