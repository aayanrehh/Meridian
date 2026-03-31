import { CheckCircle, Search, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FEED = [
  {
    icon: Search,
    label: "Scraped latest Higher-Ed retention data.",
    when: "2 mins ago",
  },
  {
    icon: CheckCircle,
    label: "Cross-referenced Level Up Gen-Z frameworks.",
    when: "15 mins ago",
  },
  {
    icon: Zap,
    label: "Drafted post: The Student-Athlete Advantage.",
    when: "1 hr ago",
  },
] as const;

export function LiveAgentActivityCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-none border border-border bg-card shadow-none",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-white">
          Live Agent Activity
        </CardTitle>
        <p className="text-xs text-emerald-100/60">
          Recent twin output — no jargon, just progress.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        {FEED.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex gap-3 rounded-none border border-emerald-900/30 bg-[#040D06]/70 px-3 py-3"
            >
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-none border border-emerald-800/40 bg-emerald-950/50">
                <Icon
                  className="size-4 text-emerald-400"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-white">{item.label}</p>
                <p className="mt-1 text-xs text-emerald-100/60">{item.when}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
