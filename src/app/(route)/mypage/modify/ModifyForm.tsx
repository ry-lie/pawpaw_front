"use client"

import Input from "@/app/components/Input";
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ExitIcon from "@/app/assets/icons/exit.png"
import Image from "next/image";


type NicknameInput = {
    nickname: string;
}

export default function ModifyForm() {

    const [isModal, setIsModal] = useState(false)
    const openModal = () => setIsModal(true);
    const closeModal = () => setIsModal(false);

    const methods = useForm<NicknameInput>({
        mode: "onBlur",
        defaultValues: {
            nickname: "",
        },
    });

    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<NicknameInput> = (data) => {
        // fetch('/nickname',{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json",
        //     },
        //     body:JSON.stringify(data)
        // });
        console.log(data)
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <FormProvider {...methods}>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                    <div className="text-xl">
                        닉네임
                    </div>
                    <Input name="닉네임"
                        type="string"
                        className="w-96"
                        validate={(value: string) =>
                            value ? true : "닉네임을 입력해주세요"}
                    />
                </form>
                <div className="flex justify-start w-full mt-2">
                    <div className="flex font-medium text-xs underline underline-offset-4 text-blue-400 hover:text-blue-200 cursor-pointer"
                        onClick={openModal}>
                        비밀번호 변경
                    </div>
                </div>
                <div className="space-x-10 mt-10">
                    <button type="submit" className="font-bold text-xl bg-stroke_gray w-20 h-10 text-white rounded-md">취소</button>
                    <button type="submit" className="font-bold text-xl bg-primary hover:bg-hover w-20 h-10 text-white rounded-md">확인</button>
                </div>
                {/* 모달창 */}
                {isModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-100">
                        <div className="bg-white p-5 rounded-md shadow-lg w-96 h-96">
                            <Image src={ExitIcon} alt="닫기버튼" className="h-8 w-8 flex justify-end ml-auto cursor-pointer" onClick={closeModal} />
                            <div className="font-bold text-base">
                                현재 비밀번호
                                <Input
                                    name="현재비밀번호"
                                    type="password"
                                    className="h-8 w-80"
                                    validate={(value: string) => value ?
                                        true : "현재 비밀번호를 입력하세요"} />
                            </div>
                            <div className="font-bold text-base mt-2">
                                새 비밀번호
                                <Input
                                    name="새비밀번호"
                                    type="password"
                                    className="h-8 w-80"
                                    validate={(value: string) => value ?
                                        true : "새 비밀번호를 입력하세요"} />
                            </div>
                            <div className="font-bold text-base mt-2">
                                새 비밀번호 확인
                                <Input
                                    name="새비밀번호확인"
                                    type="password"
                                    className="h-8 w-80"
                                    validate={(value: string) => value ?
                                        true : "비밀번호가 일치하지 않습니다."} />
                            </div>

                            <button type="submit" onClick={closeModal} className="flex items-center justify-center ml-auto mb-auto mt-2 font-bold text-base bg-primary hover:bg-hover w-16 h-8 text-white rounded-md">
                                확인
                            </button>
                        </div>

                    </div>
                )}
            </FormProvider>



        </div>
    )
}