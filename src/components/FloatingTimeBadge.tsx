"use client";

import { useEffect, useState } from "react";

interface TimeState {
  dateLabel: string;
  timeLabel: string;
}

function getOrdinal(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getIndiaTime(): TimeState {
  const now = new Date();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const dateParts = dateFormatter.formatToParts(now);
  const weekday = dateParts.find((p) => p.type === "weekday")?.value ?? "";
  const month = dateParts.find((p) => p.type === "month")?.value ?? "";
  const dayString = dateParts.find((p) => p.type === "day")?.value ?? "";
  const dayNumber = parseInt(dayString, 10) || 0;
  const dateLabel = `${weekday}, ${month} ${dayString}${getOrdinal(dayNumber)}`;

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const timeRaw = timeFormatter.format(now);
  const timeLabel = timeRaw.toLowerCase();

  return { dateLabel, timeLabel };
}

export function FloatingTimeBadge() {
  const [time, setTime] = useState<TimeState>(() => getIndiaTime());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getIndiaTime());
    }, 30000); // update every 30 seconds

    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-10 left-8 z-40 hidden sm:block">
      <div className="text-left text-sm">
        <div className="text-[15px] font-semibold">{time.dateLabel}</div>
        <div className="mt-1 flex items-center gap-2 text-[13px]">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2563eb]"></span>
          <span>
            {time.timeLabel}, India
          </span>
        </div>
      </div>
    </div>
  );
}
