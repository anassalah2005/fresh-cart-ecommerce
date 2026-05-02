import { getAllCategories } from '@/services/category';
import { categorytype } from '@/types/product.type';
import Link from 'next/link';

export default async function ShopByCategory() {
  const categories = await getAllCategories() as categorytype[];

  return (
    <section className="px-6 py-8 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-7 bg-green-600 rounded-full inline-block" />
          Shop By{' '}
          <span className="text-green-600">Category</span>
        </h2>
        <Link
          href="/categories"
          className="text-green-600 font-medium text-sm flex items-center gap-1 hover:underline"
        >
          View All Categories →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl py-6 px-3 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-50">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="text-sm text-gray-800 font-medium text-center leading-tight">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}