"use client"

import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaStar, FaShieldAlt, FaTruck, FaUser } from "react-icons/fa"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { loginAction } from "./login.action"
import { useUserStore } from "@/hooks/useUserStore"


// ── Zod schema ────────────────────────────────────────────────────────────────
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


// ── Feature list ───────────────────────────────────────────────────────────
const features = [
  {
    icon: <FaStar className="text-green-600 text-lg" />,
    title: "Premium Quality",
    desc: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: <FaTruck className="text-green-600 text-lg" />,
    title: "Fast Delivery",
    desc: "Same-day delivery available in most areas",
  },
  {
    icon: <FaShieldAlt className="text-green-600 text-lg" />,
    title: "Secure Shopping",
    desc: "Your data and payments are completely secure",
  },
]

// ── Component ──────────────────────────────────────────────────────────────
export default function login() {


  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  })









  const setToken = useUserStore((state) => state.setToken)
  const setUser = useUserStore((state) => state.setUser)

  async function onSubmit(values: FormData) {
    console.log("values", values)
    
    const data = await loginAction(values)
    

    if (data.message === "success") {
        setToken(data.token)
        setUser(data.user)
        toast.success("Login successful", {
          position: "top-center",
          richColors: true,
          
        })
        router.push("/")  
    } else {
      toast.error(data.message || "Failed to login", {
        position: "top-center",
        richColors: true,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* ── Left panel ── */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to{" "}
              <span className="text-green-500">FreshCart</span>
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            {/* Features */}
            <div className="space-y-5 mb-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                    <p className="text-gray-500 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden">
                  <FaUser className="text-orange-500 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Sarah Johnson</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs italic">
                "FreshCart has transformed my shopping experience. The quality of the
                products is outstanding, and the delivery is always on time. Highly
                recommend!"
              </p>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="md:w-1/2 bg-white border-l border-gray-100 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Start your fresh journey with us today
          </p>

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <FcGoogle className="text-xl" />
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>

            {/* Name */}


            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    autoComplete="off"
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                      fieldState.invalid ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="new-password"
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                      fieldState.invalid ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  <p className="text-xs text-gray-400 mt-0.5">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                  <div className="flex justify-end">
                    <a href="/forgot-password" title="Forgot Password" id="forgot-password-link" className="text-sm text-green-500 hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition text-sm"
            >
              <FaUser className="text-base" />
              Sign In
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-xs text-gray-500 mt-5">
            Don't have an account?
            <a href="/register" className="text-green-500 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
