import DogLogo from '@/app/assets/images/logo/logo_none_text.png'
import Image from 'next/image';
export default function Loading() {

  return (
    <div className="flex justify-center items-center h-full flex-grow">
      <Image src={DogLogo} alt="logo" width={200} className="animate-pulse" />
    </div>
  );
}