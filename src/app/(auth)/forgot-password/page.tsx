"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { forgotPassword } from "@/services/auth"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaArrowLeft, FaEnvelope } from "react-icons/fa"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
})

type FormData = z.infer<typeof schema>

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const data = await forgotPassword(values.email)
    setIsLoading(false)

    if (data.statusMsg === "success" || data.message === "Reset code sent to your email") {
      toast.success("Reset code sent to your email")
      router.push("/verify-code")
    } else {
      toast.error(data.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-500 hover:text-green-500 transition text-sm mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Login
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-500 text-sm">
            Enter your email address and we'll send you a code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700">Email Address</FieldLabel>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="pl-10 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  )
}
