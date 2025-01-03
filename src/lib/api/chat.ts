import { io } from "socket.io-client";

interface Room {
  roomId: string;
  userList: { id: string }[];
}

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

const socket = io(socket_url);

//방생성하기
export const makeRoom = (roomName: string) => {
  return new Promise((resolve, reject) => {
    socket.emit("create-room", roomName);
    socket.on("receive-message", (data) => {
      console.log("방이 생성 되었습니다.", data);
      resolve(data);
    });

    socket.on("error", (error) => {
      console.error("소켓 오류 발생", error);
      reject(error);
    });
  });
};

//방 목록 가져오기
export const roomList = async (): Promise<Room[]> => {
  return new Promise((resolve, reject) => {
    socket.emit("get-room-list");
    socket.on("receive-message", (data: Room[]) => {
      console.log("방 목록을 가져왔습니다.", data);
      resolve(data);
    });

    socket.on("error", (error) => {
      console.error("소켓 오류 발생", error);
      reject(error);
    });
  });
};
