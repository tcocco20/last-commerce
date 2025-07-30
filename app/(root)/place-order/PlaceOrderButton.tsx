import { Button } from "@/components/ui/button";
import { Check, Loader } from "lucide-react";

interface PlaceOrderButtonProps {
  pending: boolean;
}

const PlaceOrderButton = ({ pending }: PlaceOrderButtonProps) => {
  return (
    <Button disabled={pending} className="w-full">
      {pending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Check className="w-4 h-4" />
      )}{" "}
      Place Order
    </Button>
  );
};

export default PlaceOrderButton;
