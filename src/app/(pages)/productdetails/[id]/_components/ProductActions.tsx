"use client"

import { useState } from "react"
import { FiShoppingCart, FiZap } from "react-icons/fi"
import { useCartStore } from "@/hooks/useCartStore"
import { useUserStore } from "@/hooks/useUserStore"
import { toast } from "sonner"

export default function ProductActions({ productId, price, stock }: { productId: string, price: number, stock: number }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, isLoading } = useCartStore()
  const { token } = useUserStore()

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add items to cart")
      return
    }
    await addItem(productId, token)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Quantity + Total */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Quantity</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold text-gray-800">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Price</p>
          <p className="text-lg font-bold text-emerald-600">{(price * quantity).toLocaleString()} EGP</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm shadow-emerald-200 disabled:opacity-50"
        >
          <FiShoppingCart className="text-base" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
          <FiZap className="text-base" />
          Buy Now
        </button>
      </div>
    </div>
  )
}
