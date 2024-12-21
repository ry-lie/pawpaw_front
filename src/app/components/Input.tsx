import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  validate?: (value: string) => string | boolean;
  children?: React.ReactNode;
}

export default function Input({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  validate,
  children,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as { message?: string };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-md font-bold text-gray-700">
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
          id={name}
          type={type}
          placeholder={placeholder}
          className={`border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${className} `}
          {...register(name, { validate, required: `${label || name}는 필수 입력 항목입니다` })}
        />
      </div>
      {error && <p className="mt-1 text-sm text-accent_orange">{error.message}</p>}
    </div>
  );
}
