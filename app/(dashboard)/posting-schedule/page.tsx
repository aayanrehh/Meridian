export default function PostingSchedulePage() {
  const slots = [
    { day: "Monday", time: "9:00 AM", type: "Value Thread", notes: "Lead with a data point or personal story." },
    { day: "Tuesday", time: "1:00 PM", type: "Engagement Hook", notes: "Ask a single, sharp question." },
    { day: "Wednesday", time: "9:00 AM", type: "Authority Post", notes: "Reference research or institutional insight." },
    { day: "Thursday", time: "6:00 PM", type: "Comment Reply", notes: "Engage a trending thread in Higher Ed or Gen-Z space." },
    { day: "Friday", time: "9:00 AM", type: "LinkedIn Post", notes: "End-of-week reflection or forward-looking take." },
  ];

  const statusColor: Record<string, string> = {
    "9:00 AM": "text-[#00C48C]",
    "1:00 PM": "text-[#f5a34a]",
    "6:00 PM": "text-[#8a9e96]",
  };

  return (
    <div className="flex min-h-full flex-col gap-3 px-4 pb-4 pt-3">
      <div className="mb-1">
        <h1 className="font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
          Posting Schedule
        </h1>
        <p className="mt-0.5 font-mono text-[11px] text-[#5a6e66]">
          Your twin queues assets to publish at the optimal windows for your audience.
        </p>
      </div>
      <div className="max-w-2xl overflow-hidden border border-[rgba(0,196,140,0.12)]">
        <div className="grid grid-cols-[80px_90px_160px_1fr] border-b border-[rgba(0,196,140,0.1)] px-5 py-2">
          {["DAY", "TIME", "TYPE", "NOTES"].map((h) => (
            <span key={h} className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#5a6e66]">
              {h}
            </span>
          ))}
        </div>
        {slots.map((slot, i) => (
          <div
            key={slot.day}
            className={`grid grid-cols-[80px_90px_160px_1fr] items-center gap-2 px-5 py-3 ${
              i < slots.length - 1 ? "border-b border-[rgba(0,196,140,0.06)]" : ""
            } hover:bg-[rgba(0,196,140,0.03)]`}
          >
            <span className="font-sans text-[11px] font-semibold text-white">{slot.day}</span>
            <span className={`font-mono text-[11px] tabular-nums ${statusColor[slot.time] ?? "text-[#8a9e96]"}`}>
              {slot.time}
            </span>
            <span className="font-sans text-[11px] text-[#8a9e96]">{slot.type}</span>
            <span className="truncate font-mono text-[10px] italic text-[#5a6e66]">{slot.notes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
