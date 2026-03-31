"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BorderBeam } from "@/components/magicui/BorderBeam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Normalized index: flat baseline then sharp projected lift (~+310% vs baseline). */
const TRAJECTORY = [
  { phase: "Launch", idx: 1 },
  { phase: "Q1", idx: 1 },
  { phase: "Q2", idx: 1 },
  { phase: "Q3", idx: 1 },
  { phase: "Now", idx: 1 },
  { phase: "+90d", idx: 1.35 },
  { phase: "+180d", idx: 1.85 },
  { phase: "+270d", idx: 2.6 },
  { phase: "Target", idx: 4.1 },
] as const;

export function GrowthTrajectoryChart({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-none border border-border bg-card shadow-none",
        className
      )}
    >
      <BorderBeam accent="#34d399" pace="slow" className="h-full min-h-[380px]">
        <div className="relative z-10 flex min-h-[380px] flex-col bg-[#0A1A0F]/95">
          <CardHeader className="relative z-20 pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Network Trajectory: Transformational Leaders Program
            </CardTitle>
            <p className="mt-1 text-sm text-emerald-100/60">
              Flat baseline today — then compounding reach as the program scales.
            </p>
          </CardHeader>
          <CardContent className="relative min-h-[280px] flex-1 pb-4">
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:items-start sm:justify-start sm:pt-6 sm:text-left">
              <span className="text-4xl font-bold tabular-nums tracking-tight text-emerald-400 drop-shadow-[0_0_24px_rgba(52,211,153,0.25)] sm:text-5xl md:text-6xl">
                +310%
              </span>
              <p className="mt-2 max-w-[16rem] text-sm font-medium text-white sm:text-base">
                Projected View Growth
              </p>
            </div>
            <div className="relative z-[1] h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[...TRAJECTORY]}
                  margin={{ top: 12, right: 12, left: 0, bottom: 4 }}
                >
                  <defs>
                    <linearGradient
                      id="trajectoryEmerald"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#34d399"
                        stopOpacity={0.55}
                      />
                      <stop
                        offset="45%"
                        stopColor="#10b981"
                        stopOpacity={0.18}
                      />
                      <stop
                        offset="100%"
                        stopColor="#065f46"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(16,185,129,0.12)"
                    strokeDasharray="4 6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="phase"
                    tick={{ fill: "rgba(209,250,229,0.5)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(6,78,59,0.45)" }}
                  />
                  <YAxis hide domain={[0.85, 4.35]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#040D06",
                      border: "1px solid rgba(6,95,70,0.45)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#ecfdf5",
                    }}
                    labelStyle={{ color: "rgba(209,250,229,0.7)" }}
                    formatter={(v) => {
                      const n = typeof v === "number" ? v : Number(v);
                      const pct = Number.isFinite(n)
                        ? `${((n - 1) * 100).toFixed(0)}% vs baseline`
                        : "—";
                      return [pct, "Index"];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="idx"
                    stroke="#34d399"
                    strokeWidth={2.5}
                    fill="url(#trajectoryEmerald)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#6ee7b7", stroke: "#022c22" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </div>
      </BorderBeam>
    </Card>
  );
}
