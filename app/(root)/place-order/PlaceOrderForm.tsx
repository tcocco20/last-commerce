"use client";

import { createOrder } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import PlaceOrderButton from "./PlaceOrderButton";
import { useState } from "react";

const PlaceOrderForm = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);

    try {
      const res = await createOrder();

      if (res.redirectTo) {
        router.push(res.redirectTo);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton pending={pending} />
    </form>
  );
};

export default PlaceOrderForm;
