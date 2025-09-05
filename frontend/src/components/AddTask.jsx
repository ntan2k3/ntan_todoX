import axiosInstance from "@/lib/axiosInstance";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const AddTask = ({ handleNewTaskAdded = () => {} }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await axiosInstance.post("/tasks", {
        title: newTaskTitle,
      });
      toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm!`);
      handleNewTaskAdded(); // gọi callback từ cha
    } catch (error) {
      console.error("Lỗi khi thêm nhiệm vụ: ", error);
      toast.error("Lỗi khi thêm nhiệm vụ.");
    } finally {
      setNewTaskTitle("");
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì"
          className="h-12 text-base bg-slate-50 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={handleAddTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" /> Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
