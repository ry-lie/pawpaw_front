"use client";

import Image from "next/image";
import KakaoLoginButtonImg from "@/assets/images/kakaoResource/kakao_login_large_wide.png";
import { kakaoLoginAPI } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function KakaoLogin() {
  const router = useRouter();
  const handleKakaoLogin = async () => {
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    // window.location.href = kakaoAuthUrl;
    const redirectUrl = await kakaoLoginAPI();
    console.log(redirectUrl);
    router.push(redirectUrl);
  };

  return (
    <>
      <button type="button" onClick={handleKakaoLogin}>
        <Image
          src={KakaoLoginButtonImg}
          alt="카카오 로그인"
          className="mt-5"
        />
      </button>
    </>
  );
}
