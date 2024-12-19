import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  validate?: (value: string) => string | boolean;
}

export default function Input({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  validate,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as { message?: string };

  return (
    <div className={`min-w-full`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${className} border border-stroke_gray p-2`}
        {...register(name, { validate, required: `${label || name}는 필수 입력 항목입니다` })}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
