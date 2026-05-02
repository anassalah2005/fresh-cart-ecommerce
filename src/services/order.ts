const BASE_URL_V2 = "https://ecommerce.routemisr.com/api/v2";
const BASE_URL_V1 = "https://ecommerce.routemisr.com/api/v1";

export async function createCashOrder(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string) {
  try {
    const res = await fetch(`${BASE_URL_V2}/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    });
    return await res.json();
  } catch (error) {
    console.error("Create order error:", error);
    return null;
  }
}

export async function createCheckoutSession(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string) {
    try {
      // Use window.location.origin for redirect URL
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const res = await fetch(`${BASE_URL_V2}/orders/checkout-session/${cartId}?url=${origin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ shippingAddress }),
      });
      return await res.json();
    } catch (error) {
      console.error("Create checkout session error:", error);
      return null;
    }
  }

export async function getUserOrders(userId: string) {
  try {
    const res = await fetch(`${BASE_URL_V1}/orders/user/${userId}`);
    return await res.json();
  } catch (error) {
    console.error("Get user orders error:", error);
    return [];
  }
}
