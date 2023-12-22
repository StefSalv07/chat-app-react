const express = require("express");
const app = express();
const dotenv = require("dotenv");
const data = require("./data");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

app.get("/api/chats", (req, res) => {
  res.send(data);
});

app.get("/api/chats/:id", (req, res) => {
  const chatId = req.params.id;
  const chat = data.find((x) => x._id === chatId);
  if (chat) {
    res.send(chat);
  } else {
    res.status(404).send({ message: "Chat Not Found." });
  }
});

const userRoutes = require("./routes/userRoutes");
const { Socket } = require("socket.io");
console.log("Api called");
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

// WebSocket = require("ws");
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");

dotenv.config();
connectDB();

const server = app.listen(PORT, (err, success) => {
  if (err) console.log(err);
  else {
    console.log("Server is running on port 5000");
  }
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
});

 Socket.on("join chat", (room) => {
   socket.join(room);
   console.log("User Joined Room: " + room);
 });
 Socket.on("typing", (room) => socket.in(room).emit("typing"));
 Socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));