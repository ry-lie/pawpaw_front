'use client';

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  errorMessage?: string;
  disabled?: boolean; // disabled 상태 추가
  tooltipMessage?: string; // 툴팁 메시지 추가
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  children,
  errorMessage,
  disabled = false,
  tooltipMessage = "입력이 비활성화되어 있습니다.", // 기본 툴팁 메시지
  ...props
}, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-md font-bold text-gray-700">
          {label}
        </label>
      )}
      <div
        className="relative"
        onMouseEnter={() => {
          if (disabled) setShowTooltip(true);
        }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {children}
          </div>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${className}`}
          {...props}
        />
        {/**툴팁*/}
        {showTooltip && disabled && tooltipMessage && (
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-primary text-white text-xs rounded-md px-2 py-1 shadow-md z-[100]"
            style={{ whiteSpace: "nowrap" }}
            role="tooltip"
          >
            {tooltipMessage}
          </div>
        )}
      </div>
      {errorMessage && (
        <div>
          <p className="mt-1 text-[12px] text-accent_orange">{errorMessage}</p>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
