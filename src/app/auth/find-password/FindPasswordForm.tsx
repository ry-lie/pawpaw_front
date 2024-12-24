"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FindPasswordInput = {
  email: string;
};

export default function FindPasswordForm() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordInput>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FindPasswordInput> = (data) => {
    // fetch('/findpassword',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json",
    //     },
    //     body:JSON.stringify(data)
    // });
    console.log(data);
  };
  const email = watch("email");

  const checkEmail = !email;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
      <Input
        label="이메일"
        type="email"
        placeholder="abc@abc.com"
        className="w-80 mt-2"
        {...register("email", {
          required: "이메일은 필수 입력 항목입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "유효한 이메일 주소를 입력하세요",
          },
        })}
        errorMessage={errors.email?.message}
      />
      <Button
        btnType="submit"
        isDisabled={checkEmail}
        containerStyles="h-10 w-80"
      >
        찾기
      </Button>
    </form>
  );
}
