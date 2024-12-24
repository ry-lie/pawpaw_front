"use client"

import { MouseEventHandler, ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode
  containerStyles?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
}
export default function Button({
  children,
  btnType,
  onClick,
  containerStyles = "",
  disabled,
  isLoading,
  ...props
}: CustomButtonProps) {
  return (
    <button
      type={btnType || "button"}
      className={`bg-primary hover:bg-hover transition-colors text-white rounded-md font-bold text-xl 
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
        ${containerStyles}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block border-2 border-transparent border-t-white rounded-full w-4 h-4 animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
}