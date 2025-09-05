import axiosInstance from "@/lib/axiosInstance";
import { visibleTaskLimit } from "@/lib/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddTask from "../components/AddTask";
import DateTimeFilter from "../components/DateTimeFilter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StatsAndFilter from "../components/StatsAndFilter";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get(`/tasks/?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
      console.log(res.data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy dữ liệu:", error);
      toast.error("Lỗi xảy ra khi lấy dữ liệu");
    }
  };

  // Lưu danh sách nhiệm vụ theo trạng thái
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0) {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  }

  const totalPage = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPage) setPage((pre) => pre + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((pre) => pre - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo Nhiệm Vụ */}
          <AddTask handleNewTaskAdded={fetchTasks} />

          {/* Thống Kê và Bộ lọc */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />

          {/* Danh Sách Nhiệm Vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={fetchTasks}
          />

          {/* Phân Trang và Lọc Theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPage={totalPage}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân Trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
