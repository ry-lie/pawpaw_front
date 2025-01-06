import { updateMyLocation } from "@/lib/api/userPlace";
import { useEffect } from "react";

export default function periodMyLocation() {
  useEffect(() => {
    const interval = setInterval(() => {
      updateMyLocation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return null;
}
