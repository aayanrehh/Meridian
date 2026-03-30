"use client";

import { Fragment } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: 1,
    label: "Voice Calibration",
    state: "active" as const,
  },
  {
    id: 2,
    label: "Targeted Network Seeding",
    state: "next" as const,
  },
  {
    id: 3,
    label: "Inbound Lead Capture",
    state: "pending" as const,
  },
] as const;

const REACH_BARS = [
  { m: "Jan", reach: 100 },
  { m: "Feb", reach: 106 },
  { m: "Mar", reach: 112 },
  { m: "Apr", reach: 119 },
  { m: "May", reach: 127 },
  { m: "Jun", reach: 142 },
];

function stepStatus(state: (typeof STEPS)[number]["state"]) {
  if (state === "active") return "Active";
  if (state === "next") return "Next";
  return "Pending";
}

export function GrowthBlueprintCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-none",
        className
      )}
    >
      <CardHeader className="border-b border-zinc-800 pb-4">
        <CardTitle className="text-base font-semibold text-white">
          30-Day Growth Blueprint
        </CardTitle>
        <p className="text-xs text-zinc-400">
          What happens next — calibrated to your voice, then compounding reach.
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-10 pt-6">
        <div>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Execution timeline
          </p>

          <div className="px-1">
            <div className="flex items-center">
              {STEPS.map((step, i) => (
                <Fragment key={step.id}>
                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-zinc-950 text-xs font-semibold tabular-nums transition-shadow",
                        step.state === "active" &&
                          "border-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.12),0_0_24px_rgba(16,185,129,0.22)]",
                        step.state === "next" &&
                          "border-zinc-600 text-zinc-400",
                        step.state === "pending" &&
                          "border-zinc-700 text-zinc-500"
                      )}
                    >
                      {step.id}
                    </div>
                  </div>
                  {i < STEPS.length - 1 ? (
                    <div
                      className="mx-1 h-px min-w-[1rem] flex-1 bg-zinc-800 sm:mx-2"
                      aria-hidden
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
            <div className="mt-4 flex">
              {STEPS.map((step) => (
                <div
                  key={`label-${step.id}`}
                  className="flex min-w-0 flex-1 flex-col items-center px-1 text-center"
                >
                  <p className="text-xs font-medium leading-snug text-white">
                    {step.label}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                    {stepStatus(step.state)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Target audience reach
            </p>
            <div className="text-right">
              <span className="text-xl font-bold tabular-nums text-emerald-400 sm:text-2xl">
                +42%
              </span>
              <span className="ml-2 text-xs text-zinc-400">
                vs. baseline index
              </span>
            </div>
          </div>
          <div className="h-[140px] w-full min-h-[140px] flex-1 sm:h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...REACH_BARS]}
                margin={{ top: 18, right: 8, left: -20, bottom: 4 }}
              >
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="3 4"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  tick={{ fill: "rgba(161,161,170,0.85)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(63,63,70,0.5)" }}
                />
                <YAxis hide domain={["dataMin - 8", "dataMax + 8"]} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    backgroundColor: "#09090b",
                    border: "1px solid rgba(63,63,70,0.6)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fafafa",
                  }}
                  formatter={(v) => [`${v} (indexed)`, "Reach"]}
                />
                <Bar
                  dataKey="reach"
                  radius={[4, 4, 0, 0]}
                  fill="#34d399"
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey="reach"
                    position="top"
                    fill="rgba(212,212,216,0.75)"
                    fontSize={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
