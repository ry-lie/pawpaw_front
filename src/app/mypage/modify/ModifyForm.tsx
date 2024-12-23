"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ExitIcon from "@/assets/icons/exit.png"
import Image from "next/image";


type NicknameInput = {
    nickname: string;
    password: string;
    confirmPassword: string;
}

export default function ModifyForm() {

    const [isModal, setIsModal] = useState(false)
    const openModal = () => setIsModal(true);
    const closeModal = () => setIsModal(false);


    const methods = useForm<NicknameInput>({
        mode: "onBlur",
        defaultValues: {
            nickname: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { handleSubmit, watch, formState: { isValid } } = methods;
    const onSubmit: SubmitHandler<NicknameInput> = (data) => {
        const { password } = data;
        // fetch('/nickname',{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json",
        //     },
        //     body:JSON.stringify(data)
        // });
        console.log(data)
    }
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const isPassword = password && confirmPassword && password === confirmPassword;


    return (
        <div className="flex flex-col justify-center items-center">
            <FormProvider {...methods}>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                    <Input name="닉네임"
                        label="닉네임"
                        type="string"
                        className="w-80 h-10"
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
                    <Button
                        title="취소"
                        btnType="button"
                        containerStyles="bg-stroke_gray w-20 h-10" />
                    <Button
                        title="확인"
                        btnType="submit"
                        containerStyles="w-20 h-10" />

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

                                <Input
                                    name="newPassword"
                                    label="새비밀번호"
                                    type="password"
                                    className="h-10 w-72"
                                    validate={(value: string) =>
                                        value
                                            ? /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(value)
                                                ? true :
                                                "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다."
                                            : "비밀번호는 필수 입력 항목입니다."} />
                                <Input
                                    name="confirmPassword"
                                    label="새 비밀번호 확인"
                                    type="password"
                                    className="h-10 w-72"
                                    validate={(value: string) =>
                                        value === password || '비밀번호가 일치하지 않습니다.'} />
                                {isPassword && (
                                    <img src="/icons/confirm_icon.png"
                                        alt="체크표시"
                                        className="h-5 w-5" />
                                )}
                                <Button
                                    isDisabled={!isValid}
                                    title="확인"
                                    btnType="submit"
                                    containerStyles="w-14 h-8 flex justify-center items-center ml-auto mt-5"
                                    textStyles="text-base justify-center"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </FormProvider>
        </div>
    )
}