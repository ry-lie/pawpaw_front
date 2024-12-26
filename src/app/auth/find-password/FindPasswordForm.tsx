"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";

type FindPasswordInput = {
  email: string;
  code : string;
};

export default function FindPasswordForm() {
  const {

    register,
    handleSubmit,
    control,
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

  const email = useWatch({
    control,
    name: "email"
  })

  const code = useWatch({
    control,
    name : "code"
  });

  const checkEmail = !email || Object.keys(errors).length > 0;
  const checkCode = !code || Object.keys(errors).length > 0;

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
          errorMessage={errors.email?.message}>

          <Button btnType="submit" containerStyles="mt-2">
            요청
          </Button>

        </Input>
     
        <Input
          label="인증코드"
          type="password"
          placeholder="인증번호를 입력하세요"
          className="w-80 mt-2"
          {...register("code", {
            required: "인증번호를 입력하세요",
            pattern : {
              value : /^\d{6}$/,
              message : "올바른 숫자를 입력해주세요"
            }
          })}
          errorMessage={errors.code?.message}>
          <Button btnType="submit" containerStyles="mt-2">
            요청
          </Button>
        </Input>
      <Button
        btnType="submit"
        disabled={checkEmail || checkCode}
        containerStyles="h-10 w-80"
      >
        찾기
      </Button>
    </form>
  );
}
