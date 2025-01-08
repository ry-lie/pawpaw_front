"use client";

import Image from "next/image";
import KakaoLoginButtonImg from "@/assets/images/kakaoResource/kakao_login_large_wide.png";
import { kakaoLoginAPI } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { errorToast } from "@/utils/toast";

export default function KakaoLogin() {
  const router = useRouter();
  const handleKakaoLogin = async () => {
    try {
      const redirectUrl = await kakaoLoginAPI();
      router.push(redirectUrl);
    } catch {
      errorToast("카카오로그인을 다시 시도해주세요.")
    }
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
