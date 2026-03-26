import React from "react";
import { IoPricetagsSharp } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import {BrandCard} from '@/app/_components/BrandCard/BrandCard'

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

async function getBrands(): Promise<Brand[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div
        className="w-full py-10 px-8"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-purple-200 text-sm mb-4">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <FiChevronRight className="text-purple-300" size={14} />
          <span className="text-white font-medium">Brands</span>
        </div>

        {/* Title Row */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <IoPricetagsSharp className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold tracking-tight">Top Brands</h1>
            <p className="text-purple-200 text-sm mt-0.5">Shop from your favorite brands</p>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

<BrandsPage/>
