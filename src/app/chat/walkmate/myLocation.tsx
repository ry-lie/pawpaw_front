import { updateMyLocation } from "@/lib/api/userPlace";
import { useEffect } from "react";

export default function PeriodMyLocation() {
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMyLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
