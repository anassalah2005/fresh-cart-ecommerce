"use client";

import { FiHeart, FiRefreshCcw, FiEye, FiPlus } from "react-icons/fi";
import { Product } from "@/types/product.type";
import Link from "next/link";
import { useUserStore } from "@/hooks/useUserStore";
import { useCartStore } from "@/hooks/useCartStore";

export default function ProductCard({ product }: { product: Product }) {
  const { token } = useUserStore()
  const { addItem, isLoading } = useCartStore()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await addItem(product._id, token!)
  }

  return (
    <div className="glass dark:glass-dark rounded-3xl p-3 relative group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden">
      
      {/* Image Container */}
      <Link href={`/productdetails/${product._id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-white/50 to-transparent dark:from-white/5">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[200px] object-contain transform group-hover:scale-110 transition-transform duration-700"
          />

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
            <button className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
              <FiHeart size={16} />
            </button>
            <button className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-90">
              <FiRefreshCcw size={16} />
            </button>
            <Link href={`/productdetails/${product._id}`} className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
              <FiEye size={16} />
            </Link>
          </div>

          {/* Discount Badge */}
          {product.priceAfterDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse-subtle">
              SALE
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="mt-4 px-1">
        {/* Category & Rating Row */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-[10px] uppercase tracking-wider text-primary font-bold opacity-80">
            {product.category.name}
          </p>
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            {"★"}
            <span className="text-foreground/60 font-semibold">
              {product.ratingsAverage}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/productdetails/${product._id}`}>
          <h3 className="text-sm font-bold text-foreground/90 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {product.title}
          </h3>
        </Link>

        {/* Price & Action Row */}
        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-[10px] line-through text-muted-foreground decoration-red-500/50">{product.price} EGP</span>
                <span className="font-extrabold text-lg text-primary leading-tight">{product.priceAfterDiscount} <span className="text-[10px]">EGP</span></span>
              </>
            ) : (
              <span className="font-extrabold text-lg text-primary leading-tight">{product.price} <span className="text-[10px]">EGP</span></span>
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