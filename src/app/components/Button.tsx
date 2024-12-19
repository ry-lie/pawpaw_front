"use client"

import { MouseEventHandler } from "react";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  isDisabled?: boolean;
}
export default function Button({
  title,
  containerStyles = "",
  handleClick,
  btnType = "button",
  textStyles = "",
}: CustomButtonProps) {
  return (
    <button
      type={btnType || "button"}
      className={`bg-primary hover:bg-hover transition-colors  text-white rounded-md font-bold text-xl ${containerStyles}`}
      onClick={handleClick}>
      <span className={`${textStyles}`}>{title}</span>
    </button>
  );
}