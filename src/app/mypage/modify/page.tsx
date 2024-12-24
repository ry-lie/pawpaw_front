import ChangeImage from "./ChangeImage";
import ModifyForm from "./ModifyForm";

export default function MyInfoModifyPage() {
  return (
    <div className="flex flex-col min-h-full justify-center items-center font-bold">
      <div className="text-2xl text-center">
        회원정보 수정

        <div className="mt-5">
        <ChangeImage />
        </div>

      </div>

      <div className="mt-8">
        <ModifyForm />
      </div>

    </div>
  )
}