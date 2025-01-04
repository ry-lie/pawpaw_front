import QueryProvider from "./QueryProvider";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav/Nav";
import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import Loading from "./loading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ErrorHandler from "./ErrorHandler";

export const metadata: Metadata = {
  title:
    "포포(pawpaw) - 네 발 달린 친구들(4paws)과 행복한 추억 만들기를 위한 커뮤니티",
  description:
    "다양한 카테고리별 커뮤니티, 위치기반 반려 동물 동반 장소 추천, 내 주변 산책메이트 찾기, 실시간 채팅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <QueryProvider>
          <Nav />
          <ErrorHandler />
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col w-full min-h-screen sm:max-w-mobile mx-auto bg-background border border-stroke_gray-600">
              {children}
              <Modal />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                className="text-sm pt-12 pr-3 mb-1"
              />
            </div>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
