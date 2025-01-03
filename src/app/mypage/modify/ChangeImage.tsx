"use client";

import React, { useEffect, useRef, useState } from "react";
import BasicProfile from "@/assets/icons/profile_icon.png";
import Image from "next/image";
import Input from "@/components/Input";
import { useUserStore } from "@/stores/userStore";


export default function ChangeImage() {
  const [profileImageFile, setProfileImageFile] = useState<File|null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string|null>(null);

  //유저정보 가져오기
  const currentUser = useUserStore((state)=>state.id);
  console.log("로그인된 사용자 이메일 : ",  currentUser)
  
  const handleProfileImageChange =  (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if (file){
      setProfileImageFile(file);

      if(profileImageUrl){
        URL.revokeObjectURL(profileImageUrl);
      }
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
    return() => {
      if(profileImageUrl){
        URL.revokeObjectURL(profileImageUrl)
      }
    };
  },[profileImageUrl]);


  return (
    <div className="flex flex-col justify-center items-center">
      <label htmlFor="profile-image-input" className="cursor-pointer">
        <Image src={profileImageUrl || BasicProfile}
        alt="프로필 이미지"
        width={96} height={96}
        className="rounded-full w-36 h-36"
        />

      </label>
      <Input
        name="fileInput"
        type="file"
        id="profile-image-input"
        accept="image/png, image/jpeg"
        //style={{ display: "none" }}
className="hidden"
        onChange={handleProfileImageChange}
      /> 
      <div className="text-base mt-2">{currentUser}</div>
    </div>
  );
}
