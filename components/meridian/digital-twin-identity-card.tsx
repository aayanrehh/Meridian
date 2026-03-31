"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function DigitalTwinIdentityCard({ className }: { className?: string }) {
  const [followers, setFollowers] = useState(2400);
  const [lift, setLift] = useState(0);
  const [toneMatched, setToneMatched] = useState(94);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / 1200, 1);
      setFollowers(Math.round(2400 + (2486 - 2400) * easeOutCubic(progress)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / 1000, 1);
      setLift(Math.round(42 * easeOutCubic(progress)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / 1000, 1);
      setToneMatched(Math.round(94 + (98 - 94) * easeOutCubic(progress)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <Card
      className={cn(
        "relative h-[420px] overflow-hidden rounded-none border border-border border-t-[rgba(0,196,140,0.25)] bg-card shadow-none",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 z-0 h-[180px] w-[180px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,196,140,0.05) 0%, rgba(0,196,140,0) 70%)",
        }}
      />
      <CardHeader className="relative z-[1] space-y-0.5 border-b border-border px-5 py-3">
        <CardTitle className="font-sans text-[14px] font-bold leading-snug tracking-[-0.01em] text-[#eef2f0]">
          Digital Twin Identity &amp; Audit
        </CardTitle>
        <p className="font-mono text-[10px] leading-[1.5] text-[var(--meridian-sub)]">
          Your twin ingests only what you publish — index stays auditable.
        </p>
      </CardHeader>
      <CardContent className="relative z-[1] flex flex-col gap-2.5 px-5 py-3">
        <div>
          <h3 className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--meridian-muted)]">
            Twin Source Identity
          </h3>
          <div className="mt-1.5 flex gap-2.5">
            <Avatar className="size-8 shrink-0 border border-[var(--meridian-border-hi)]">
              <AvatarImage src="/jerah-reeves.png" alt="Jerah Reeves" />
              <AvatarFallback className="bg-[var(--meridian-bg3)] font-sans text-xs font-semibold text-zinc-100">
                JR
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-sans text-[13px] font-bold text-white">Jerah Reeves</p>
                <BadgeCheck
                  className="size-[12px] shrink-0 text-[var(--meridian-mint)]"
                  aria-label="Verified"
                  strokeWidth={2.25}
                />
              </div>
              <p className="font-sans text-[10px] leading-snug text-[var(--meridian-sub)]">
                Gen-Z Business Dean | Binghamton University SOM
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex items-stretch gap-5">
            <div>
              <p className="font-sans text-[20px] font-extrabold tabular-nums tracking-tight text-white">
                {followers.toLocaleString()}
              </p>
              <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--meridian-muted)]">
                Followers
              </p>
            </div>
            <div className="w-px bg-border" aria-hidden />
            <div>
              <p className="font-sans text-[20px] font-extrabold tabular-nums tracking-tight text-white">
                +{lift}%
              </p>
              <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--meridian-muted)]">
                Reach Lift
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--meridian-muted)]">
            Active Lead Magnet
          </h3>
          <div className="mt-1.5 flex items-center gap-2 rounded-none border border-border bg-[var(--meridian-bg3)] px-3 py-1.5">
            <Link2 className="size-3 shrink-0 text-[var(--meridian-muted)]" aria-hidden />
            <p className="font-sans text-[10px] text-[var(--meridian-muted)]">
              Tracked:{" "}
              <span className="font-medium text-[var(--meridian-mint)]">the young pro playbook</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--meridian-muted)]">
            Core Twin Thesis
          </h3>
          <div className="mt-1.5 max-h-[48px] overflow-hidden rounded-none border border-border bg-[var(--meridian-bg3)] px-3 py-1.5">
            <p className="font-heading text-[13px] italic leading-relaxed text-[var(--meridian-sub)]">
              I help Gen-Z thrive in the future of work.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="tone-badge-pulse rounded-none border bg-[var(--meridian-mint-glow)] px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.18em] text-[var(--meridian-mint)]"
          >
            <span
              className="mr-1.5 inline-block size-1.5 rounded-full bg-[var(--meridian-mint)] meridian-online-pulse"
              aria-hidden
            />
            TONE MATCHED: {toneMatched}%
          </Badge>
        </div>

        <div>
          <h3 className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5a6e66]">
            CONTENT PILLARS
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-none border border-[rgba(0,196,140,0.15)] bg-[rgba(0,196,140,0.06)] px-2.5 py-[3px] font-sans text-[9px] font-medium uppercase tracking-[0.08em] text-[#8a9e96]">
              Leadership Development
            </span>
            <span className="rounded-none border border-[rgba(0,196,140,0.15)] bg-[rgba(0,196,140,0.06)] px-2.5 py-[3px] font-sans text-[9px] font-medium uppercase tracking-[0.08em] text-[#8a9e96]">
              Gen-Z Workforce
            </span>
            <span className="rounded-none border border-[rgba(0,196,140,0.15)] bg-[rgba(0,196,140,0.06)] px-2.5 py-[3px] font-sans text-[9px] font-medium uppercase tracking-[0.08em] text-[#8a9e96]">
              Higher Education
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
