import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { logsAPI } from "../utils/api";
import calculateStreak from "../utils/calculateStreak";

const MyLogs = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch logs on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await logsAPI.getMyLogs();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError("Failed to load logs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (logId) => {
    try {
      await logsAPI.deleteLog(logId);
      setLogs(logs.filter((log) => log.id !== logId));
      setDeleteConfirm(null);
      showToast("Log deleted successfully", "success");
    } catch (err) {
      setError("Failed to delete log");
      console.error(err);
      showToast("Failed to delete log", "error");
    }
  };

  // Helper to format date nicely
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your logs...</div>
        </div>
      </div>
    );
  }

  const streak = calculateStreak(logs);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((log) => log.log_date === todayStr);
  const isFullyLogged = todayLog && todayLog.mood !== null;
  const isPartiallyLogged = todayLog && todayLog.mood === null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex justify-between items-center md:block">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Logs</h1>
              <p className="text-gray-600">{logs.length} entries</p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="md:hidden px-3 py-1 text-gray-500 hover:text-gray-900 text-sm bg-white rounded-lg border border-gray-200"
            >
              Dashboard
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="shrink-0 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-xl text-center">
              <div className="text-2xl font-bold leading-none">{streak}🔥</div>
              <div className="text-[10px] uppercase font-bold opacity-90 tracking-wide">
                streak
              </div>
            </div>

            {/* CASE 1: FULLY COMPLETE */}
            {isFullyLogged ? (
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-3 rounded-xl text-center shadow-md">
                <div className="text-xl font-bold">✓</div>
                <div className="text-xs opacity-90 whitespace-nowrap">
                  logged today
                </div>
              </div>
            ) : isPartiallyLogged ? (
              /* CASE 2: MORNING DONE, EVENING PENDING */
              <button
                /* Navigate to EDIT mode using the existing log ID */
                onClick={() => navigate(`/log-entry/${todayLog.id}`)}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all whitespace-nowrap animate-pulse"
              >
                ✏️ Finish Day
              </button>
            ) : (
              /* CASE 3: NOTHING LOGGED */
              <button
                onClick={() => navigate("/log-entry")}
                className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap"
              >
                + Log Today
              </button>
            )}

            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:block px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-4 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Empty State */}
      {logs.length === 0 && (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No logs yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start tracking your days to see patterns emerge
          </p>
          <button
            onClick={() => navigate("/log-entry")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700"
          >
            Log Your First Day
          </button>
        </div>
      )}

      {/* Logs List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-gray-900">
                    {formatDate(log.log_date)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Mood: {log.mood}/10 • Productivity: {log.productivity}/10
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/log-entry/${log.id}`)}
                  className="px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(log.id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Expanded details */}
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Sleep:</span>
                <span className="ml-2 font-medium">{log.sleep_hours}hrs</span>
              </div>
              <div>
                <span className="text-gray-500">Stress:</span>
                <span className="ml-2 font-medium">{log.stress}/10</span>
              </div>
              {log.physical_activity_min && (
                <div>
                  <span className="text-gray-500">Activity:</span>
                  <span className="ml-2 font-medium">
                    {log.physical_activity_min}min
                  </span>
                </div>
              )}
              {log.screen_time_hours && (
                <div>
                  <span className="text-gray-500">Screen:</span>
                  <span className="ml-2 font-medium">
                    {log.screen_time_hours}hrs
                  </span>
                </div>
              )}
            </div>

            {log.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm italic">"{log.notes}"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-2">Delete this log?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLogs;
