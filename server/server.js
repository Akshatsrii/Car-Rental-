import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
  
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Database
connectDB();

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);
app.use("/uploads", express.static("uploads"));



// ✅ Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
