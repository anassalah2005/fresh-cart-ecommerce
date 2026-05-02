"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/services/auth"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaLock } from "react-icons/fa"
import { useUserStore } from "@/hooks/useUserStore"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  newPassword: z
    .string()
    .min(8, "Must be at least 8 characters")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain a symbol"),
})

type FormData = z.infer<typeof schema>

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setToken = useUserStore((state) => state.setToken)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const data = await resetPassword(values.email, values.newPassword)
    setIsLoading(false)

    if (data.token) {
      setToken(data.token)
      toast.success("Password reset successful")
      router.push("/")
    } else {
      toast.error(data.message || "Failed to reset password")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-500 text-sm">
            Enter your email and your new password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700">Email Address</FieldLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
            />
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700">New Password</FieldLabel>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                {...register("newPassword")}
                type="password"
                placeholder="New password"
                className="pl-10 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            {errors.newPassword && <FieldError errors={[errors.newPassword]} />}
          </Field>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}
