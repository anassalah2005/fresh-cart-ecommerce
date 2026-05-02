"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCartStore } from "@/hooks/useCartStore"
import { useUserStore } from "@/hooks/useUserStore"
import { createCashOrder, createCheckoutSession } from "@/services/order"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FiCreditCard, FiTruck, FiCheckCircle } from "react-icons/fi"

const schema = z.object({
  details: z.string().min(5, "Details are required"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
})

type FormData = z.infer<typeof schema>

export default function CheckoutPage() {
  const [isCashLoading, setIsCashLoading] = useState(false)
  const [isOnlineLoading, setIsOnlineLoading] = useState(false)
  const { cartId, totalCartPrice, clearLocalCart } = useCartStore()
  const { token } = useUserStore()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleCashOrder = async (values: FormData) => {
    if (!cartId || !token) return
    setIsCashLoading(true)
    const data = await createCashOrder(cartId, values, token)
    setIsCashLoading(false)

    if (data?.status === 'success') {
      toast.success("Order placed successfully!")
      clearLocalCart()
      router.push("/allorders")
    } else {
      toast.error(data?.message || "Failed to place order")
    }
  }

  const handleOnlineOrder = async (values: FormData) => {
    if (!cartId || !token) return
    setIsOnlineLoading(true)
    const data = await createCheckoutSession(cartId, values, token)
    setIsOnlineLoading(false)

    if (data?.status === 'success') {
      toast.info("Redirecting to payment gateway...")
      window.location.href = data.session.url
    } else {
      toast.error(data?.message || "Failed to initiate payment")
    }
  }

  if (!cartId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No active cart found</h1>
          <button onClick={() => router.push("/shop")} className="text-green-500 font-bold underline">Go back to shop</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiTruck className="text-green-500" /> Shipping Details
            </h2>
            
            <form className="space-y-4">
              <Field>
                <FieldLabel className="text-sm font-medium text-gray-700">Detailed Address</FieldLabel>
                <Input 
                  {...register("details")}
                  placeholder="Street name, building number..."
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {errors.details && <FieldError errors={[errors.details]} />}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-gray-700">Phone Number</FieldLabel>
                <Input 
                  {...register("phone")}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {errors.phone && <FieldError errors={[errors.phone]} />}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-gray-700">City</FieldLabel>
                <Input 
                  {...register("city")}
                  placeholder="e.g. Cairo"
                  className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {errors.city && <FieldError errors={[errors.city]} />}
              </Field>
            </form>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Options</h2>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSubmit(handleCashOrder)}
                  disabled={isCashLoading || isOnlineLoading}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <FiCheckCircle />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when you receive the order</p>
                    </div>
                  </div>
                  {isCashLoading && <div className="animate-spin h-4 w-4 border-b-2 border-green-500"></div>}
                </button>

                <button 
                  onClick={handleSubmit(handleOnlineOrder)}
                  disabled={isCashLoading || isOnlineLoading}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <FiCreditCard />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">Online Payment</p>
                      <p className="text-xs text-gray-500">Visa, Mastercard, or Valu</p>
                    </div>
                  </div>
                   {isOnlineLoading && <div className="animate-spin h-4 w-4 border-b-2 border-blue-500"></div>}
                </button>
              </div>
            </div>

            <div className="bg-green-600 p-6 rounded-2xl shadow-lg text-white">
              <p className="text-sm opacity-80 mb-1">Total Payable</p>
              <p className="text-3xl font-bold">{totalCartPrice} EGP</p>
              <p className="text-xs opacity-60 mt-4 italic">By placing an order, you agree to our Terms & Conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
