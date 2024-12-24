import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Confirm_icon from "@/assets/icons/confirm_icon.png";

export default function FindPasswordModal() {
  type FindPasswordInput = {
    password: string;
    newPassword: string;
    confirmPassword: string;
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FindPasswordInput> = (data) => {
    const { password, newPassword, confirmPassword } = data;
    const payload = { password, newPassword, confirmPassword };
    // fetch('/nickname',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json",
    //     },
    //     body:JSON.stringify(data)
    // });
    console.log("data", payload);
  };

  const password = watch("password");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const isPasswordMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const DisabledBtn = !password || !newPassword || !confirmPassword || Object.keys(errors).length > 0;

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
              btnType="submit"
              containerStyles="w-12 h-8 mr-10 flex justify-center items-center text-primary border-solid border-primary border bg-transparent hover:text-white"
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
