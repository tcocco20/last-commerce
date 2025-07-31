"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/lib/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (res.success) {
        toast.success(res.message, {
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
    });
  };

  const existingItem =
    cart && cart?.items.find((x) => x.productId === item.productId);

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(existingItem!.productId);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to remove item from cart", {
          richColors: true,
        });
      }
    });
  };

  return existingItem ? (
    <div>
      <Button variant={"outline"} type="button" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existingItem.quantity}</span>
      <Button variant={"outline"} type="button" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
