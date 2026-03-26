  import { Product } from "@/types/product.type";
  
  export async function getAllProducts () : Promise<Product[]> {
try {
    
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "force-cache"
    });
    const data = await res.json();
    return data.data;
  }
 catch (error) {
  console.error("Error fetching products:", error);
  return [];
}
}
export async function getProductById (id: string) : Promise<Product> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: "force-cache"
    });
    const data = await res.json();
    return data.data;
  }
 catch (error) {
  console.error("Error fetching product:", error);
  return {} as Product;
}
}
