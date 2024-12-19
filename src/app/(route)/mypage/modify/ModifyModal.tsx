"use client"

import Input from "@/app/components/Input"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

type PasswordInput = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function ModifyModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const passwordMethods = useForm<PasswordInput>({
        mode: "onBlur",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onPasswordSubmit: SubmitHandler<PasswordInput> = async (data) => {
        console.log(data)
        // const res = await fetch("/api/password", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data),
        // });
        // if (res.ok) {
        //     alert("비밀번호가 성공적으로 변경되었습니다!");
        //     closeModal();
        // } else {
        //     alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        // }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-100">
            <div className="bg-white p-5 rounded-md shadow-lg w-96 h-96">
                <img src="/icons/exit.png" alt="닫기버튼" className="h-8 w-8 flex justify-end ml-auto cursor-pointer" onClick={closeModal} />

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

                <button type="submit" className="flex items-center justify-center ml-auto mb-auto mt-2 font-bold text-base bg-primary hover:bg-hover w-16 h-8 text-white rounded-md">
                    확인
                </button>
            </div>
        </div>
    )
}