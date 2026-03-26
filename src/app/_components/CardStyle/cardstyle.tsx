"use client";

import { FiHeart, FiRefreshCcw, FiEye, FiPlus } from "react-icons/fi";
import { Product } from "@/types/product.type";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border p-3  relative group hover:shadow-md transition">
      
      {/* Image */}
      <div className="relative">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-[180px] object-contain rounded-xl"
        />

        {/* Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow">
            <FiHeart size={16} />
          </button>
          <button className="bg-white p-2 rounded-full shadow">
            <FiRefreshCcw size={16} />
          </button>
          <Link href={`/productdetails/${product._id}`} className="bg-white p-2 rounded-full shadow">
            <FiEye size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        {/* Category */}
        <p className="text-xs text-gray-400">
          {product.category.name}
        </p>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
          {"★".repeat(Math.floor(product.ratingsAverage))}
          <span className="text-gray-500 text-xs ml-1">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-green-600">
            {product.priceAfterDiscount ? (
              <span className="line-through text-gray-400">{product.price} EGP</span>
            ) : null}
            <br />
            {product.priceAfterDiscount ? product.priceAfterDiscount : product.price} EGP
          </span>

          {/* Add Button */}
          <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <FiPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}