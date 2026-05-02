
 export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  images?: string[];
  id: string;
  quantity: number;
  category: categorytype;
  brand: {
    name: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
}
 export interface categorytype {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

