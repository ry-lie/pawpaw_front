import axiosInstance from "../axios";

//이 코드부터는 chat에서 사용할것
const socket_url = process.env.SOCKET_URL;

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
