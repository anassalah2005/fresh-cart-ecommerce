
 export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: categorytype;
  brand: {
    name: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
}
 export interface categorytype {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

