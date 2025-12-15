"use client";

import { memo, useMemo } from "react";
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements";

const REPEAT_COUNT = 10;

function TopBar() {
  const { data: announcements = [], isLoading } = useAnnouncements();

  // Memoize the messages array to prevent recreation on every render
  const messages = useMemo(() => {
    if (announcements.length === 0) return [];
    // Efficiently create repeated array using Array.from
    return Array.from({ length: REPEAT_COUNT }, () => announcements).flat();
  }, [announcements]);

  if (isLoading) {
    return (
      <div className="h-10 bg-black flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (messages.length === 0) return null;

  return (
    <div className="h-10 bg-black text-white overflow-hidden">
      <div className="flex h-full items-center">
        <div className="flex whitespace-nowrap min-w-max animate-scroll">
          {messages.map((announcement, index) => (
            <div
              key={`${announcement._id}-${index}`}
              className="px-8 shrink-0 flex items-center"
            >
              <span className="text-[12px] font-[550] uppercase tracking-widest">
                {announcement.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(TopBar);
