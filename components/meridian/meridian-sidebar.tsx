"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Executive Overview", href: "/" },
  { label: "Deployment Queue", href: "/deployment-queue" },
  { label: "Growth Overview", href: "/growth-overview" },
  { label: "Intelligence Feed", href: "/intelligence-feed" },
] as const;

const DAILY_SLOTS = [
  { time: "9:00 AM", type: "Value Thread", status: "deployed" as const },
  { time: "1:00 PM", type: "Engagement Hook", status: "ready" as const },
  { time: "6:00 PM", type: "Authority Post", status: "drafting" as const },
] as const;

const WEEKLY_TARGETS = [
  { label: "Posts / day", current: 2, target: 3 },
  { label: "Engagement", current: 38, target: 50, unit: "%" },
  { label: "Network reach", current: 1.2, target: 2.0, unit: "k" },
] as const;

function TimelineNode({ state }: { state: "past" | "active" | "future" }) {
  const base = "absolute left-0 top-1/2 -translate-y-1/2";
  if (state === "past") {
    return (
      <span className={cn(base, "size-[7px] rounded-full bg-[var(--meridian-mint)]")} />
    );
  }
  if (state === "active") {
    return (
      <span className={cn(base, "-left-[2px] size-[11px]")}>
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--meridian-mint)] opacity-30" />
        <span className="absolute inset-[2px] rounded-full bg-[var(--meridian-mint)]" />
      </span>
    );
  }
  return (
    <span className={cn(base, "size-[7px] rounded-full border border-[#5a6e66]")} />
  );
}

export function MeridianSidebar() {
  const pathname = usePathname();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const currentHour = now.getHours();
  const activeSlotIndex = currentHour < 11 ? 0 : currentHour < 16 ? 1 : 2;

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col overflow-hidden border-r border-border bg-background">
      <div className="pointer-events-none absolute inset-0 w-[220px] opacity-[0.08]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="meridianSidebarNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#meridianSidebarNoise)" />
        </svg>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col px-4 py-4">
        {/* ── Brand ── */}
        <div className="shrink-0 pb-3">
          <div className="flex items-center gap-2">
            <div>
              <p className="font-sans text-[15px] font-extrabold tracking-[0.08em] text-white uppercase leading-none">
                MERIDIAN
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="meridian-online-pulse inline-block size-[5px] rounded-full bg-[var(--meridian-mint)]"
                />
                <p className="font-sans text-[8px] font-medium uppercase tracking-[0.22em] text-[var(--meridian-muted)]">
                  TWIN ENGINE
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full shrink-0 bg-border" />

        {/* ── Navigation ── */}
        <nav className="mt-3 flex shrink-0 flex-col gap-0.5" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center border-l-2 border-transparent px-2 py-1 font-sans text-[10px] font-semibold transition-all duration-[120ms]",
                  isActive
                    ? "border-[var(--meridian-mint)] bg-[rgba(0,196,140,0.04)] text-white"
                    : "text-[#8a9e96] hover:bg-[rgba(0,196,140,0.04)] hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

        {/* ── Scrollable body ── */}
        <div className="meridian-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
          {/* ── Daily Pipeline Timeline ── */}
          <p className="shrink-0 pb-2.5 font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
            TODAY&apos;S PIPELINE
          </p>

          <div className="relative ml-[3px]">
            {/* Rail — sits behind the nodes at left: 0, centered on the 7px node */}
            <div
              className="absolute left-[3px] top-0 bottom-0 w-px"
              aria-hidden
              style={{
                background:
                  "linear-gradient(to bottom, var(--meridian-mint), rgba(0,196,140,0.25) 60%, rgba(0,196,140,0.06))",
              }}
            />

            {DAILY_SLOTS.map((slot, i) => {
              const state = i < activeSlotIndex ? "past" : i === activeSlotIndex ? "active" : "future";
              const isActive = state === "active";
              const isPast = state === "past";

              return (
                <div
                  key={i}
                  className={cn(
                    "relative pl-5 py-2",
                    i === 0 && "pt-0",
                    i === DAILY_SLOTS.length - 1 && "pb-0"
                  )}
                >
                  {/* Node — absolutely placed on the rail */}
                  <TimelineNode state={state} />

                  {/* Slot content */}
                  <div className="flex items-baseline justify-between">
                    <span
                      className={cn(
                        "font-mono text-[10px] tabular-nums leading-none",
                        isActive
                          ? "text-[var(--meridian-mint)]"
                          : isPast
                            ? "text-[#6b8078]"
                            : "text-[#5a6e66]"
                      )}
                    >
                      {slot.time}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[7px] uppercase tracking-[0.14em]",
                        slot.status === "deployed"
                          ? "text-[#6b8078]"
                          : slot.status === "ready"
                            ? "text-[var(--meridian-mint)]"
                            : "text-[#f5a34a]"
                      )}
                    >
                      {slot.status}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-0.5 font-sans text-[10px] font-semibold leading-tight",
                      isActive ? "text-white" : isPast ? "text-[#6b8078]" : "text-[#8a9e96]"
                    )}
                  >
                    {slot.type}
                  </p>

                  {isActive && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="h-[3px] flex-1 overflow-hidden bg-[rgba(0,196,140,0.1)]">
                        <div
                          className="h-full bg-[var(--meridian-mint)] transition-all duration-1000"
                          style={{ width: slot.status === "ready" ? "90%" : "45%" }}
                        />
                      </div>
                      <span className="font-mono text-[8px] text-[var(--meridian-mint)]">
                        {slot.status === "ready" ? "90%" : "45%"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

          {/* ── Weekly Targets ── */}
          <p className="shrink-0 pb-2 font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
            WEEKLY TARGETS
          </p>

          <div className="flex flex-col gap-2.5">
            {WEEKLY_TARGETS.map((t) => {
              const pct = Math.min((t.current / t.target) * 100, 100);
              const isHit = t.current >= t.target;
              return (
                <div key={t.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[9px] font-semibold text-[#8a9e96]">
                      {t.label}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] tabular-nums",
                        isHit ? "text-[var(--meridian-mint)]" : "text-white"
                      )}
                    >
                      {t.current}
                      {"unit" in t ? t.unit : ""}
                      <span className="text-[#5a6e66]">
                        {" "}/ {t.target}
                        {"unit" in t ? t.unit : ""}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1 h-[3px] w-full overflow-hidden bg-[rgba(0,196,140,0.08)]">
                    <div
                      className="h-full bg-[var(--meridian-mint)] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

          {/* ── Settings links ── */}
          <div className="flex flex-col gap-0.5">
            {([
              { label: "Voice Calibration", href: "/voice-calibration" },
              { label: "Content Pillars", href: "/content-pillars" },
              { label: "Posting Schedule", href: "/posting-schedule" },
            ] as const).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-2 py-1 font-sans text-[9px] font-medium text-[#5a6e66] transition-colors duration-[120ms] hover:text-[#8a9e96]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── User card ── */}
        <div className="mt-auto shrink-0">
          <div className="border-t border-[rgba(0,196,140,0.08)] px-1 pt-2.5 pb-1">
            <div className="flex items-center gap-2.5">
              <div className="size-8 shrink-0 rounded-full border border-[var(--meridian-border-hi)] bg-[var(--meridian-bg3)]" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate whitespace-nowrap font-sans text-[11px] font-bold text-white">
                    Jerah Reeves
                  </span>
                  <span
                    className="inline-block size-1.5 rounded-full bg-[var(--meridian-mint)] animate-pulse"
                    aria-label="Online"
                  />
                </div>
                <p className="font-sans text-[9px] text-[#5a6e66]">
                  Gen-Z · Higher Ed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
