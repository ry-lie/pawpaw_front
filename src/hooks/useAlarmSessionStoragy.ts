import { useAlarmStore } from "@/stores/alarmStore";
import { useEffect } from "react";

export default function useAlarmSessionStoragy() {
    const alarms = useAlarmStore((state) => state.alarms);
    const setAlarms = useAlarmStore((state) => state.setAlarms);

//sessionStoragy에서 상태 불러오기
useEffect(()=>{
    const savedAlrams = sessionStorage.getItem("alarms");
    if(savedAlrams){
        setAlarms(JSON.parse(savedAlrams));
    }


//상태 변경시 sessionStoragy에 저장

    sessionStorage.setItem("alarms", JSON.stringify(alarms));
},[alarms, setAlarms]);
}

//해당 컴포넌트는 클라이언트에서 로그인되었을때
// (기기가 변경되거나 했을때는 기존 알람이 저장되지 않음)사용된다.