import React from "react";
import { format, addDays, startOfWeek } from "date-fns";

const WeekCalendar = ({ currentDate, handleOpenWeightModal }) => {
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 });
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeekDate, index)
  );

  return (
    <div className="flex justify-between items-center bg-gray-200 text-gray-800 p-4 rounded-lg">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className={`flex flex-col items-center ${
            format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
              ? "text-green-500"
              : ""
          }`}
        >
          <span className="text-xs" onClick={handleOpenWeightModal}>
            {format(day, "EE")}
          </span>
          <span
            onClick={handleOpenWeightModal}
            className={`text-lg font-bold ${
              format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
                ? "bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                : ""
            }`}
          >
            {format(day, "d")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeekCalendar;
