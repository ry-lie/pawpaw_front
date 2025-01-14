import ModifyForm from "./ModifyForm";

export const metadata = {
  title : "회원정보수정 - 포포"
}

export default function MyInfoModifyPage() {
  return (
    <div className="flex flex-col min-h-full justify-center items-center font-bold">
  
      <div>
        <ModifyForm />
      </div>

    </div>
  )
}