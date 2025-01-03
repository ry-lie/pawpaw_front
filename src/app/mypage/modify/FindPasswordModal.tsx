import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Confirm_icon from "@/assets/icons/confirm_icon.png";
import { updateUser } from "@/lib/api/user";
import { errorToast, successToast } from "@/utils/Toast";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";

export default function FindPasswordModal() {
  
  type FindPasswordInput = {
    password: string;
    newPassword: string;
    confirmPassword: string;
  };

  
  const [isVerified, setIsVerified] = useState(false);
  const userId = useUserStore((state)=>state.id)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordInput>({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
  });
  const newPassword = useWatch({
    control,
    name: "newPassword",
  });
  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });

  const isPasswordMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const DisabledBtn =
    !password ||
    !newPassword ||
    !confirmPassword ||
    Object.keys(errors).length > 0;



  const handleVerifyPassword = async()=>{
    try {
      const response = await updateUser(userId,{password});
      if(response.success){
        successToast("비밀번호가 성공적으로 변경되었습니다.");
        setIsVerified(true);
      } else {
        errorToast("현재 비밀번호가 일치하지 않습니다.");
        setIsVerified(false);
      }
    } catch (e) {
      console.error("Error:", e)
      errorToast("비밀번호 변경 중 오류가 발생했습니다.");
      setIsVerified(false)
    }
  };

   const onSubmit: SubmitHandler<FindPasswordInput> = async (data) => {
   const {newPassword} = data;
   try{
    if(!isVerified){
      errorToast("비밀번호 인증이 필요합니다.");
      return;
    }
    await updateUser(userId, {password : newPassword});
    successToast("비밀번호가 성공적으로 변경되었습니다.")

   }catch(e){
    console.error("Error:" ,e)
    errorToast("비밀번호 변경 중 오류가 발생했습니다.");
   }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="p-3">
          <Input
            label="비밀번호"
            id="password"
            type="password"
            className="h-10 w-72"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.",
              },
            })}
            errorMessage={errors.password?.message}
          >
            <Button
              btnType="button"
              containerStyles="w-12 h-8 mr-10 flex justify-center items-center !text-primary border-solid border-primary border bg-transparent hover:bg-primary hover:!text-white"
              disabled={!password}
              onClick={handleVerifyPassword}
            >
              인증
            </Button>
          </Input>

          <Input
            label="새 비밀번호"
            id="newPassword"
            type="password"
            className="h-10 w-72"
            {...register("newPassword", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.",
              },
            })}
            errorMessage={errors.newPassword?.message}
            disabled={!isVerified}
          />

          <Input
            label="비밀번호 확인"
            id="confirmPassword"
            type="password"
            className="h-10 w-72"
            {...register("confirmPassword", {
              required: "비밀번호를 입력해주세요",
              validate: (value: string) =>
                value === newPassword || "비밀번호가 일치하지 않습니다.",
            })}
            errorMessage={errors.confirmPassword?.message}
            disabled={!isVerified}
          >
            {isPasswordMatch && (
              <Image
                src={Confirm_icon}
                alt="체크표시"
                className="h-5 w-5 mr-10"
              />
            )}
          </Input>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Button
          disabled={DisabledBtn}
          btnType="submit"
          containerStyles="w-14 h-8 flex justify-center items-center mt-5"
        >
          확인
        </Button>
      </div>
    </form>
  );
}
