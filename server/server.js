import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Middleware
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Attach io instance to app
app.set("io", io);

// ✅ Database
connectDB();

// ✅ Socket.io Connection Handlers
io.on("connection", (socket) => {
  console.log("⚡ Real-time Socket client connected:", socket.id);

  socket.on("joinBooking", (bookingId) => {
    socket.join(bookingId);
    console.log(`Socket ${socket.id} joined room ${bookingId}`);
  });

  socket.on("updateLocation", ({ bookingId, lat, lng }) => {
    io.to(bookingId).emit("locationUpdated", { lat, lng });
    console.log(`Real-time location stream for ${bookingId}:`, lat, lng);
  });

  socket.on("disconnect", () => {
    console.log("⚡ Real-time Socket client disconnected");
  });
});

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);
app.use("/uploads", express.static("uploads"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Server Boot
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
