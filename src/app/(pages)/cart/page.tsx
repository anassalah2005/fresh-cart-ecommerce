"use client"

import { useEffect } from "react"
import { useCartStore } from "@/hooks/useCartStore"
import { useUserStore } from "@/hooks/useUserStore"
import Link from "next/link"
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingCart } from "react-icons/fi"
import { toast } from "sonner"

export default function CartPage() {
  const { token } = useUserStore()
  const { cartItems, totalCartPrice, numOfCartItems, fetchCart, removeItem, updateItemCount, isLoading } = useCartStore()

  useEffect(() => {
    if (token) {
      fetchCart(token)
    }
  }, [token, fetchCart])

  if (!token) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart className="text-3xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8 text-sm">Log in to see your cart and start shopping for fresh products!</p>
          <Link 
            href="/login" 
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Login to your account
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingCart className="text-3xl text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({numOfCartItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product._id} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link href={`/productdetails/${item.product._id}`} className="text-lg font-bold text-gray-900 truncate hover:text-green-600 transition-colors block">
                    {item.product.title}
                  </Link>
                  <p className="text-sm text-green-600 font-medium">{item.product.category?.name}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{item.price} EGP</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button 
                      onClick={() => updateItemCount(item.product._id, item.count - 1, token)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.count}</span>
                    <button 
                      onClick={() => updateItemCount(item.product._id, item.count + 1, token)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.product._id, token)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-green-600">{totalCartPrice} EGP</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-100"
              >
                Proceed to Checkout <FiArrowRight />
              </Link>
              
              <p className="text-xs text-gray-400 text-center mt-4 uppercase tracking-wider font-semibold">
                Secure payment powered by Route
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
