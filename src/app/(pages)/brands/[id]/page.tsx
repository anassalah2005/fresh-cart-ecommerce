
import PageHeader from '@/app/_components/common/PageHeader'
import React from 'react'
import { Package } from 'lucide-react'

export default function CategoryProducts({ params }: { params: { id: string } }) {
  return (
<PageHeader icon={<Package color='white' />} description='Shop from your favorite brands'  breadcrumbs={[{ label: 'Brands', href: '/brands' }, { label: 'Brand Products' }]} title="Brand Products" backgroundColor="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" />
  )
}
