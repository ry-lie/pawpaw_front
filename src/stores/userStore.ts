"use client";

import { getMyPage } from "@/lib/api/user";
import { create } from "zustand";

interface UserState {
  id: number;
  nickname: string;
  imageUrl: string;
  canWalkingMate: boolean;
  isLoggedIn: boolean;
  login: () => void; // 로그인
  logout: () => void; // 로그아웃
  initialize: () => void; // 초기화
  fetchUserInfo: () => Promise<void>;
}
export const useUserStore = create<UserState>((set) => ({
  id: 0,
  nickname: "",
  imageUrl: "",
  isLoggedIn: false,
  canWalkingMate: false,

  // 로그인
  login: () => {
    sessionStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true });
  },
  // 로그아웃
  logout: () => {
    sessionStorage.removeItem("isLoggedIn");
    set({
      id: 0,
      nickname: "",
      imageUrl: "",
      canWalkingMate: false,
      isLoggedIn: false,
    });
  },

  // 초기화
  initialize: async () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      try {
        const user = await getMyPage();
        set({
          id: user.id,
          nickname: user.nickname,
          imageUrl: user.imageUrl,
          canWalkingMate: user.canWalkingMate,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
        set({ isLoggedIn: false });
        sessionStorage.removeItem("isLoggedIn");
      }
    } else {
      set({ isLoggedIn: false });
    }
  },

  // 유저 정보 가져오기
  fetchUserInfo: async () => {
    try {
      const user = await getMyPage();
      set({
        id: user.id,
        nickname: user.nickname,
        imageUrl: user.imageUrl,
        canWalkingMate: user.canWalkingMate,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("유저 정보를 가져오는데 실패했습니다:", error);
    }
  },
}));
