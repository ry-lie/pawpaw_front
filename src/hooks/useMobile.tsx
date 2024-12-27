"use client"

import { useState, useEffect } from "react";

const mobileRegex = /iPhone|iPad|iPod|Android/i;

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  
  useEffect(() => {
    setIsMobile(mobileRegex.test(window.navigator.userAgent));
  }, []);

  return { 
    isMobile, 
    isMounting: isMobile === undefined // 렌더링 초기 상태를 확인
  };
};