import axios from "axios";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log("Current API URL:", API_BASE_URL); // Check your browser console to verify!

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH ENDPOINTS
// ============================================

export const authAPI = {
  // Sign up
  signup: async (email, password) => {
    const response = await api.post("/users", { email, password });
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post("/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/me");
    return response.data;
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post("/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return response.data;
  },
};

// ============================================
// LOGS ENDPOINTS
// ============================================

export const logsAPI = {
  // Get my logs
  getMyLogs: async (startDate = null, endDate = null) => {
    let url = "/my-logs";
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await api.get(url);
    return response.data;
  },

  // Create log
  createLog: async (logData) => {
    const response = await api.post("/logs", logData);
    return response.data;
  },

  // Update log
  updateLog: async (logId, logData) => {
    const response = await api.put(`/logs/${logId}`, logData);
    return response.data;
  },

  // Delete log
  deleteLog: async (logId) => {
    const response = await api.delete(`/logs/${logId}`);
    return response.data;
  },
};

// ============================================
// ANALYSIS ENDPOINT
// ============================================

export const analysisAPI = {
  // Get analysis
  getAnalysis: async () => {
    const response = await api.get("/analysis");
    return response.data;
  },
};

// ============================================
// USERS ENDPOINTS
// ============================================

export const usersAPI = {
  // Get user summary
  getUserSummary: async (userId) => {
    const response = await api.get(`/users/${userId}/summary`);
    return response.data;
  },
};

export default api;
