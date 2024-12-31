"use client";

import React, { useRef, useState } from "react";
import BasicProfile from "@/assets/icons/profile_icon.png";
import Button from "@/components/Button";
import Image from "next/image";
import Input from "@/components/Input";
import { handleImamgeUploading } from "@/utils/ImageUpload";
import { PutImage } from "@/lib/api/Picture";

export default function ChangeImage() {
  const [img, setImg] = useState<string>(BasicProfile.src);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChangeImage = handleImamgeUploading(async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setImg(fileReader.result as string);
      }
    };

    try {
      await PutImage(file);
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={() => {
          fileInput.current?.click();
        }}
        containerStyles="bg-transparent hover:bg-transparent"
        disabled={isLoading}
      >
        <Image
          src={BasicProfile}
          alt="기본이미지"
          className="h-36 w-36 rounded-full"
        />
      </Button>

      <Input
        name="fileInput"
        type="file"
        id="input-file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleChangeImage}
      />
      <div className="text-base mt-2">hjh268100@gmail.com</div>
    </div>
  );
}
