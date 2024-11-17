import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath === "/signIn") {
        alert("User hoặc password không đúng.");
      } else {
        alert("Bạn chưa đăng nhập.");
        window.location.href = "/signIn";
      }
    } else if (error.response.status === 403) {
      alert("Bạn không có quyền truy cập tài nguyên này.");
    } else if (error.response.status >= 500) {
      alert("Lỗi máy chủ. Vui lòng thử lại sau.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
