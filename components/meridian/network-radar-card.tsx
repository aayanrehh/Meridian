"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AUDIENCE = [
  { segment: "Corporate Recruiters", pct: 60 },
  { segment: "Higher-Ed Leadership", pct: 25 },
  { segment: "Students", pct: 15 },
] as const;

const BAR_FILLS = ["#fafafa", "#a1a1aa", "#71717a"] as const;

export function NetworkRadarCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "col-span-1 flex flex-col rounded-none border border-border bg-card shadow-none md:col-span-4",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-zinc-50">Network Radar</CardTitle>
        <p className="pt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          +42%{" "}
          <span className="text-base font-normal text-zinc-500">
            Target Profile Views (MoM)
          </span>
        </p>
      </CardHeader>
      <CardContent className="flex min-h-[220px] flex-1 flex-col pt-0">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
          Audience breakdown
        </p>
        <div className="min-h-[180px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[...AUDIENCE]}
              margin={{ top: 8, right: 8, left: -16, bottom: 4 }}
            >
              <CartesianGrid
                stroke="oklch(0.37 0 0 / 0.35)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="segment"
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#3f3f46" }}
                interval={0}
                height={48}
                tickFormatter={(v: string) =>
                  v.length > 14 ? `${v.slice(0, 12)}…` : v
                }
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(n) => `${n}%`}
                domain={[0, 70]}
              />
              <Tooltip
                cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#e4e4e7",
                }}
                labelStyle={{ color: "#a1a1aa" }}
                formatter={(value) => [
                  `${typeof value === "number" ? value : value ?? 0}%`,
                  "Share",
                ]}
              />
              <Bar dataKey="pct" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {AUDIENCE.map((_, i) => (
                  <Cell key={AUDIENCE[i].segment} fill={BAR_FILLS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
