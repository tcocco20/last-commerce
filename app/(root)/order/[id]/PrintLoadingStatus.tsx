"use client";

import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PrintLoadingStatus = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  let status = "";
  if (isPending) {
    status = "Loading...";
  } else if (isRejected) {
    status = "Error Loading PayPal";
  }
  return <div>{status}</div>;
};

export default PrintLoadingStatus;
