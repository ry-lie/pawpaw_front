import React from "react";
import LoginForm from "./LoginForm";


export const metadata = {
  title: "Login - 포포",
  description: "로그인을 진행하세요.",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-9">
        <h1 className="text-2xl font-bold text-center mb-4">Logo</h1>
        <LoginForm />
      </div>
    </div>
  );
}
