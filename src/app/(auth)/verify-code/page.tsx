"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { verifyResetCode } from "@/services/auth"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaArrowLeft, FaKey } from "react-icons/fa"

const schema = z.object({
  resetCode: z.string().min(1, "Code is required"),
})

type FormData = z.infer<typeof schema>

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const data = await verifyResetCode(values.resetCode)
    setIsLoading(false)

    if (data.status === "Success") {
      toast.success("Code verified successfully")
      // Store code or email in session for reset password page
      router.push("/reset-password")
    } else {
      toast.error(data.message || "Invalid or expired code")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <button 
            onClick={() => router.push("/forgot-password")} 
            className="flex items-center text-gray-500 hover:text-green-500 transition text-sm mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Code</h1>
          <p className="text-gray-500 text-sm">
            Please enter the 6-digit code sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700">Reset Code</FieldLabel>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                {...register("resetCode")}
                type="text"
                placeholder="Enter 6-digit code"
                className="pl-10 w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            {errors.resetCode && <FieldError errors={[errors.resetCode]} />}
          </Field>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  )
}
