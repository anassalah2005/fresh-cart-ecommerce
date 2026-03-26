import { BounceLoader, ClipLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <BounceLoader color="green" />
    </div>
  )
}
