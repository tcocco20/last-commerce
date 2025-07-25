"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/lib/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (res.success) {
      toast.success(`${item.name} added to cart`, {
        action: {
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
      router.refresh();
    } else {
      toast.error(res.message || "Failed to add item to cart", {
        richColors: true,
      });
    }
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;
