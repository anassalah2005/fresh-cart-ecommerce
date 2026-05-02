import { Product } from "@/types/product.type";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
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
export async function getProductById(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: "force-cache"
    });

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return {} as Product;
    }

    const data = await res.json();
    return data.data ?? {} as Product; // ✅ fallback if data.data is undefined/null

  } catch (error) {
    console.error("Error fetching product:", error);
    return {} as Product;
  }
}