import { log } from "console";
import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://collab-server-cumf.onrender.com"
    : "http://localhost:5001";
const socket = io(URL);

export default socket;
