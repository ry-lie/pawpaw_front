import axiosInstance from "../axios";

//현재 존재하는 알람 조회
export const getAlramList = async () => {
  const response = await axiosInstance.get(`/notifications`);
  return response.data.body.data;
};

//알람의 읽음상태 변경
export const updateAlarmStatus = async (id: number) => {
  const response = await axiosInstance.put(`/notifications/${id}`);
  return response.data;
};
