import mongoose from "mongoose";

// Định nghĩa cấu trúc dữ liệu cho một task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Nếu có khoảng trắng ở đầu hoặc cuối thì xoá đi
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Tự động thêm 2 trường createdAt và updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
