"use client";

import React, { useEffect, useState } from "react";
import BasicProfile from "@/assets/icons/profile_icon.png";
import Image from "next/image";
import Input from "@/components/Input";
import { useUserStore } from "@/stores/userStore";
import { getUser } from "@/lib/api/user";


export default function ChangeImage() {
  const [profileImageUrl, setProfileImageUrl] = useState<string|null>(null);
  const [userEmail, setUserEmail] = useState<string|null>(null);
  const currentUserId = useUserStore((state)=>state.id);

  //유저정보 가져오기
  
  const handleProfileImageChange =  (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if (file){
      if(profileImageUrl){
        URL.revokeObjectURL(profileImageUrl);
      }
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
    const fetchUserEmail = async()=>{
      if(currentUserId){
        try{
          const email = await getUser(currentUserId);
          setUserEmail(email);
        }catch(e){
          console.error("사용자의 아이디를 가져오지 못했습니다.",e)
        }
      }
    };
    fetchUserEmail();

    return() => {
      if(profileImageUrl){
        URL.revokeObjectURL(profileImageUrl)
      }
    };
  },[currentUserId ,profileImageUrl]);


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
      <div className="text-base mt-2">{userEmail}</div>
    </div>
  );
}
