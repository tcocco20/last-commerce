import { getAccessToken, paypal } from "../lib/paypal";

test("generate token from paypal", async () => {
  const tokenResponse = await getAccessToken();
  console.log(tokenResponse);
  expect(tokenResponse).toBeDefined();
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

test("creates a paypal order", async () => {
  const price = 10.0;
  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);
  expect(orderResponse).toBeDefined();
  expect(orderResponse.id).toBeDefined();
  expect(orderResponse.status).toBe("CREATED");
});

test("simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toBeDefined();
  expect(captureResponse.status).toBe("COMPLETED");

  mockCapturePayment.mockRestore();
});
