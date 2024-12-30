"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { makeRoom } from "@/lib/api";
import { useUserStore } from "@/stores/userStore";
import { useGeolocation } from "@/utils/useGeolocation";
import axios from "axios";
import Link from "next/link";
import { join } from "path";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;
interface User {
  id: string;
  nickname: string;
  radius: number;
}

export default function PersonRadius() {
  const currentNickname = useUserStore((state) => state.nickname);
  //    const { location } = useGeolocation();
  const [findUsers, setFindUsers] = useState<User[]>([]);
  const [radius, setRadius] = useState(250);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 소켓 연결
    const socketConnection = io(socket_url);
    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("소켓 연결 성공");
    });

    //메세지 받기
    socketConnection.on("receive-message", (data) => {
      console.log("create-room", data);
    });

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const allUser: User[] = [
    { id: "1", nickname: "빠알간두볼", radius: 180 },
    { id: "2", nickname: "김먹방못해요", radius: 570 },
    { id: "3", nickname: "노래진두볼", radius: 230 },
    { id: "4", nickname: "붉어진두볼", radius: 600 },
  ];

  //채팅 요청
  const handleRequestChat = (user: User) => {
    if (socket) {
      const roomName = `${currentNickname}-R${user.nickname}`;
      socket.emit("create-room", roomName);
      console.log(`${user.nickname}에게 채팅요청을 보냈습니다.`);
    } else {
      console.error("소켓이 연결되지 않았습니다.");
    }
  };
  //유저 찾기
  const findUserByRadius = () => {
    const filterUser = allUser.filter((user) => user.radius <= radius);
    setFindUsers(filterUser);
  };
  //반경선택
  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(Number(e.target.value));
  };

  //유저리스트에서 선택후 방 참가
  // const handleJoinRoom = (user: User) => {
  //     if (socket) {
  //         const roomName = `${currentNickname}-R${user.nickname}`;
  //         socket.emit("join", roomName, currentNickname)
  //     }
  // }

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

  return (
    <div className="mt-12">
      {/* 반경 라벨 컨테이너 */}
      <div className="px-4 flex items-center text-xs">
        <label>반경</label>
        <select
          className="border border-medium_gray rounded-md p-1 ml-1"
          onChange={handleRadiusChange}
          value={radius}
        >
          <option value="250">250m</option>
          <option value="500">500m</option>
          <option value="1000">1000m</option>
        </select>
        <Button
          btnType="submit"
          containerStyles="text-xs h-6 w-9 ml-1"
          onClick={findUserByRadius}
        >
          찾기
        </Button>
      </div>

      {/* 내용 컨테이너 */}
      <div className="mt-3 px-4">
        <div className="font-bold mb-2 ml-1">
          {currentNickname} 님의 반경 {radius}m
        </div>
        <ul className="space-y-2">
          {findUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              {/* 유저 닉네임 */}
              <div className="xs:text-base text-sm w-full h-10 flex items-center bg-white border border-stroke_gray rounded-md px-2">
                {user.nickname}
              </div>
              {/* 연락하기 버튼 */}
              <Button
                containerStyles="!text-sm !xs:text-base w-24 h-10 !text-base font-semibold flex items-center justify-center ml-4"
                onClick={() => handleRequestChat(user)}
              >
                연락하기
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
