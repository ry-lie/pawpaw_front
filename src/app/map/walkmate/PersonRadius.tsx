"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import { makeRoom } from "@/lib/api";
import axiosInstance from "@/lib/axios";
import { useGeolocation } from "@/utils/useGeolocation";
import axios from "axios";
import Link from "next/link";
import { join } from "path";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"

//const socket = io("http://localhost:5000");
const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;
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
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentNickname, setCurrentNickname] = useState("빠알간두볼");

    useEffect(() => {
        // 소켓 연결
        const socketConnection = io(socket_url);

        // 소켓 상태 업데이트
        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("소켓 연결 성공");
        });
        socketConnection.on("receive-message", (data) => {
            console.log("create-room", data);

        })
        //on은 내가 받겟다. emit은 서버에서 나한테 보내겠다.

        // 컴포넌트 언마운트 시 소켓 연결 종료
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const createdRoom = (receiver: string) => {
        if (socket) {
            const roomName = `${currentNickname}-R${receiver}`
            socket.emit('create-room', roomName);
            //방에 들어감
            socket.emit("join", roomName, currentNickname);
        } else {
            console.error("소켓이 연결되지 않았습니다.");
        }

    };

    const allUser: User[] = [
        { id: "1", nickname: "빠알간두볼", radius: 180 },
        { id: "2", nickname: "김먹방못해요", radius: 570 },
        { id: "3", nickname: "노래진두볼", radius: 230 },
        { id: "4", nickname: "붉어진두볼", radius: 600 },
    ]

    const findUserByRadius = () => {
        const filterUser = allUser.filter((user) => user.radius <= radius);
        setFindUsers(filterUser);
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRadius(Number(e.target.value));
    };

    //임시-닉네임 변경하는것
    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentNickname(e.target.value);
    }
    //유저리스트에서 선택후 방 참가
    const handleJoinRoom = (user:User)=>{
        if(socket){
            const roomName = `${currentNickname}-R${user.nickname}`;
            socket.emit("join", roomName, currentNickname)
        }
    }

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
                >
                    찾기
                </Button>
            </div>
            <div className="flex items-center">
                <Input
                name="닉네임"
                type="text"
                value={currentNickname}
                onChange={handleChangeNickname}
                />


            </div>
            <div>
                <div className="font-bold p-2">
                    {currentNickname} 님의 반경{radius}m
                </div>
                <ul className="">
                    {findUsers.map((user) => (
                        <li key={user.id} className="flex w-full">
                            <div className="w-[80%] border-2 h-10 flex items-center p-3 border-medium_gray m-2 rounded-md">
                                {user.nickname}
                            </div>
                            <div className="flex  items-center">
                                <Button containerStyles=" w-20 h-10 !text-base flex items-center justify-center"
                                    onClick={() => handleJoinRoom(user)}>
                                    <Link
                                        href={{ pathname: `/chat/${user.id}` }} // sender, receiver 정보 URL에 추가
                                    >
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


