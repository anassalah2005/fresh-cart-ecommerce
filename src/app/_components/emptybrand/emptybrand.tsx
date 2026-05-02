import Link from 'next/link'
import { Package } from 'lucide-react'

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="bg-gray-100 p-5 rounded-full mb-5">
        <Package className="text-gray-400 w-10 h-10" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h2>
      <p className="text-gray-400 text-sm mb-6">No products match your current filters.</p>
      <Link
        href="/brands"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        View All Products
      </Link>
    </div>
  )
}