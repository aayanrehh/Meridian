import { BadgeCheck, Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DigitalTwinIdentityCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-none",
        className
      )}
    >
      <CardHeader className="space-y-1 border-b border-zinc-800 pb-4">
        <CardTitle className="text-base font-semibold leading-snug text-white">
          Digital Twin Identity &amp; Audit
        </CardTitle>
        <p className="text-xs leading-relaxed text-zinc-400">
          Your twin ingests only what you publish — index stays auditable.
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6 pt-5">
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Twin Source Identity
          </h3>
          <div className="mt-3 flex gap-3">
            <Avatar
              className={cn(
                "size-12 shrink-0 border border-zinc-800",
                "shadow-[0_0_0_3px_rgba(16,185,129,0.25),0_0_20px_rgba(16,185,129,0.18)]"
              )}
            >
              <AvatarImage
                src="/jerah-reeves.png"
                alt="Jerah Reeves"
              />
              <AvatarFallback className="bg-zinc-900 text-sm font-semibold text-zinc-100">
                JR
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-white">Jerah Reeves</p>
                <BadgeCheck
                  className="size-[14px] shrink-0 text-emerald-500"
                  aria-label="Verified"
                  strokeWidth={2.25}
                />
              </div>
              <p className="mt-0.5 text-sm leading-snug text-zinc-400">
                Gen-Z Business Dean | Binghamton University SOM
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <div>
              <p className="text-lg font-semibold tabular-nums tracking-tight text-white">
                2,486
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Followers
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold tabular-nums tracking-tight text-white">
                500+
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Connections
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Active Lead Magnet
          </h3>
          <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-3">
            <Link2
              className="mt-0.5 size-4 shrink-0 text-zinc-500"
              aria-hidden
            />
            <p className="text-sm leading-relaxed text-zinc-400">
              Tracked destination:{" "}
              <span className="font-medium text-emerald-400 underline-offset-2 hover:underline">
                the young pro playbook
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Core Twin Thesis
          </h3>
          <div className="mt-3 rounded-lg border border-zinc-800 bg-black/40 px-3 py-3">
            <p className="text-sm leading-relaxed text-zinc-400">
              I help Gen-Z thrive in the future of work.
            </p>
          </div>
          <div className="mt-3">
            <Badge variant="outline" className="text-emerald-400">
              Tone Matched: 98%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
