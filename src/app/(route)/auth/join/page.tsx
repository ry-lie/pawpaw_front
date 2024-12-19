import Nav from "@/app/components/Nav/Nav";
import JoinForm from "./JoinForm";

export const metadata = {
  title: "회원가입 - 포포",
  description: "회원가입을 진행하세요",
};

export default function JoinPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Nav />
      <div className="w-full max-w-md p-9 mt-3">
        <h1 className="text-2xl font-bold text-center mb-4">회원가입</h1>
        <JoinForm />
      </div>
    </div>
  )
}