import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./CartTable";

export const metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
