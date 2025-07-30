import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import PaymentMethodForm from "./PaymentMethodForm";
import CheckoutSteps from "@/components/shared/CheckoutSteps";

export const metadata: Metadata = {
  title: "Payment Method",
  description: "Choose your payment method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps currentStep={2} />
      <PaymentMethodForm preferredPaymentMethod={user?.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
