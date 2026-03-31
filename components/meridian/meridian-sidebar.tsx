"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SECTION_ONE = [{ label: "Executive Overview", href: "/" }] as const;

const SECTION_TWO = [
  { label: "Deployment Queue", href: "/deployment-queue", badge: "3" as const },
  { label: "Intelligence Feed", href: "/intelligence-feed", live: true as const },
  { label: "Draft History", href: "/draft-history" },
] as const;

const SECTION_THREE = [
  { label: "Growth Overview", href: "/growth-overview" },
  { label: "Engagement Report", href: "/engagement-report" },
  { label: "Audience Insights", href: "/audience-insights" },
] as const;

const SECTION_FOUR = [
  { label: "Voice Calibration", href: "/voice-calibration" },
  { label: "Content Pillars", href: "/content-pillars" },
  { label: "Posting Schedule", href: "/posting-schedule" },
] as const;

export function MeridianSidebar() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [nextPostLabel, setNextPostLabel] = useState("Tue 9:14 AM");

  const navItemClass =
    "group flex items-center justify-between border-l-2 border-transparent px-2 py-1.5 font-sans text-[11px] font-semibold transition-all duration-[120ms]";

  useEffect(() => {
    const updateNextPost = () => {
      const now = new Date();
      const slot = new Date();
      slot.setHours(9, 14, 0, 0);
      if (now.getTime() > slot.getTime()) {
        slot.setDate(slot.getDate() + 1);
      }
      const day = slot.toLocaleDateString("en-US", { weekday: "short" });
      const time = slot.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setNextPostLabel(`${day} ${time}`);
    };
    updateNextPost();
    const interval = window.setInterval(updateNextPost, 60000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col overflow-hidden border-r border-border bg-background">
      <div className="pointer-events-none absolute inset-0 w-[220px] opacity-[0.08]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="meridianSidebarNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#meridianSidebarNoise)" />
        </svg>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col px-4 py-4">
        <div className="shrink-0 pb-3">
          <p className="font-sans text-[17px] font-extrabold tracking-[0.1em] text-white uppercase">
            MERIDIAN{" "}
            <span className="font-sans tracking-normal text-[var(--meridian-mint)]">
              //
            </span>
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              aria-hidden
              className="meridian-online-pulse inline-block size-[5px] rounded-full bg-[var(--meridian-mint)]"
            />
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--meridian-muted)]">
              TWIN ENGINE
            </p>
          </div>
        </div>
        <div className="h-px w-full shrink-0 bg-border" />

        <nav className="meridian-scrollbar mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto" aria-label="Primary">
          <div className="flex flex-col gap-0.5">
            {SECTION_ONE.map((item) => {
              const isActive = home && item.href === "/";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    navItemClass,
                    isActive
                      ? "border-[var(--meridian-mint)] bg-[rgba(0,196,140,0.04)] text-white"
                      : "text-[#8a9e96] hover:bg-[rgba(0,196,140,0.04)] hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

          <div>
            <p className="pb-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
              TWIN ACTIVITY
            </p>
            <div className="flex flex-col gap-0.5">
              {SECTION_TWO.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    navItemClass,
                    "text-[#8a9e96] hover:bg-[rgba(0,196,140,0.04)] hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {"badge" in item ? (
                    <span className="inline-flex size-4 items-center justify-center rounded-full bg-[var(--meridian-mint)] font-sans text-[9px] font-bold text-[var(--meridian-bg)]">
                      {item.badge}
                    </span>
                  ) : null}
                  {"live" in item ? (
                    <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.16em] text-[#00C48C]">
                      LIVE
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>

          <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

          <div>
            <p className="pb-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
              ANALYTICS
            </p>
            <div className="flex flex-col gap-0.5">
              {SECTION_THREE.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    navItemClass,
                    "text-[#8a9e96] hover:bg-[rgba(0,196,140,0.04)] hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-3 h-px w-full bg-[rgba(0,196,140,0.07)]" />

          <div>
            <p className="pb-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
              TWIN SETTINGS
            </p>
            <div className="flex flex-col gap-0.5">
              {SECTION_FOUR.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    navItemClass,
                    "text-[#8a9e96] hover:bg-[rgba(0,196,140,0.04)] hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom section — pushed down by flex */}
        <div className="mt-auto shrink-0">
          <div className="border border-[rgba(0,196,140,0.15)] bg-[rgba(0,196,140,0.05)] px-3 py-2">
            <p className="flex items-center gap-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.16em] text-[#00C48C]">
              <span
                aria-hidden
                className="meridian-online-pulse inline-block size-[6px] rounded-full bg-[#00C48C]"
              />
              SCANNING
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-[#8a9e96]">
              Next post: {nextPostLabel}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-[#5a6e66]">
              Queue: 3 ready · 1 reviewing
            </p>
          </div>

          <div className="mt-1.5 border border-[rgba(0,196,140,0.12)] bg-[rgba(0,196,140,0.03)] px-3 py-2">
            <p className="font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
              TWIN PROGRESS
            </p>
            <div className="relative mt-1.5 space-y-1.5 pl-4">
              <div className="absolute left-[3px] top-[5px] h-[40px] w-px bg-[#00C48C]" aria-hidden />
              <div
                className="absolute left-[3px] top-[45px] h-[12px] w-px border-l border-dashed border-[#5a6e66]"
                aria-hidden
              />

              <div className="relative flex items-start gap-2">
                <span className="absolute -left-[13px] top-[3px] size-[7px] rounded-full bg-[#00C48C]" />
                <div>
                  <p className="whitespace-nowrap font-sans text-[9px] leading-[1.3] text-[#8a9e96]">Voice Calibration</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#00C48C]">COMPLETE</p>
                </div>
              </div>

              <div className="relative flex items-start gap-2">
                <span className="absolute -left-[13px] top-[3px] size-[7px] rounded-full border border-[#00C48C]">
                  <span className="absolute -inset-1 animate-ping rounded-full border border-[#00C48C]/50" />
                  <span className="absolute inset-[1px] rounded-full bg-[#00C48C]" />
                </span>
                <div>
                  <p className="whitespace-nowrap font-sans text-[9px] leading-[1.3] text-[#8a9e96]">Network Seeding</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#00C48C]">ACTIVE</p>
                </div>
              </div>

              <div className="relative flex items-start gap-2">
                <span className="absolute -left-[13px] top-[3px] size-[7px] rounded-full border border-[#5a6e66]" />
                <div>
                  <p className="whitespace-nowrap font-sans text-[9px] leading-[1.3] text-[#8a9e96]">Lead Capture</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5a6e66]">PENDING</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1.5 border-t border-[rgba(0,196,140,0.08)] px-1 py-1.5">
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
