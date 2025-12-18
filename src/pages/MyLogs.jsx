import { ArrowLeft, Calendar, Edit3, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogButton from "../components/LogButton";
import { useToast } from "../contexts/ToastContext";
import { logsAPI } from "../utils/api";
import calculateStreak from "../utils/calculateStreak";
import { getLocalDateString } from "../utils/helpers";

const MyLogs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await logsAPI.getMyLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load history", "error");
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
    } catch {
      showToast("Failed to delete log", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-indigo-600 font-medium">
          Loading your journey...
        </div>
      </div>
    );

  const streak = calculateStreak(logs);
  const todayStr = getLocalDateString();
  const todayLog = logs.find((log) => log.log_date === todayStr);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 -ml-2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <span className="text-orange-600 font-bold text-sm">
              {streak} Day Streak
            </span>
            <span>🔥</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Daily History
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              {logs.length} total entries
            </p>
          </div>
          <LogButton
            isFullyLogged={todayLog && todayLog.stress !== null}
            isPartiallyLogged={todayLog && todayLog.stress === null}
            todayLog={todayLog}
            navigate={navigate}
          />
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">
                      {formatDate(log.log_date)}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                        Mood: {log.mood}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Prod: {log.productivity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => navigate(`/log-entry/${log.id}`)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(log.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/50 rounded-xl p-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Sleep
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {log.sleep_hours}{" "}
                    <span className="text-xs font-normal">hrs</span>
                  </span>
                </div>
                <div className="flex flex-col border-l border-gray-200/50 pl-3 sm:border-l-0 sm:pl-0">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Stress
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {log.stress || "—"}
                    <span className="text-xs font-normal">/10</span>
                  </span>
                </div>
                <div className="flex flex-col border-t border-gray-200/50 pt-2 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-3">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Activity
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {log.physical_activity_min || 0}{" "}
                    <span className="text-xs font-normal">min</span>
                  </span>
                </div>
                <div className="flex flex-col border-t border-gray-200/50 pt-2 border-l border-gray-200/50 pl-3 sm:border-t-0 sm:pt-0">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Screen
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {log.screen_time_hours || 0}{" "}
                    <span className="text-xs font-normal">hrs</span>
                  </span>
                </div>
              </div>

              {log.notes && (
                <div className="mt-4 text-sm text-gray-600 bg-indigo-50/30 p-3 rounded-lg border-l-2 border-indigo-200 italic">
                  "{log.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Delete this entry?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              This data will be permanently removed from your history.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
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
