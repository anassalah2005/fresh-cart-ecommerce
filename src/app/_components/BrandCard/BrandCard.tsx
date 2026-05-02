import { Brand } from "@/types/brands.type";
import Link from "next/link";


export function BrandCard({ brand }: { brand: Brand })
 {

  console.log(brand, "brand");
  return (
    <Link href={`/brands/${brand._id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden">
      {/* Logo Area */}
      <div className="flex items-center justify-center p-5 h-28 bg-gray-50 group-hover:bg-purple-50 transition-colors duration-300">
        <img
          src={brand.image}
          alt={brand.name}
          className="object-contain max-h-14 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Brand Name */}
      <div className="px-3 py-2.5 border-t border-gray-100">
        <p className="text-center text-xs font-medium text-gray-600 group-hover:text-purple-600 transition-colors truncate">
          {brand.name}
        </p>
      </div>
    </Link>
  );
}