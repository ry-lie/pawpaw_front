"use client"
import Button from "@/components/Button";
import { useGeolocation } from "@/utils/useGeolocation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"

const socket = io("http://localhost:5000");

interface User {

    id: string;
    nickname: string;
    radius: number;
}

export default function PersonRadius() {
    //    const { location } = useGeolocation();
    const [findUsers, setFindUsers] = useState<User[]>([]);
    //    const [UsersId, setUsersId] = useState(new Set());
    const [radius, setRadius] = useState(250);

    const allUser: User[] = [
        { id: "1", nickname: "빠알간두볼", radius: 180 },
        { id: "2", nickname: "김먹방못해요", radius: 570 },
        { id: "3", nickname: "노래진두볼", radius: 230 },
        { id: "4", nickname: "붉어진두볼", radius: 600 },
    ]

    const findUserByRadius = () => {
        const filterUser = allUser.filter(user => user.radius <= radius);
        setFindUsers(filterUser);
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRadius(Number(e.target.value));
    };

    //유저 찾기
    // const findUserByRadius = () => {
    //     if (location) {
    //         socket.emit("findUserByRadius", {
    //             latitude: location.latitude,
    //             longitude: location.longitude,
    //             radius,
    //         });

    //     } else {
    //         console.error("위치정보를 가져올수 없습니다.");
    //     }
    // };
    // //반경 내 유저목록 수신
    // useEffect(() => {
    //     socket.on("findUserByRadius", (users: User[]) => {
    //         setFindUsers(users);
    //     });

    //     return () => {
    //         socket.off("findUserByRadius");
    //     };
    // }, []);

    // //반경 선택
    // const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setRadius(Number(e.target.value));
    // }

    return (
        <div>
            <div className="mt-12 flex ml-5 items-center text-xs">
                <label>
                    반경
                </label>
                <select className="border border-medium_gray rounded-md p-1 ml-1"
                    onChange={handleRadiusChange}
                    value={radius}
                >
                    <option value="250"> 250m</option>
                    <option value="500"> 500m</option>
                    <option value="1000"> 1000m</option>
                </select>

                <Button
                    btnType="submit"
                    containerStyles="text-xs h-7 w-8 ml-1"
                    onClick={findUserByRadius}
                >찾기</Button>
            </div>
            <div>
                <div className="font-bold p-2">
                    {findUsers[0]?.nickname} 님의 반경{radius}m
                </div>
                <ul className="">
                    {findUsers.map((user) => (
                        <li key={user.id} className="flex w-full">
                            <div className="w-[80%] border-2 h-10 flex items-center p-3 border-medium_gray m-2 rounded-md">
                                {user.nickname}
                            </div>
                            <div className="flex  items-center">
                                <Button containerStyles=" w-20 h-10 !text-base flex items-center justify-center">
                                    <Link href={`/chat/${user.id}`}>
                                        연락하기
                                    </Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


