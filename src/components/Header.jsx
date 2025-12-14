import React from "react";

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
  const userInitial = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="hidden lg:flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <svg
                className="w-6 h-6"
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                MoodFlow
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Productivity Analytics
              </p>
            </div>
          </div>

          {/* Right: Actions & Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-1.5 border border-gray-100">
              <div className="text-center px-2 border-r border-gray-200">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Days
                </span>
                <span className="ml-2 text-sm font-bold text-indigo-700">
                  {displayData.days_logged}
                </span>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-1 pl-1">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-bold text-gray-800">
                  {streak}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-logs")}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              >
                My Logs
              </button>

              {isFullyLogged ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm font-bold">
                  <span>✓ Logged</span>
                </div>
              ) : isPartiallyLogged ? (
                <button
                  onClick={() => navigate(`/log-entry/${todayLog.id}`)}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all animate-pulse"
                >
                  ✏️ Finish Day
                </button>
              ) : (
                <button
                  onClick={() => navigate("/log-entry")}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 hover:shadow-lg transition-all"
                >
                  + Log Today
                </button>
              )}
            </div>

            {/* User Profile Dropdown/Area */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200">
                  {userInitial}
                </div>
                <div className="hidden xl:block text-sm">
                  <p className="font-medium text-gray-700 truncate max-w-[120px]">
                    {user?.email?.split("@")[0]}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
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
          {/* Row 1: Logo & User */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-md">
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
              <h1 className="text-xl font-bold text-gray-900">MoodFlow</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {userInitial}
                </div>
                <span className="text-xs font-medium text-gray-600 max-w-[80px] truncate">
                  {user?.email?.split("@")[0]}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-500"
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

          {/* Row 2: Action Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-grow">
              {isFullyLogged ? (
                <div className="w-full bg-green-50 text-green-700 py-2.5 rounded-xl text-center font-bold text-sm border border-green-200 shadow-sm">
                  ✓ Logged Today
                </div>
              ) : isPartiallyLogged ? (
                <button
                  onClick={() => navigate(`/log-entry/${todayLog.id}`)}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-md animate-pulse"
                >
                  ✏️ Finish Day
                </button>
              ) : (
                <button
                  onClick={() => navigate("/log-entry")}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
                >
                  + Log Today
                </button>
              )}
            </div>

            {/* My Logs */}
            <button
              onClick={() => navigate("/my-logs")}
              className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50"
            >
              Logs
            </button>

            {/* Streak Badge */}
            <div className="flex flex-col items-center justify-center bg-orange-50 text-orange-600 px-3 py-1 rounded-xl border border-orange-100 min-w-[3.5rem]">
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
