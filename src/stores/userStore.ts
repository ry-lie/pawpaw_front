"use client";

import { create } from "zustand";

interface UserState {
  id: number;
  nickname: string;
  imageUrl: string;
  canWalkingMate: boolean;
  isLoggedIn: boolean;
  login: (user: {
    id: number;
    nickname: string;
    imageUrl: string;
    canWalkingMate: boolean;
  }) => void; // 로그인
  logout: () => void; // 로그아웃
  initialize: () => void; // 초기화
}
export const useUserStore = create<UserState>((set) => ({
  id: 0,
  nickname: "",
  imageUrl: "",
  isLoggedIn: false,
  canWalkingMate: false,
  // 로그인
  login: (user) =>
    set(() => {
      const sessionData = { ...user, isLoggedIn: true };
      sessionStorage.setItem("user", JSON.stringify(sessionData));
      return sessionData;
    }),

  // 로그아웃
  logout: () =>
    set(() => {
      sessionStorage.removeItem("user");
      return { id: 0, canWalkingMate: false, nickname: "", isLoggedIn: false };
    }),
  // 세션 스토리지 초기화
  initialize: () =>
    set(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return { id: 0, canWalkingMate: false, nickname: "", isLoggedIn: false };
    }),
}));
