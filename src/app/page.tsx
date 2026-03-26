import Cardstyle from '@/app/_components/CardStyle/cardstyle'
import { Product } from '@/types/product.type' 
import { getAllProducts } from '@/servi/product';
import image1 from '@/assets/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import MySlider from './_components/mySlider/Myslider';
import FeaturesBar from './_components/fetures/fetures';
import ShopByCategory from './_components/shopbycat/ShopByCategory';
import PromoBanners from './_components/promoBannerCard/PromoBannerCard';

const slides = [
  {
    image: image1.src,
    title: 'Fresh Products Delivered to your Door',
    subtitle: 'Get 20% off your first order',
    buttons: [
      { label: 'Shop Now', variant: 'solid' as const },
      { label: 'View Deals', variant: 'outline' as const },
    ],
  },
  {
    image: image1.src,
    title: 'Organic & Healthy Groceries',
    subtitle: 'Farm-fresh produce every day',
    buttons: [
      { label: 'Shop Now', variant: 'solid' as const },
      { label: 'View Deals', variant: 'outline' as const },
    ],
  },
  {
    image: image1.src,
    title: 'Weekly Deals Just for You',
    subtitle: 'Save big on seasonal favorites',
    buttons: [
      { label: 'Shop Now', variant: 'solid' as const },
      { label: 'View Deals', variant: 'outline' as const },
    ],
  },
];


export default async function Page() {
const images = [image1.src, image1.src, image1.src];


  const products = await getAllProducts();
  console.log(products);

  return (
    <div>
      <MySlider slides={slides} />
      <FeaturesBar />
      <ShopByCategory />
      <PromoBanners />
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {products.map((product: any) => (
        <Cardstyle key={product._id} product={product} />
      ))}
    </div>
    </div>
  )
}
