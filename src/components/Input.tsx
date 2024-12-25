'use client';

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  children,
  errorMessage,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-md font-bold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
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
          className={`border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${className}`}
          {...props}
        />

      </div>
      <div>
        {errorMessage && (
          <div>
            <p className="mt-1 text-sm text-accent_orange">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;