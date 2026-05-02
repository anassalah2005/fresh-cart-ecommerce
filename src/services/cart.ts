const BASE_URL = "https://ecommerce.routemisr.com/api/v2";

export async function getCart(token: string) {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: {
        token: token,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Get cart error:", error);
    return null;
  }
}

export async function addToCart(productId: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ productId }),
    });
    return await res.json();
  } catch (error) {
    console.error("Add to cart error:", error);
    return null;
  }
}

export async function updateQuantity(productId: string, count: number, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count }),
    });
    return await res.json();
  } catch (error) {
    console.error("Update quantity error:", error);
    return null;
  }
}

export async function removeFromCart(productId: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Remove from cart error:", error);
    return null;
  }
}

export async function clearCart(token: string) {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Clear cart error:", error);
    return null;
  }
}
