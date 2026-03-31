"use client";

import type { ReactNode } from "react";

import { BorderBeam } from "@/components/magicui/BorderBeam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Monochromatic outline badges — zinc scale only. */
const b = {
  scraping:
    "border-zinc-600 bg-zinc-950/70 font-mono text-[9px] text-zinc-200 normal-case tracking-tight",
  analyzing:
    "border-zinc-500/90 bg-zinc-900/50 font-mono text-[9px] text-zinc-100 normal-case tracking-tight",
  drafting:
    "border-zinc-600 bg-zinc-950/60 font-mono text-[9px] text-zinc-300 normal-case tracking-tight",
  rateLimited:
    "border-zinc-500 bg-zinc-950/80 font-mono text-[9px] text-zinc-400 normal-case tracking-tight",
  vector:
    "border-zinc-700 bg-zinc-950/50 font-mono text-[9px] text-zinc-300 normal-case tracking-tight",
  sync:
    "border-zinc-600/80 bg-zinc-950/40 font-mono text-[9px] text-zinc-200 normal-case tracking-tight",
  queued:
    "border-zinc-700 bg-zinc-950/60 font-mono text-[9px] text-zinc-500 normal-case tracking-tight",
} as const;

function LogLine({
  time,
  children,
}: {
  time: string;
  children: ReactNode;
}) {
  return (
    <li className="break-words leading-snug">
      <span className="text-zinc-600">[{time}]</span> {children}
    </li>
  );
}

export function LiveTwinTelemetryCard({ className }: { className?: string }) {
  return (
    <BorderBeam
      accent="#d4d4d8"
      pace="slow"
      className={cn("col-span-1 md:col-span-8", className)}
    >
      <Card
        className={cn(
          "relative z-10 overflow-hidden rounded-none border-border bg-card shadow-none",
          "ring-1 ring-zinc-800/90"
        )}
      >
        <CardHeader className="border-b border-zinc-800/80 pb-3 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <CardTitle className="text-zinc-50">Live Twin Telemetry</CardTitle>
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Live
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden
            />
            <span className="text-sm text-zinc-200">
              Agent Status: Active Monitoring
            </span>
          </div>

          <div
            className={cn(
              "rounded-md border border-zinc-800 bg-black/55 px-2.5 py-2.5 sm:px-3",
              "font-mono text-[10px] leading-snug text-zinc-500 sm:text-[11px]"
            )}
          >
            <div className="mb-2 border-b border-zinc-800/80 pb-1.5 text-[9px] uppercase tracking-wider text-zinc-600">
              background_tasks.log
            </div>
            <ul className="space-y-1.5">
              <LogLine time="10:40:02">
                <Badge variant="outline" className={b.queued}>
                  QUEUED
                </Badge>{" "}
                <span className="text-zinc-400">
                  twin-runtime init — cohort <span className="text-zinc-500">dean-lead-v3</span>{" "}
                  cold_start <span className="text-zinc-500">428ms</span>
                </span>
              </LogLine>
              <LogLine time="10:41:15">
                <Badge variant="outline" className={b.scraping}>
                  SCRAPING
                </Badge>{" "}
                <span className="text-zinc-400">
                  HBR article &quot;Gen-Z Retention&quot; depth=<span className="text-zinc-500">2</span>{" "}
                  cf-cache <span className="text-zinc-500">MISS</span> bytes=<span className="text-zinc-500">184_220</span>
                </span>
              </LogLine>
              <LogLine time="10:41:44">
                <Badge variant="outline" className={b.analyzing}>
                  ANALYZING
                </Badge>{" "}
                <span className="text-zinc-400">
                  pdf.sha256 <span className="text-zinc-500">a9f3…e21c</span> Syllabus_MGMT111.pdf — OCR
                  lane <span className="text-zinc-500">B</span> pages <span className="text-zinc-500">14/14</span>
                </span>
              </LogLine>
              <LogLine time="10:42:08">
                <Badge variant="outline" className={b.vector}>
                  VECTOR_UPSERT
                </Badge>{" "}
                <span className="text-zinc-400">
                  namespace <span className="text-zinc-500">meridian/twin/knowledge</span> batch{" "}
                  <span className="text-zinc-500">032</span> vectors=<span className="text-zinc-500">512-d</span>{" "}
                  took <span className="text-zinc-500">86ms</span>
                </span>
              </LogLine>
              <LogLine time="10:43:01">
                <Badge variant="outline" className={b.rateLimited}>
                  RATE_LIMITED
                </Badge>{" "}
                <span className="text-zinc-400">
                  provider <span className="text-zinc-500">li/search/v2</span> —{" "}
                  <span className="text-zinc-500">429</span> retry_after=<span className="text-zinc-500">2.4s</span>{" "}
                  jitter=<span className="text-zinc-500">±180ms</span>
                </span>
              </LogLine>
              <LogLine time="10:43:28">
                <Badge variant="outline" className={b.drafting}>
                  DRAFTING
                </Badge>{" "}
                <span className="text-zinc-400">
                  outbound_comment target=<span className="text-zinc-500">nyu.stern.dean@edu</span>{" "}
                  tone=<span className="text-zinc-500">measured</span> safety=<span className="text-zinc-500">STRICT</span>
                </span>
              </LogLine>
              <LogLine time="10:44:12">
                <Badge variant="outline" className={b.analyzing}>
                  ANALYZING
                </Badge>{" "}
                <span className="text-zinc-400">
                  graph.edge ingest mentorship→first_gen (confidence{" "}
                  <span className="text-zinc-500">0.81</span>) source=<span className="text-zinc-500">internal_kb</span>
                </span>
              </LogLine>
              <LogLine time="10:44:55">
                <Badge variant="outline" className={b.sync}>
                  SYNC
                </Badge>{" "}
                <span className="text-zinc-400">
                  webhook <span className="text-zinc-500">POST /hooks/deployment</span> sig=<span className="text-zinc-500">v1</span>{" "}
                  delivered <span className="text-zinc-500">202</span> idempotency_key=<span className="text-zinc-500">dq-9f2</span>
                </span>
              </LogLine>
              <LogLine time="10:45:33">
                <Badge variant="outline" className={b.scraping}>
                  SCRAPING
                </Badge>{" "}
                <span className="text-zinc-400">
                  chronicle <span className="text-zinc-500">&quot;leadership pipeline&quot;</span> filter_date≥{" "}
                  <span className="text-zinc-500">2026-03-01</span> results=<span className="text-zinc-500">37</span>
                </span>
              </LogLine>
              <LogLine time="10:46:01">
                <Badge variant="outline" className={b.drafting}>
                  DRAFTING
                </Badge>{" "}
                <span className="text-zinc-400">
                  compose_delta v=<span className="text-zinc-500">linkedin_post_v2</span> tokens_in={" "}
                  <span className="text-zinc-500">1_864</span> refusal_flags=<span className="text-zinc-500">0</span>
                </span>
              </LogLine>
            </ul>
          </div>
        </CardContent>
      </Card>
    </BorderBeam>
  );
}
