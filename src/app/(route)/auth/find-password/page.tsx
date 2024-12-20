import Nav from "@/app/components/Nav/Nav";
import FindPasswordForm from "./FindPasswordForm";

export default function FindPasswordPage() {
  return (
    <div className="flex flex-col justify-center min-h-full items-center">
      <Nav />
      <div className="font-bold text-2xl">
        비밀번호 찾기
      </div>
      <div className="flex flex-col">
        <FindPasswordForm />
      </div>
    </div>
  )
}