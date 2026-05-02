import Link from 'next/link';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

const ALL_CATEGORIES: Category[] = [
  { _id: '6439d61c0049ad0b52b90051', name: 'Music', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg' },
  { _id: '6439d5b90049ad0b52b90048', name: "Men's Fashion", image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg' },
  { _id: '6439d58a0049ad0b52b9003f', name: "Women's Fashion", image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg' },
  { _id: '6439d41c67d9aa4ca97064d5', name: 'SuperMarket', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511452254.png' },
  { _id: '6439d40367d9aa4ca97064cc', name: 'Baby & Toys', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511427130.png' },
  { _id: '6439d3e067d9aa4ca97064c3', name: 'Home', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511392672.png' },
  { _id: '6439d3c867d9aa4ca97064ba', name: 'Books', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511368164.png' },
  { _id: '6439d30b67d9aa4ca97064b1', name: 'Beauty & Health', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511179514.png' },
  { _id: '6439d2f467d9aa4ca97064a8', name: 'Mobiles', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511156008.png' },
  { _id: '6439d2d167d9aa4ca970649f', name: 'Electronics', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png' },
];

const ALL_SUBCATEGORIES: Subcategory[] = [
  { _id: '6407f40db575d3b90bf957fa', name: 'Computer Accessories', slug: 'computer-accessories', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f402b575d3b90bf957f7', name: 'Computer Components', slug: 'computer-components', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3f6b575d3b90bf957f4', name: 'Data Storage', slug: 'data-storage', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3e3b575d3b90bf957f1', name: 'Networking Products', slug: 'networking-products', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3d8b575d3b90bf957ee', name: 'Printers & Accessories', slug: 'printers-and-accessories', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3ccb575d3b90bf957eb', name: 'Cameras & Accessories', slug: 'cameras-and-accessories', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3c0b575d3b90bf957e8', name: 'Video Games', slug: 'video-games', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3b4b575d3b90bf957e5', name: 'Audio & Home Entertainment', slug: 'audio-and-home-entertainment', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f3a8b575d3b90bf957e2', name: 'Laptops & Accessories', slug: 'laptops-and-accessories', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f39bb575d3b90bf957df', name: 'TVs, Satellites & Accessories', slug: 'tvs-satellites-and-accessories', category: '6439d2d167d9aa4ca970649f' },
  { _id: '6407f36db575d3b90bf957dc', name: 'Mobile Gaming & VR Gadgets', slug: 'mobile-gaming-and-vr-gadgets', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f360b575d3b90bf957d9', name: 'Covers & Screen protectors', slug: 'covers-and-screen-protectors', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f34bb575d3b90bf957d6', name: 'Chargers & Cables', slug: 'chargers-and-cables', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f33ab575d3b90bf957d3', name: 'Power Banks', slug: 'power-banks', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f32eb575d3b90bf957d0', name: 'Earphones', slug: 'earphones', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f320b575d3b90bf957cd', name: 'Wireless Earphones', slug: 'wireless-earphones', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f313b575d3b90bf957ca', name: 'Smartwatches & Accessories', slug: 'smartwatches-and-accessories', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f305b575d3b90bf957c7', name: 'All Tablets', slug: 'all-tablets', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f2f7b575d3b90bf957c4', name: 'All Mobile Phones', slug: 'all-mobile-phones', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f2ddb575d3b90bf957be', name: 'Mobile New Arrivals', slug: 'mobile-new-arrivals', category: '6439d2f467d9aa4ca97064a8' },
  { _id: '6407f276b575d3b90bf957b8', name: 'Bags & luggage', slug: 'bags-and-luggage', category: '6439d5b90049ad0b52b90048' },
  { _id: '6407f243b575d3b90bf957ac', name: "Men's Clothing", slug: "men's-clothing", category: '6439d5b90049ad0b52b90048' },
  { _id: '6407f219b575d3b90bf957a9', name: "Kid's Fashion", slug: "kid's-fashion", category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f208b575d3b90bf957a6', name: 'Handbags', slug: 'handbags', category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f1fdb575d3b90bf957a3', name: 'Eyewear', slug: 'eyewear', category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f1ecb575d3b90bf957a0', name: 'Jewellery', slug: 'jewellery', category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f1e1b575d3b90bf9579d', name: 'Watches', slug: 'watches', category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f1cbb575d3b90bf9579a', name: 'Footwear', slug: 'footwear', category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f1bcb575d3b90bf95797', name: "Women's Clothing", slug: "women's-clothing", category: '6439d58a0049ad0b52b9003f' },
  { _id: '6407f198b575d3b90bf95794', name: 'Kitchen & Dining', slug: 'kitchen-and-dining', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f188b575d3b90bf95791', name: 'Home Decor', slug: 'home-decor', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f17cb575d3b90bf9578e', name: 'Furniture', slug: 'furniture', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f163b575d3b90bf9578b', name: 'Tools & Home Improvement', slug: 'tools-and-home-improvement', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f154b575d3b90bf95788', name: 'Bath & Bedding', slug: 'bath-and-bedding', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f149b575d3b90bf95785', name: 'Drinkware', slug: 'drinkware', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f13cb575d3b90bf95782', name: 'Cookware', slug: 'cookware', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f131b575d3b90bf9577f', name: 'Large Appliances', slug: 'large-appliances', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f11eb575d3b90bf9577c', name: 'Home Appliances', slug: 'home-appliances', category: '6439d3e067d9aa4ca97064c3' },
  { _id: '6407f0cbb575d3b90bf95779', name: 'Health & Nutrition', slug: 'health-and-nutrition', category: '6439d30b67d9aa4ca97064b1' },
  { _id: '6407f0bfb575d3b90bf95776', name: 'Personal Care', slug: 'personal-care', category: '6439d30b67d9aa4ca97064b1' },
];

export default async function SpecificCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = ALL_CATEGORIES.find((cat) => cat._id === id);

  // Loop through ALL_SUBCATEGORIES and keep only ones where category matches clicked id
  const subcategories = ALL_SUBCATEGORIES.filter((sub) => sub.category === id);

  return (
    <div className="px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-7 bg-green-600 rounded-full inline-block" />
          {category?.name ?? 'Category'}{' '}
          <span className="text-green-600">Subcategories</span>
        </h1>
        <Link
          href="/categories"
          className="text-green-600 font-medium text-sm hover:underline"
        >
          ← Back to Categories
        </Link>
      </div>

      {/* Category image banner */}
      {category?.image && (
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-6">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Subcategories grid */}
      {subcategories.length === 0 ? (
        <p className="text-gray-400 text-center mt-12">
          No subcategories found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              href={`/shop?subcategory=${sub._id}`}
              className="flex items-center justify-center bg-white border border-gray-100 rounded-2xl py-6 px-3 shadow-sm hover:shadow-md hover:border-green-200 hover:text-green-600 transition-all duration-200 text-sm font-medium text-gray-800 text-center"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}