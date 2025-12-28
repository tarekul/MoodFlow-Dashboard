import React from "react";
import { authAPI } from "../utils/api";
import LogButton from "./LogButton";

const Header = ({
  isFullyLogged,
  isPartiallyLogged,
  todayLog,
  navigate,
  displayData,
  streak,
  user,
  logout,
}) => {
  const userInitial = user?.first_name
    ? `${user.first_name[0].toUpperCase()}${
        user?.last_name ? user.last_name[0].toUpperCase() : ""
      }`
    : "U";

  const handleDeleteAccount = async () => {
    const isSure = window.confirm(
      "⚠️ DANGER ZONE: Are you sure you want to delete your account?\n\nAll your logs, streaks, and data will be permanently lost. This cannot be undone."
    );

    if (isSure) {
      const doubleCheck = window.confirm(
        "Final Confirmation: Delete your account permanently?"
      );

      if (doubleCheck) {
        try {
          await authAPI.deleteUser();
          logout();
        } catch (error) {
          console.error("Failed to delete account:", error);
          alert("Error deleting account. Please try again.");
        }
      }
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-md shadow-indigo-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M22 12h-4l-3 9L9 3l-3 9H2"
                ></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Correlate
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Discover your unique productivity drivers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-1.5 border border-gray-100">
              <div className="text-center px-2 border-r border-gray-200">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Logs
                </span>
                <span className="ml-2 text-sm font-bold text-indigo-700">
                  {displayData.days_logged}
                </span>
              </div>
              <div className="flex items-center gap-1 pl-1">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-bold text-gray-800">
                  {streak}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-logs")}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              >
                My Logs
              </button>

              <LogButton
                isFullyLogged={isFullyLogged}
                isPartiallyLogged={isPartiallyLogged}
                todayLog={todayLog}
                navigate={navigate}
              />
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200">
                  {userInitial}
                </div>
                <span className="text-xs font-medium text-gray-600 max-w-[80px] truncate">
                  {user?.first_name}
                </span>
              </div>

              <button
                onClick={handleDeleteAccount}
                className="text-gray-300 hover:text-red-600 transition-colors p-1"
                title="Delete Account"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                  />
                </svg>
              </button>

              <button
                onClick={logout}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                title="Logout"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-md shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Correlate
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {userInitial}
                </div>
                <span className="text-xs font-medium text-gray-600 max-w-[80px] truncate">
                  {user?.first_name}
                </span>
              </div>

              <button
                onClick={handleDeleteAccount}
                className="text-gray-300 hover:text-red-600 p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                  />
                </svg>
              </button>

              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-grow">
              <LogButton
                isFullyLogged={isFullyLogged}
                isPartiallyLogged={isPartiallyLogged}
                todayLog={todayLog}
                navigate={navigate}
              />
            </div>

            <button
              onClick={() => navigate("/my-logs")}
              className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-2xl font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-transform"
            >
              Logs
            </button>

            <div className="flex flex-col items-center justify-center bg-orange-50 text-orange-600 px-3 py-1 rounded-2xl border border-orange-100 min-w-[3.5rem]">
              <span className="text-sm font-bold leading-none">{streak}🔥</span>
              <span className="text-[10px] font-medium leading-none mt-1">
                streak
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
