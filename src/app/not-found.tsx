"use client"
import NotFound from '@/assets/images/not-found.png'
import { PATHS } from '@/constants/path';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function NotfoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      router.push(PATHS.MAIN);
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <Image src={NotFound} alt="not-found" width={200} />
        <p className="mt-4 text-lg">
          {countdown}초 후 메인 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
}