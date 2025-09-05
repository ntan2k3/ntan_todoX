import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Liên kết cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi liên kết cơ sở dữ liệu", error);
    process.exit(1); // Dừng ứng dụng nếu không kết nối được cơ sở dữ liệu, với 0 là thành công.
  }
};
