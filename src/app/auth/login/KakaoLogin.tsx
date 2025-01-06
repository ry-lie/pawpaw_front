"use client";

import Image from "next/image";
import KakaoLoginButtonImg from "@/assets/images/kakaoResource/kakao_login_large_wide.png";

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
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
