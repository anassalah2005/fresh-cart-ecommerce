import { Brand } from "@/types/brands.type"

export async function getBrands() : Promise<Brand[]> {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    const data = await res.json()
      console.log("data", data)
    return data
  } 


export async function getBrandById(id: string) : Promise<Brand> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const data = await res.json()
      console.log("data", data)
    return data
  } 
