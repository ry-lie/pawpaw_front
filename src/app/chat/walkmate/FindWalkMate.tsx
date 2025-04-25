"use client";

import Button from "@/components/Button";
import { useUserStore } from "@/stores/userStore";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useEffect, useState } from "react";
import { anotherLocation } from "@/lib/api/userPlace";
import { useRouter } from "next/navigation";

import useSocketStore from "@/stores/socketStore";
import { PATHS } from "@/constants/path";

interface User {
  id: number;
  nickname: string;
  radius: number;
}

export default function FindWalkMate() {
  const router = useRouter();
  const currentNickname = useUserStore((state) => state.nickname);
  const { location } = useGeolocation();
  const [findUsers, setFindUsers] = useState<User[]>([]);
  const [radius, setRadius] = useState(250);
  const [isLoading, setIsLoading] = useState(false);
  const { socket, connect } = useSocketStore();
  const [recipientId, setRecipientId] = useState(0);

  useEffect(() => {

    // 서버로부터 방 생성 응답 처리
    socket.on("create-room-response", (response) => {
      const { roomName } = response.data;

      if (recipientId) {
        // 채팅룸으로 이동
        router.push(PATHS.CHATTING_DETAIL(roomName, recipientId));
        setRecipientId(0);
      }

    });

    return () => {
      if (socket) {
        socket.off("create-room-response");
      }
    };
  }, [socket, recipientId, connect]);
  // 사용자 검색
  const handleLocation = async () => {
    if (!location) {
      console.error("위치정보를 가져올 수 없습니다.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await anotherLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: radius,
      });

      const users = response.body?.data || [];
      if (Array.isArray(users)) {
        setFindUsers(users);
      } else {
        console.error("API 응답이 배열이 아닙니다:", response);
        setFindUsers([]);
      }

    } catch (e) {
      console.error("사용자 검색 오류", e);
      setFindUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅 요청
  const handleRequestChat = async (user: User) => {
    socket.emit("create-room", { recipientId: user.id });
    setRecipientId(user.id);
  };

  // 반경 선택
  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(Number(e.target.value));
  };

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
          onClick={handleLocation}
          disabled={isLoading}
        >
          찾기
        </Button>
      </div>

      {/* 내용 컨테이너 */}
      <div className="mt-3 px-4">
        <div className="font-bold mb-2 ml-1">
          {currentNickname} 님의 반경 {radius}m
        </div>
        {findUsers.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">현재 이용 가능한 사용자가 없습니다.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {findUsers.filter((user) => user.nickname !== currentNickname).map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <div className="xs:text-base text-sm w-full h-10 flex items-center bg-white border border-stroke_gray rounded-md px-2">
                  {user.nickname}
                </div>

                <Button
                  containerStyles="!text-sm !xs:text-base w-24 h-10 !text-base font-semibold flex items-center justify-center ml-4"
                  onClick={() => handleRequestChat(user)}
                  disabled={isLoading}
                >
                  연락하기
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
