import axiosInstance from "../axios";

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

//이전 로그 가져오기
export const readChatLog = async (roomId: string) => {
  const response = await axiosInstance.get(`${socket_url}`);
  return response.data;
};
//방목록 가져오기
export const roomList = async () => {
  const response = await axiosInstance.get(`${socket_url}`);
  return response.data;
};

//방생성하기
export const makeRoom = async()=>{
  const response = await axiosInstance.post(`${socket_url}`, {
    action : "create-room",
    roomName : "room1"
  });
  return response.data;
}