export async function getAllCategories(params?: { id: string }) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories" , {cache: "force-cache"});
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
