import { io } from "socket.io-client";
import axiosInstance from "../axios";

interface Room {
  roomId: string;
  userList: { id: string }[];
}

//방 목록 가져오기
export const fetchRoomList = async () => {
  const response = await axiosInstance.get(`/room-users`);
  console.log(response);
  return response.data.body.data.roomList;
};
