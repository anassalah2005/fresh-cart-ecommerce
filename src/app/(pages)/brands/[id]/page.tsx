import PageHeader from '@/app/_components/common/PageHeader'
import { Package } from 'lucide-react'
import { getAllProducts } from '@/services/product'
import { Product } from '@/types/product.type'
import ProductCard from '@/app/_components/CardStyle/cardstyle';
import NoProducts from '@/app/_components/emptybrand/emptybrand';


export default async function CategoryProducts({ params }: { params: Promise<{ id: string }> }) {
async function getAllProducts(id: string): Promise<Product[]> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`, {
      cache: "force-cache"
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();
    return data.data ?? []; // ✅ fallback if data.data is undefined/null

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
  const { id } = await params;
  const products = await getAllProducts(id);
  console.log(products, 'products');

  return (
<>
      <PageHeader
        icon={<Package color='white' />}
        description='Shop from your favorite brands'
        breadcrumbs={[{ label: 'Brands', href: '/brands' }, { label: 'Brand Products' }]}
        title="Brand Products"
        backgroundColor="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
      />

      {products.length === 0 ? (
        // ✅ NoProducts is outside any grid so it can center freely
        <NoProducts />
      ) : (
        // ✅ single grid wrapper, no nesting
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 my-5'>
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
