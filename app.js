import express from "express";
import path from "path";
import { Server } from "socket.io"
import { format } from "date-fns";

const app = express();
const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => console.log(`Chat app is running on port ${PORT}`));

const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, "public")));


let connectedSockets = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
  // console.log("Socket connected", socket.id);
  connectedSockets.add(socket.id);
  // console.log(connectedSockets.size);

  io.emit("client-nums", connectedSockets.size);

  socket.on("disconnect", () => {
    connectedSockets.delete(socket.id);
    io.emit("client-nums", connectedSockets.size);
  });

  socket.on("clientMessage", (data) => {
    socket.broadcast.emit("serverMessage", data);
  });
}
