import router from "./routes/taskRouters.js";
import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express(); // Tạo 1 application object, biến này chính là server

// middleware
app.use(express.json()); // Giúp server có thể hiểu được dữ liệu dưới dạng json gửi lên từ client

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Sever đang chạy trên cổng ${PORT}`);
  });
}); // Liên kết cơ sở dữ liệu
