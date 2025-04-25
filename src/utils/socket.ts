import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const socket: Socket = io(SERVER_URL, {
  transports: ["websocket"],

  withCredentials: true,
});

export default socket;