import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./OrderDetailsTable";
import { Order, ShippingAddress } from "@/lib/types";

export const metadata: Metadata = {
  title: "Order Details",
  description: "View your order details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }
  return (
    <OrderDetailsTable
      order={
        {
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        } as Order
      }
      paypalClientId={process.env.NEXT_PAYPAL_CLIENT_ID || "sb"}
    />
  );
};

export default OrderDetailsPage;
