const ConsistencyGrid = ({ logs }) => {
  const days = [];
  const today = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  const logMap = logs.reduce((acc, log) => {
    acc[log.log_date] = log;
    return acc;
  }, {});
  const getDayStatus = (log) => {
    if (!log) return { color: "bg-gray-100", tooltip: "No log" };

    const prod = log.productivity;
    const stress = log.stress || 0;

    if (prod <= 4) {
      return {
        color: "bg-rose-500",
        tooltip: `Struggle • Prod: ${prod} • Stress: ${stress}`,
      };
    }

    if (prod <= 6) {
      return {
        color: "bg-emerald-200",
        tooltip: `Okay Day • Prod: ${prod}`,
      };
    }

    if (prod <= 8) {
      if (stress >= 7) {
        return {
          color: "bg-emerald-400",
          tooltip: `Resilience! • Good Output despite Stress (${prod}/${stress})`,
        };
      }
      return {
        color: "bg-emerald-400",
        tooltip: `Good Day • Prod: ${prod}`,
      };
    }

    return {
      color: "bg-emerald-600",
      tooltip: `Excellent Flow • Prod: ${prod}`,
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          Consistency Grid
          <span className="text-[10px] font-normal text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
            Last 90 Days
          </span>
        </h3>

        <div className="flex flex-wrap gap-3 text-[10px] font-medium text-gray-500 bg-gray-50/50 p-2 rounded-lg sm:bg-transparent sm:p-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-gray-200"></div>
            <span>Empty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-rose-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-sm bg-emerald-400"></div>
            <div className="w-2 h-2 rounded-sm bg-emerald-600"></div>
            <span className="ml-1">Productive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 sm:grid-cols-[repeat(auto-fit,minmax(1rem,1fr))] gap-1.5 sm:gap-2">
        {days.map((dateString) => {
          const log = logMap[dateString];
          const status = getDayStatus(log);

          return (
            <div
              key={dateString}
              title={`${dateString}: ${status.tooltip}`}
              className={`
                  aspect-square rounded-sm sm:rounded-md transition-all duration-300 hover:scale-125 hover:z-10 cursor-help
                  ${status.color}
                `}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsistencyGrid;
