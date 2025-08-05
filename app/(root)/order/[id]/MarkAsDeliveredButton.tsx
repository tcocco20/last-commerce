"use client";

import { Button } from "@/components/ui/button";
import { updateOrderToDelivered } from "@/lib/actions/order.actions";
import React, { useTransition } from "react";
import { toast } from "sonner";
interface MarkAsDeliveredButtonProps {
  orderId: string;
}

const MarkAsDeliveredButton = ({ orderId }: MarkAsDeliveredButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToDelivered(orderId);
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message, {
              richColors: true,
            });
          }
        })
      }
    >
      {isPending ? "Processing..." : "Mark as Delivered"}
    </Button>
  );
};

export default MarkAsDeliveredButton;
