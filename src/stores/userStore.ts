"use client";

import { create } from "zustand";

interface UserState {
  id: number;
  nickname: string;
  canWalkingMate: boolean;
  isLoggedIn: boolean;
  login: (user: { id: number; canWalkingMate: boolean }) => void; // 로그인
  logout: () => void; // 로그아웃
  initialize: () => void; // 초기화
}

export const useUserStore = create<UserState>((set) => ({
  id: 0,
  nickname: "",
  isLoggedIn: false,
  canWalkingMate: false,
  // 로그인
  login: (user) =>
    set(() => {
      console.log("로그인 호출됨:", user);
      const sessionData = { ...user, isLoggedIn: true };
      sessionStorage.setItem("user", JSON.stringify(sessionData));
      return sessionData;
    }),

  // 로그아웃
  logout: () =>
    set(() => {
      sessionStorage.removeItem("user");
      return { id: 0, canWalkingMate: false, isLoggedIn: false };
    }),
  // 세션 스토리지 초기화
  initialize: () =>
    set(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return { id: 0, canWalkingMate: false, isLoggedIn: false };
    }),
}));
