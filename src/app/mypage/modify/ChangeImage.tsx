"use client"

import React, { useRef, useState } from "react"
import BasicProfile from "@/assets/icons/profile_icon.png"

export default function ChangeImage() {
    const [img, setImg] = useState<string>(BasicProfile.src);
    const fileInput = useRef<HTMLInputElement | null>(null)


    //이메일 가져오기
    // const [email, setEmail] = useState("");

    // useEffect(()=>{
    //     const fetchEmail = async()=>{
    //         const res = await fetch("/api/givemeEmail");
    //         if(res.ok){
    //             const data = await res.json();
    //             setEmail(data.email);

    //         }else{
    //             console.error("이메일 못찾아요!")
    //         }
    //     };
    //     fetchEmail();
    // },[]);

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setImg(fileReader.result as string);
            }
        }

        const formData = new FormData()
        formData.append('image', file)
        try {
            const res = await fetch('/picture', {
                method: "PUT",
                body: formData,
            });

            const data = await res.json()
        } catch (e) {
            console.error(e)
        };
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <button onClick={() => { fileInput.current?.click() }}>
                <img src={img} alt="기본이미지" className="h-36 w-36 rounded-full" />
            </button>
            <input
                type="file"
                id="input-file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleChangeImage} />
            <div className="text-base mt-2">
                hjh268100@gmail.com
            </div>
        </div>
    )
}


