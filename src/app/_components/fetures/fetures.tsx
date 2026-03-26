// app/_components/FeaturesBar/FeaturesBar.tsx
import { FaTruck } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import { BsHeadset } from 'react-icons/bs';

const features = [
  {
    icon: <FaTruck className="text-blue-500 text-2xl" />,
    bgColor: 'bg-blue-100',
    title: 'Free Shipping',
    subtitle: 'On orders over 500 EGP',
  },
  {
    icon: <MdSecurity className="text-green-600 text-2xl" />,
    bgColor: 'bg-green-100',
    title: 'Secure Payment',
    subtitle: '100% secure transactions',
  },
  {
    icon: <TbRefresh className="text-orange-400 text-2xl" />,
    bgColor: 'bg-orange-100',
    title: 'Easy Returns',
    subtitle: '14-day return policy',
  },
  {
    icon: <BsHeadset className="text-purple-500 text-2xl" />,
    bgColor: 'bg-purple-100',
    title: '24/7 Support',
    subtitle: 'Dedicated support team',
  },
];

export default function FeaturesBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-6 bg-gray-50">
      {features.map((feature, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm"
        >
          <div className={`${feature.bgColor} p-3 rounded-xl flex-shrink-0`}>
            {feature.icon}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{feature.title}</p>
            <p className="text-gray-500 text-xs">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}