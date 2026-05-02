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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10 py-10 bg-transparent">
      {features.map((feature, i) => (
        <div
          key={i}
          className="glass dark:glass-dark flex items-center gap-5 rounded-3xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/20 group"
        >
          <div className={`${feature.bgColor} p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
            {feature.icon}
          </div>
          <div>
            <p className="font-extrabold text-foreground text-sm uppercase tracking-tight">{feature.title}</p>
            <p className="text-muted-foreground text-[11px] font-medium leading-relaxed">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}