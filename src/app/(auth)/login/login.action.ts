"use server";

import { cookies } from "next/headers";
import z from "zod";

const schema = z
  .object({

    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Must be at least 8 characters with numbers and symbols")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a symbol"),
  })

type FormData = z.infer<typeof schema>
export async function loginAction(values: FormData) {
    console.log("values", values)
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const data = await res.json()
    console.log("data", data)
    const cookieStore = await cookies()
    cookieStore.set("token", data.token,{
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })  
    return data
}