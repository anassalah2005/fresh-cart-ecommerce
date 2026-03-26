import { getProductById } from '@/servi/product'
import { FiShoppingCart, FiHeart, FiShare2, FiZap } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { MdLocalShipping, MdRefresh, MdSecurity } from 'react-icons/md'
import { Product } from '@/types/product.type'


function StarRating({ rating }: { rating: number }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-amber-400 text-sm" />)
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-400 text-sm" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-amber-400 text-sm" />)
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productParams = await params
  const product: Product = await getProductById(productParams.id)

  const thumbnails = product.images?.length
    ? [product.imageCover, ...product.images].slice(0, 4)
    : [product.imageCover, product.imageCover, product.imageCover]

  const displayPrice = product.priceAfterDiscount ?? product.price

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">Home</span>
          <span>/</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">{product.category?.name}</span>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{product.title}</span>
        </nav>
      </div>

      {/* Main product card */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* LEFT — Images */}
            <div className="p-6 flex flex-col gap-4 border-r border-gray-100">
              {/* Main image */}
              <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {thumbnails.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all
                      ${idx === 0 ? 'border-emerald-500 shadow-md shadow-emerald-100' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Info */}
            <div className="p-6 flex flex-col gap-5">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 cursor-pointer hover:bg-emerald-100 transition-colors">
                  {product.category?.name}
                </span>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-200 transition-colors">
                  {product.brand?.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug line-clamp-2">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <StarRating rating={product.ratingsAverage} />
                <span className="text-sm font-semibold text-gray-700">{product.ratingsAverage?.toFixed(1)}</span>
                <span className="text-sm text-gray-400">({product.ratingsQuantity} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">{displayPrice} EGP</span>
                {product.priceAfterDiscount && product.price > product.priceAfterDiscount && (
                  <span className="text-lg text-gray-400 line-through">{product.price} EGP</span>
                )}
              </div>

              {/* Stock badge */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="text-sm font-medium text-emerald-600">In Stock</span>
                {product.quantity && (
                  <span className="text-sm text-gray-400 ml-1">— {product.quantity} available</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              )}

              {/* Quantity + Total */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-medium">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium">
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-gray-800">1</span>
                    <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium">
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Price</p>
                  <p className="text-lg font-bold text-emerald-600">{displayPrice}.00 EGP</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm shadow-emerald-200">
                  <FiShoppingCart className="text-base" />
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  <FiZap className="text-base" />
                  Buy Now
                </button>
              </div>

              {/* Wishlist + Share */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 font-medium py-2.5 rounded-xl transition-colors text-sm">
                  <FiHeart className="text-base" />
                  Add to Wishlist
                </button>
                <button className="w-12 h-10 flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500 rounded-xl transition-colors">
                  <FiShare2 className="text-sm" />
                </button>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <MdLocalShipping className="text-emerald-500 text-xl" />
                  <span className="text-xs font-medium text-gray-700">Free Delivery</span>
                  <span className="text-xs text-gray-400">Orders over 200</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <MdRefresh className="text-emerald-500 text-xl" />
                  <span className="text-xs font-medium text-gray-700">30 Days Return</span>
                  <span className="text-xs text-gray-400">Money back</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <MdSecurity className="text-emerald-500 text-xl" />
                  <span className="text-xs font-medium text-gray-700">Secure Payment</span>
                  <span className="text-xs text-gray-400">100% Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tabs section */}
        <div className="bg-white rounded-2xl shadow-sm mt-4 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {['Product Details', `Reviews (${product.ratingsQuantity})`, 'Shipping & Returns'].map((tab, i) => (
              <button
                key={tab}
                className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2
                  ${i === 0
                    ? 'text-emerald-600 border-b-2 border-emerald-500 -mb-px bg-emerald-50/50'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-3">About this Product</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description || 'No description available.'}
              </p>

              {/* Product info table */}
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Product Information</h4>
                <div className="space-y-2">
                  {[
                    ['Category', product.category?.name],
                    ['Subcategory', "Women's Clothing"],
                    ['Brand', product.brand?.name],
                    ['Items Sold', product.sold ? `${product.sold.toLocaleString()}+ sold` : 'N/A'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-4 text-sm">
                      <span className="w-28 text-gray-400 flex-shrink-0">{label}</span>
                      <span className="text-gray-700 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key features */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {[
                  'Premium Quality Product',
                  '100% Authentic Guarantee',
                  'Fast & Secure Packaging',
                  'Quality Tested',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
