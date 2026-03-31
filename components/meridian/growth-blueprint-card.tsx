"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeedStatus =
  | "DRAFT QUEUED"
  | "BELOW THRESHOLD · SKIPPED"
  | "PROCESSING"
  | "REVIEWING RELEVANCE...";

interface FeedItem {
  id: string;
  score: number;
  source: string;
  summary: string;
  status: FeedStatus;
}

const FEED_CYCLE_ITEMS: FeedItem[] = [
  {
    id: "mit-sloan",
    score: 96,
    source: "MIT Sloan Management Review · 3 min ago",
    summary:
      "Why accountability cultures outperform autonomy cultures in Gen-Z teams",
    status: "PROCESSING",
  },
  {
    id: "inside-higher-ed",
    score: 91,
    source: "Inside Higher Ed · 11 min ago",
    summary:
      "Binghamton SOM ranked among top 15 for career placement outcomes",
    status: "DRAFT QUEUED",
  },
  {
    id: "linkedin-trending",
    score: 88,
    source: "LinkedIn Trending · Higher Ed · 18 min ago",
    summary:
      "Deans are the new thought leaders — why academic voices are dominating B2B feeds in 2026",
    status: "DRAFT QUEUED",
  },
  {
    id: "hbr",
    score: 94,
    source: "Harvard Business Review · 2h ago",
    summary:
      "Athletic discipline frameworks in corporate leadership pipelines",
    status: "DRAFT QUEUED",
  },
  {
    id: "forbes",
    score: 72,
    source: "Forbes · 5h ago",
    summary:
      "General executive wellness and productivity habits for 2026",
    status: "REVIEWING RELEVANCE...",
  },
  {
    id: "tc",
    score: 58,
    source: "TechCrunch · 1d ago",
    summary: "AI startup funding rounds Q1 2026",
    status: "BELOW THRESHOLD · SKIPPED",
  },
];

function scoreTone(score: number) {
  if (score >= 90) {
    return {
      color: "#00C48C",
      bg: "rgba(0,196,140,0.10)",
      opacity: 1,
      borderColor: "#00C48C",
    };
  }
  if (score >= 70) {
    return {
      color: "#f5a34a",
      bg: "rgba(245,163,74,0.12)",
      opacity: 1,
      borderColor: "#f5a34a",
    };
  }
  return {
    color: "#5a6e66",
    bg: "rgba(90,110,102,0.12)",
    opacity: 0.7,
    borderColor: "#5a6e66",
  };
}

function AnimatedScore({
  target,
  duration = 600,
}: {
  target: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{display}</>;
}

interface LiveFeedItem extends FeedItem {
  isNew: boolean;
  resolved: boolean;
}

export function GrowthBlueprintCard({ className }: { className?: string }) {
  const [refreshing, setRefreshing] = useState(false);
  const [agentStatus, setAgentStatus] = useState<
    "AGENT ACTIVE" | "AGENT SCANNING..." | "NEW SOURCE DETECTED"
  >("AGENT ACTIVE");
  const [feedItems, setFeedItems] = useState<LiveFeedItem[]>([]);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(52 * 60);
  const [scanningNow, setScanningNow] = useState(false);
  const isFirstCycle = useRef(true);
  const agentStatusTimeoutRef = useRef<number | null>(null);

  const addFeedItem = useCallback(
    (item: FeedItem) => {
      if (agentStatusTimeoutRef.current) {
        window.clearTimeout(agentStatusTimeoutRef.current);
      }
      setAgentStatus("NEW SOURCE DETECTED");
      agentStatusTimeoutRef.current = window.setTimeout(() => {
        setAgentStatus("AGENT ACTIVE");
        agentStatusTimeoutRef.current = null;
      }, 1500);

      setFeedItems((prev) => [
        { ...item, id: `${item.id}-${Date.now()}`, isNew: true, resolved: false },
        ...prev.map((p) => ({ ...p, isNew: false })).slice(0, 5),
      ]);

      if (item.status === "PROCESSING") {
        window.setTimeout(() => {
          setFeedItems((prev) =>
            prev.map((p) =>
              p.id.startsWith(item.id) && !p.resolved
                ? { ...p, status: "DRAFT QUEUED" as FeedStatus, resolved: true }
                : p
            )
          );
          window.dispatchEvent(
            new CustomEvent("meridian:feed-resolved", {
              detail: {
                source: item.source,
                summary: item.summary,
                score: item.score,
              },
            })
          );
        }, 2000);
      }
    },
    []
  );

  useEffect(() => {
    if (rotationIndex >= FEED_CYCLE_ITEMS.length) return;
    const delay = rotationIndex === 0 ? 800 : 6000;
    const timeout = window.setTimeout(() => {
      addFeedItem(FEED_CYCLE_ITEMS[rotationIndex]);
      setRotationIndex((prev) => prev + 1);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [rotationIndex, addFeedItem]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (agentStatus === "NEW SOURCE DETECTED") return;
      setAgentStatus("AGENT SCANNING...");
      window.setTimeout(() => {
        setAgentStatus((cur) =>
          cur === "AGENT SCANNING..." ? "AGENT ACTIVE" : cur
        );
      }, 2000);
    }, 15000);
    return () => window.clearInterval(interval);
  }, [agentStatus]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdownSeconds > 0) return;
    setScanningNow(true);
    const timeout = window.setTimeout(() => {
      setScanningNow(false);
      const recycleItem =
        FEED_CYCLE_ITEMS[rotationIndex % FEED_CYCLE_ITEMS.length];
      addFeedItem({
        ...recycleItem,
        id: `scan-${recycleItem.id}`,
        status: "DRAFT QUEUED",
      });
      setRotationIndex((prev) => prev + 1);
      if (isFirstCycle.current) {
        isFirstCycle.current = false;
      }
      setCountdownSeconds(6 * 60);
    }, 3000);
    return () => window.clearTimeout(timeout);
  }, [countdownSeconds, rotationIndex, addFeedItem]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const triggerRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className={cn("flex h-[420px] min-h-0 flex-col", className)}>
      <Card className="flex h-full min-h-0 flex-col rounded-none border border-[var(--meridian-border)] border-t-[rgba(0,196,140,0.25)] bg-[var(--meridian-bg2)] shadow-none">
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--meridian-border)] px-5 py-3">
          <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
            LIVE INTELLIGENCE FEED
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="live-dot size-1.5 rounded-full bg-[#00C48C]"
              aria-hidden
            />
            <span
              className={cn(
                "font-sans text-[8px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200",
                agentStatus === "NEW SOURCE DETECTED"
                  ? "text-[#00C48C]"
                  : "text-[#00C48C]"
              )}
            >
              {agentStatus}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-2 pt-1">
          <div className="meridian-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
            {feedItems.map((item, i) => {
              const tone = scoreTone(item.score);
              const isProcessing =
                item.status === "PROCESSING" && !item.resolved;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "group relative cursor-pointer py-2.5 transition-all duration-[120ms] hover:bg-[rgba(0,196,140,0.04)]",
                    item.isNew && "feed-item-new",
                    i !== feedItems.length - 1 &&
                      "border-b border-[rgba(0,196,140,0.06)]"
                  )}
                  style={{
                    borderLeft: `2px solid ${item.isNew ? "#00C48C" : tone.borderColor}`,
                    paddingLeft: 12,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex min-w-6 items-center justify-center rounded-none px-1 py-0.5 font-sans text-[10px] font-bold leading-none"
                      style={{
                        color: tone.color,
                        backgroundColor: tone.bg,
                        opacity: tone.opacity,
                      }}
                    >
                      {item.isNew ? (
                        <AnimatedScore target={item.score} />
                      ) : (
                        item.score
                      )}
                    </span>
                    <p className="truncate font-sans text-[11px] font-semibold text-white">
                      {item.source}
                    </p>
                    <span className="ml-auto shrink-0 font-sans text-[9px] tracking-[0.08em] text-[#00C48C] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      → VIEW DRAFT
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-0.5 truncate font-mono text-[10px] italic text-[#8a9e96]",
                      item.status === "BELOW THRESHOLD · SKIPPED" &&
                        "opacity-45 line-through"
                    )}
                  >
                    {item.summary}
                  </p>
                  {item.status === "DRAFT QUEUED" ? (
                    <p className="mt-1 font-sans text-[8px] font-semibold uppercase tracking-[0.15em] text-[#00C48C]">
                      ▶ DRAFT QUEUED
                    </p>
                  ) : null}
                  {isProcessing ? (
                    <p className="mt-1 inline-flex items-center gap-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.15em] text-[#00C48C]">
                      <span className="meridian-spinner" aria-hidden />
                      PROCESSING
                    </p>
                  ) : null}
                  {item.status === "REVIEWING RELEVANCE..." ? (
                    <p className="mt-1 inline-flex items-center gap-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.15em] text-[#f5a34a]">
                      <span className="meridian-spinner meridian-spinner-amber" aria-hidden />
                      REVIEWING RELEVANCE...
                    </p>
                  ) : null}
                  {item.status === "BELOW THRESHOLD · SKIPPED" ? (
                    <p className="mt-1 font-sans text-[8px] font-semibold uppercase tracking-[0.15em] text-[#5a6e66] opacity-50">
                      {item.status}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[rgba(0,196,140,0.06)] pt-2">
            <p className="text-right font-mono text-[9px] text-[#5a6e66]">
              {refreshing ? (
                "Last scan: updating..."
              ) : scanningNow ? (
                <span className="text-[#00C48C]">SCANNING NOW...</span>
              ) : (
                <>
                  Last scan: 4 minutes ago · Next scan in{" "}
                  {formatCountdown(countdownSeconds)}
                </>
              )}
            </p>
            <button
              type="button"
              onClick={triggerRefresh}
              className="inline-flex size-5 items-center justify-center rounded-none border border-[rgba(0,196,140,0.16)] text-[#5a6e66] transition-colors duration-[120ms] hover:text-[#00C48C]"
              aria-label="Manual scan refresh"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className={cn("size-3.5", refreshing && "animate-spin")}
                aria-hidden
              >
                <path
                  d="M16.25 10a6.25 6.25 0 1 1-1.83-4.42"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                <path
                  d="M16.25 4.58v3.33h-3.33"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </div>
      </Card>

      <style jsx>{`
        .live-dot {
          animation: liveDotPulse 2s infinite;
        }

        .meridian-spinner {
          width: 12px;
          height: 12px;
          display: inline-block;
          border: 2px solid rgba(0, 196, 140, 0.2);
          border-top-color: #00c48c;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .meridian-spinner-amber {
          border-color: rgba(245, 163, 74, 0.2);
          border-top-color: #f5a34a;
        }

        .feed-item-new {
          position: relative;
          animation: slideInFromTop 250ms ease-out;
        }

        @keyframes liveDotPulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
