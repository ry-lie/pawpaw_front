"use client"

import Input from "@/app/components/Input"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

type FindPasswordInput = {
    email: string;
}

export default function FindPasswordForm() {
    const methods = useForm<FindPasswordInput>({
        mode: "onBlur",
        defaultValues: {
            email: "",
        },
    });

    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<FindPasswordInput> = (data) => {
        // fetch('/findpassword',{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json",
        //     },
        //     body:JSON.stringify(data)
        // });
        console.log(data)
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="font-bold mt-5">
                    이메일
                </div>
                <Input name="이메일"
                    type="email"
                    placeholder="abc@abc.com"
                    className="w-96 mt-1"
                    validate={(value: string) =>
                        value ? value.includes("@") ?
                            true : "유효한 이메일 주소를 입력하세요" : "이메일은 필수 입력 사항입니다."}
                />
                <button type="submit"
                    className="w-full h-14 bg-primary text-white rounded-md hover:bg-hover font-bold text-xl mt-3">
                    찾기
                </button>
            </form>
        </FormProvider>
    )
}
