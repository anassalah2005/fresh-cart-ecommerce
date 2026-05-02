import React from 'react'
import { getAllProducts } from '@/services/product'
import ProductCard from '@/app/_components/CardStyle/cardstyle'
import { FiFilter, FiSearch } from 'react-icons/fi'

export default async function ShopPage() {
  const products = await getAllProducts()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-green-600 py-16 px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Shop</h1>
        <p className="text-green-100 max-w-2xl mx-auto">Explore our full collection of fresh groceries and premium products delivered to your door.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
                <FiFilter className="text-green-600" />
                <span>Showing all {products.length} products</span>
            </div>
            
            <div className="relative w-full md:w-96">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search in shop..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
