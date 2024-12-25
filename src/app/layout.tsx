import QueryProvider from "./QueryProvider";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav/Nav";
import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "포포(pawpaw) - 네 발 달린 친구들(4paws)과 행복한 추억 만들기를 위한 커뮤니티",
  description: "다양한 카테고리별 커뮤니티, 위치기반 반려 동물 동반 장소 추천, 내 주변 산책메이트 찾기, 실시간 채팅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Nav />
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col w-full min-h-screen max-w-mobile bg-background border border-stroke_gray-600">
              {children}
              <Modal />
            </div>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
