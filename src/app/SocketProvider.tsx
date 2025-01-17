"use client"
import useSocketStore from "@/stores/socketStore";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

const SocketProvider = () => {
  const { connect, disconnect } = useSocketStore();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      connect();
    } else {
      disconnect();
    }
  }, [isLoggedIn, connect, disconnect]);

  return (
    <>

    </>
  );
}
export default SocketProvider;


