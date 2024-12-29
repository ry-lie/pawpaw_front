//상태저장소 정의
import { create } from "zustand";

// 알람의 상태정의 (메세지를 보내기 전에 이전에 수락이 
// 되어있는 사람(accept-그냥 그 사람의 채팅내용이 나타남)인지 아니면 
// 수락이 되지 않은 사람(pending-추후 수락과 거절에 해당하는 알고리즘 진행)인지 판단)

export interface AlarmProps{
    sender : string;
    message : string;
    status : "accepted" | "pending"
}

//알람관련
interface AlarmStateProps{
    alarms : AlarmProps[];
    setAlarms : (alarms : AlarmProps[])=>void;
    addAlarm : (alarm:AlarmProps) =>void;
    updateAlarmStatus : (sender : string, status : "accepted" | "pending") =>void;
    removeAlarm : (sender : string) =>void;
}
//zustand의 create를 이용해 상태저장소 생성, set을 이용해 zustand 상태 업데이트
export const useAlarmStore = create<AlarmStateProps>((set)=>({
    alarms:[],
    setAlarms:(alarms)=>set({alarms}),
    addAlarm : (alarm)=>
        set((state)=>({
        alarms:[...state.alarms, alarm],
    })),
    updateAlarmStatus : (sender, status)=>
        set((state)=>({
            alarms : state.alarms.map((alarm)=>
            alarm.sender ===sender?{...alarm, status} : alarm
        ),
        })),
        removeAlarm:(sender)=>
            set((state)=>({
                alarms:state.alarms.filter((alarm)=>alarm.sender!==sender),
            })),
}));