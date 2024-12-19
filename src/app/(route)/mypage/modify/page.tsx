import ChangeImage from "./ChangeImage";
import ModifyForm from "./ModifyForm";

export default function MyInfoModifyPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center font-bold">
      <div className="text-2xl">
        회원정보 수정
        <div className="mt-5">
        <ChangeImage />
        </div>
      </div>
      <div className="mt-5">
        <ModifyForm />
      </div>

    </div>
  )
}