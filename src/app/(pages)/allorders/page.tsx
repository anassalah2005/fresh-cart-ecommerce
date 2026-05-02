"use client"

import { useEffect, useState } from "react"
import { useUserStore } from "@/hooks/useUserStore"
import { getUserOrders } from "@/services/order"
import { FiPackage, FiCalendar, FiMapPin, FiTruck } from "react-icons/fi"
import Link from "next/link"

export default function OrdersPage() {
  const { user } = useUserStore()
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (user?.id || user?._id) {
        const userId = user.id || user._id
        const data = await getUserOrders(userId)
        setOrders(data || [])
      }
      setIsLoading(false)
    }
    fetchOrders()
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your orders</h1>
          <Link href="/login" className="bg-green-500 text-white px-6 py-2 rounded-lg">Login</Link>
        </div>
      )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
            <FiPackage size={40} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h1>
        <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
        <Link href="/shop" className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Order Date</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <FiCalendar className="text-green-500" /> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Amount</p>
                    <p className="text-sm font-bold text-green-600">{order.totalOrderPrice} EGP</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.isPaid ? 'Paid' : 'Payment Pending'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'In Transit'}
                    </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Products */}
                    <div className="md:col-span-2 space-y-4">
                        {order.cartItems.map((item: any) => (
                            <div key={item._id} className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 p-1">
                                    <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.product.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Quantity: {item.count} × {item.price} EGP</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="md:col-span-1 bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 flex items-center gap-2">
                            <FiMapPin className="text-green-500" /> Shipping To
                        </h4>
                        <p className="text-sm font-semibold text-gray-800">{order.user.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.shippingAddress.details}</p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.city}</p>
                        <p className="text-sm text-gray-600 mt-2 font-medium">{order.shippingAddress.phone}</p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                             <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Payment Method</p>
                             <p className="text-sm font-bold text-gray-700">{order.paymentMethodType === 'card' ? 'Online Payment' : 'Cash on Delivery'}</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
