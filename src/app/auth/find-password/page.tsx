
import FindPasswordForm from "./FindPasswordForm";

export const metadata = {
  title: "비밀번호 찾기 - 포포",
  description: "비밀번호 찾기",
};

export default function FindPasswordPage() {
  return (
    <div className="flex flex-col justify-center min-h-full items-center">
      <div className="font-bold text-2xl mb-5">
        비밀번호 찾기
      </div>
      <div className="flex flex-col">
        <FindPasswordForm />
      </div>
    </div>
  )
}