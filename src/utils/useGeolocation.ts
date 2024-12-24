import { useEffect, useState } from "react"
interface Latlng {
    latitude: number; // 위도
    longitude: number; //경도
}
export const useGeolocation = () => {
    const [location, setLocation] = useState<Latlng | null>(null);
    //위치정보 요청
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler); //성공시 successHandler, 실패시 errorHandler
    }, []);

    const successHandler = (res: GeolocationPosition) => {
        const { latitude, longitude } = res.coords;
        setLocation({ latitude, longitude });
    };

    const errorHandler = (error: GeolocationPositionError) => {
        console.error(error);
    };

    return { location };
}