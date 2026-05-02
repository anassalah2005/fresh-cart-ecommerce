"use client";

import { FiHeart, FiRefreshCcw, FiEye, FiPlus } from "react-icons/fi";
import { Product } from "@/types/product.type";
import Link from "next/link";
import { useUserStore } from "@/hooks/useUserStore";
import { useCartStore } from "@/hooks/useCartStore";

export default function Cardstyle({ product }: { product: Product }) {
  const { token } = useUserStore()
  const { addItem, isLoading } = useCartStore()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await addItem(product._id, token!)
  }

  return (
    <div className="bg-white rounded-2xl border p-3 relative group hover:shadow-md transition">
      
      {/* Image */}
      <Link href={`/productdetails/${product._id}`}>
        <div className="relative">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[180px] object-contain rounded-xl"
          />

          {/* Icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
            <button className="bg-white p-2 rounded-full shadow hover:bg-red-50 hover:text-red-500 transition">
              <FiHeart size={16} />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-green-50 hover:text-green-500 transition">
              <FiRefreshCcw size={16} />
            </button>
            <Link href={`/productdetails/${product._id}`} className="bg-white p-2 rounded-full shadow hover:bg-blue-50 hover:text-blue-500 transition">
              <FiEye size={16} />
            </Link>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="mt-3">
        {/* Category */}
        <p className="text-xs text-green-600 font-medium mb-1">
          {product.category.name}
        </p>

        {/* Title */}
        <Link href={`/productdetails/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-green-600 transition">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
          {"★".repeat(Math.floor(product.ratingsAverage))}
          <span className="text-gray-500 text-xs ml-1 font-medium">
            ({product.ratingsAverage})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-xs line-through text-gray-400">{product.price} EGP</span>
                <span className="font-bold text-green-600">{product.priceAfterDiscount} EGP</span>
              </>
            ) : (
              <span className="font-bold text-green-600">{product.price} EGP</span>
            )}
          </div>

          {/* Add Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-green-500 text-white p-2.5 rounded-xl hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50"
            title="Add to Cart"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}