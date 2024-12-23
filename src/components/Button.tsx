"use client"

import { MouseEventHandler, ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode
  containerStyles?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  isDisabled?: boolean;
  isLoading?: boolean;
}
export default function Button({
  children,
  btnType,
  onClick,
  containerStyles = "",
  isDisabled,
  isLoading,
  ...props
}: CustomButtonProps) {
  return (
    <button
      type={btnType || "button"}
      className={`bg-primary hover:bg-hover transition-colors text-white rounded-md font-bold text-xl 
        ${isDisabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
        ${containerStyles}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}