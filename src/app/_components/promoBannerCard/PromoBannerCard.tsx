import { FiArrowRight, FiTag } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface BannerProps {
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  subtitle: string;
  discount: string;
  coupon: string;
  buttonText: string;
  gradient: string;
  accentCircle1: string;
  accentCircle2: string;
  onClick?: () => void;
}

function PromoBannerCard({
  badge,
  badgeIcon,
  title,
  subtitle,
  discount,
  coupon,
  buttonText,
  gradient,
  accentCircle1,
  accentCircle2,
  onClick,
}: BannerProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-7 flex flex-col justify-between min-h-[180px] cursor-pointer group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl ${gradient}`}
    >
      {/* Decorative circles */}
      <div
        className={`absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-sm ${accentCircle1}`}
      />
      <div
        className={`absolute -bottom-10 right-12 w-28 h-28 rounded-full opacity-15 blur-md ${accentCircle2}`}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 border border-white/30">
        <span className="text-yellow-200">{badgeIcon}</span>
        {badge}
      </div>

      {/* Title & subtitle */}
      <div className="z-10">
        <h3 className="text-white font-extrabold text-2xl leading-tight mb-1">
          {title}
        </h3>
        <p className="text-white/75 text-sm mb-4">{subtitle}</p>

        {/* Discount */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-white font-black text-3xl tracking-tight">
            {discount}
          </span>
          <div className="flex items-center gap-1.5 bg-white/20 border border-white/30 text-white/90 text-xs font-medium px-2.5 py-1 rounded-md">
            <FiTag className="text-white/70" size={11} />
            Use code:{" "}
            <span className="font-bold tracking-wide text-white">{coupon}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:gap-3 group-hover:bg-white/95"
        >
          {buttonText}
          <FiArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

export default function PromoBanners() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-10xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        <PromoBannerCard
          badge="Deal of the Day"
          badgeIcon={<HiSparkles size={12} />}
          title="Fresh Organic Fruits"
          subtitle="Get up to 40% off on selected organic fruits"
          discount="40% OFF"
          coupon="ORGANIC40"
          buttonText="Shop Now"
          gradient="bg-gradient-to-br from-green-500 via-green-600 to-emerald-700"
          accentCircle1="bg-green-300"
          accentCircle2="bg-emerald-400"
        />

        <PromoBannerCard
          badge="New Arrivals"
          badgeIcon={<HiSparkles size={12} />}
          title="Exotic Vegetables"
          subtitle="Discover our latest collection of premium vegetables"
          discount="25% OFF"
          coupon="FRESH25"
          buttonText="Explore Now"
          gradient="bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500"
          accentCircle1="bg-orange-300"
          accentCircle2="bg-rose-400"
        />
      </div>
    </section>
  );
}
