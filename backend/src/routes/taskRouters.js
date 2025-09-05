// Route là nơi định nghĩa các api endpoints.
import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksControllers.js";

const router = express.Router();

// Tạo 1 endpoint, khi người dùng truy cập vào đường dẫn /api/tasks thì server sẽ trả về chuỗi "Bạn có 1 việc cần làm"
router.get("/", getAllTasks);

// Tạo 1 nhiệm vụ mới
router.post("/", createTask);

// Update` 1 nhiệm vụ
router.put("/:id", updateTask);

// Xoá 1 nhiệm vụ
router.delete("/:id", deleteTask);

export default router;
