import Link from 'next/link';
import { FaFolder } from 'react-icons/fa';
import { Card } from '@/components/ui/card';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface SubcategoryCardProps {
  subcategory: Subcategory;
}

export default function SubcategoryCard({ subcategory }: SubcategoryCardProps) {
  return (
    <Link href={`/subcategory/${subcategory.slug}`}>
      <Card className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-gray-100">
        <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl">
          <FaFolder className="text-green-500 text-2xl" />
        </div>
        <p className="font-bold text-gray-900 text-sm leading-snug">
          {subcategory.name}
        </p>
      </Card>
    </Link>
  );
}
