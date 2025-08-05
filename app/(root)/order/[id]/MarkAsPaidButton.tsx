"use client";

import { Button } from "@/components/ui/button";
import { updateOrderToPaidCOD } from "@/lib/actions/order.actions";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface MarkAsPaidButtonProps {
  orderId: string;
}

const MarkAsPaidButton = ({ orderId }: MarkAsPaidButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidCOD(orderId);
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
      {isPending ? "Processing..." : "Mark as Paid"}
    </Button>
  );
};

export default MarkAsPaidButton;
