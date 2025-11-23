import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LogEntry from "./pages/LogEntry";
import Login from "./pages/Login";
import MyLogs from "./pages/MyLogs";
import Signup from "./pages/Signup";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastProvider } from "./providers/ToastProvider";

// Main App component with routing
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/log-entry"
              element={
                <ProtectedRoute>
                  <LogEntry />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-logs"
              element={
                <ProtectedRoute>
                  <MyLogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/log-entry/:logId?"
              element={
                <ProtectedRoute>
                  <LogEntry />
                </ProtectedRoute>
              }
            />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
