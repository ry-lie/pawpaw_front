import { NextRequest, NextResponse } from "next/server";
import { PATHS } from "./constants/path";

export const PUBLIC_PATH = [
  PATHS.LOGIN,
  PATHS.JOIN,
  PATHS.FIND_PASSWORD,
] as string[];
export const PROTECTED_PATH = [
  PATHS.WALKMATE,
  PATHS.CHATTING_LIST,
  PATHS.MYPAGE,
] as string[];
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const url = new URL(request.url);
  const isPublicPathRequest = PUBLIC_PATH.includes(url.pathname);
  const isProtectedPath = PROTECTED_PATH.some((path) =>
    url.pathname.startsWith(path),
  );

  const hasToken = cookies.has("connect.sid");

  // 인증된 사용자가 퍼블릭 페이지에 접근하려는 경우
  if (hasToken && isPublicPathRequest) {
    return NextResponse.redirect(new URL(PATHS.MAIN, request.url));
  }

  // 인증되지 않은 사용자가 보호된 경로에 접근하려는 경우
  if (!hasToken && isProtectedPath) {
    const loginUrl = new URL(PATHS.LOGIN, request.url);
    loginUrl.searchParams.set("error", "login_required"); // 상태 전달
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/map/place/:path*/review/:path*",
    "/auth/:path*",
    "/mypage/:path*",
    "/chat/:path*",
    "/map/walkmate/:path*",
  ],
};
