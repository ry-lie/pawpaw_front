"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { errorToast } from "@/utils/Toast";
{/**로그인 안 한 사용자 로그인이 필요한 페이지 접근 시 */ }
export default function ErrorHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "login_required") {
      errorToast("로그인을 먼저 해주세요.");
    }
  }, [searchParams]);

  return null;
}
