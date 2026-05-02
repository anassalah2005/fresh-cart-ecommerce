const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function forgotPassword(email: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error) {
    console.error("Forgot password error:", error);
    return { statusMsg: "fail", message: "Network error" };
  }
}

export async function verifyResetCode(resetCode: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
    });
    return await res.json();
  } catch (error) {
    console.error("Verify reset code error:", error);
    return { statusMsg: "fail", message: "Network error" };
  }
}

export async function resetPassword(email: string, newPassword: string) {
    try {
      const res = await fetch(`${BASE_URL}/auth/resetPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
      return await res.json();
    } catch (error) {
      console.error("Reset password error:", error);
      return { statusMsg: "fail", message: "Network error" };
    }
  }
