import React from "react";
import LoginForm from "./LoginForm";
import LoginPageLogo from "@/assets/images/logo/loginPageLogo.png";
import Image from "next/image";
import { PATHS } from "@/constants/path";
import Link from "next/link";

export const metadata = {
  title: "Login - 포포",
  description: "로그인을 진행하세요.",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-9 flex flex-col justify-center items-center">
        <Link href={PATHS.MAIN}>
          <Image
            src={LoginPageLogo}
            alt="로그인로고이미지"
            className="pb-5 xs:mb-10 mb-5 h-48 w-48"
          />
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
