"use client";

import { useEffect, useState } from "react";

/** Live local time in the given timezone, e.g. "14:32:07 IST". */
export function Clock({ timezone, label, seconds = true }: { timezone: string; label?: string; seconds?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="tabular-nums opacity-0">00:00:00</span>;

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: seconds ? "2-digit" : undefined,
    timeZone: timezone,
    hour12: false,
  }).format(now);
  const zone =
    label ??
    new Intl.DateTimeFormat("en-US", { timeZone: timezone, timeZoneName: "short" })
      .formatToParts(now)
      .find((p) => p.type === "timeZoneName")?.value ?? "";

  return (
    <span className="tabular-nums">
      {time} <span className="text-muted">{zone}</span>
    </span>
  );
}
