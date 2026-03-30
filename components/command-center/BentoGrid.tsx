import { BorderBeam } from "@/components/magicui/BorderBeam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TerminalPulse() {
  return (
    <div className="font-mono text-xs leading-relaxed text-zinc-200">
      <div className="flex items-center gap-3">
        <span className="relative inline-flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00A3FF] opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#00A3FF] shadow-[0_0_0_1px_rgba(0,163,255,0.45)]" />
        </span>

        <div className="min-w-0">
          <span className="text-[#00A3FF]">🟢 Agent Active:</span>{" "}
          Scraping Harvard Business Review and Chronicle of Higher Ed for
          Gen-Z workplace trends...
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/15 p-3">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="text-zinc-500">status</div>
            <div className="text-zinc-100">
              {" "}
              &gt; queue: <span className="text-[#00A3FF]">2</span>{" "}
              / scanning: <span className="text-[#00A3FF]">live</span>
            </div>
            <div className="text-zinc-500">latency</div>
            <div className="text-zinc-100">
              {" "}
              &gt; ~210ms (regional)
            </div>
          </div>

          <div className="text-right">
            <div className="text-zinc-500">trace</div>
            <div className="mt-1 text-zinc-100">
              hbhr + che
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NetworkIntelligence() {
  const segments = [
    { label: "Corporate Recruiters", value: 60, color: "bg-white/20" },
    { label: "Higher-Ed Deans", value: 25, color: "bg-white/14" },
    { label: "Students", value: 15, color: "bg-white/10" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-zinc-500">
          Network Intelligence
        </div>
        <div className="text-3xl font-semibold tracking-tight text-zinc-50">
          Target Profile Views: <span className="text-zinc-300">+42% MoM</span>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/15 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">Viewer breakdown</div>
          <div className="text-xs text-zinc-300">total: 1,284</div>
        </div>

        <div className="mt-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="flex h-3 w-full">
            {segments.map((s) => (
              <div
                key={s.label}
                className={s.color}
                style={{ width: `${s.value}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-4">
              <div className="min-w-0 truncate text-xs text-zinc-200">
                {s.label}
              </div>
              <div className="text-xs text-zinc-100">{s.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionQueue() {
  const rows = [
    {
      type: "Post Draft",
      topic: "Translating athletic discipline to corporate success",
      status: "Needs Review",
    },
    {
      type: "Network Engagement",
      topic: "Dr. Smith's post on first-gen students",
      status: "Needs Review",
    },
  ];

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[28%]">Type</TableHead>
            <TableHead>Topic / Trigger</TableHead>
            <TableHead className="w-[22%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={`${r.type}-${r.topic}`}>
              <TableCell className="font-medium text-zinc-100">
                {r.type}
              </TableCell>
              <TableCell className="text-zinc-200">{r.topic}</TableCell>
              <TableCell>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500">{r.status}</div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className={[
                      "h-8 shrink-0",
                      "border-[#00A3FF]/35 text-[#00A3FF]",
                      "bg-transparent",
                      "hover:bg-[#00A3FF]/10 hover:border-[#00A3FF]/60",
                      "active:bg-[#00A3FF]/15",
                    ].join(" ")}
                  >
                    Review
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AgenticLeash() {
  const ToggleRow = ({
    title,
    description,
    disabled,
    defaultChecked,
  }: {
    title: string;
    description: string;
    disabled?: boolean;
    defaultChecked?: boolean;
  }) => (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm font-medium text-zinc-50">{title}</div>
        <div className="mt-1 text-xs text-zinc-500">{description}</div>
      </div>
      <Switch
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-label={title}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-white/10 bg-black/15 p-4">
        <div className="space-y-4">
          <ToggleRow
            title="Auto-Drafting (Co-Pilot)"
            description="Drafts are generated but require approval."
            defaultChecked
          />
          <div className="h-px bg-white/10" />
          <ToggleRow
            title="Autonomous Commenting (Level 2)"
            description="Comments are suggested with safety checks."
            defaultChecked={false}
          />
          <div className="h-px bg-white/10" />
          <ToggleRow
            title="Auto-Publish (Full Auto - Currently Disabled)"
            description="Off by policy (risk controls enforced)."
            disabled
            defaultChecked={false}
          />
        </div>
      </div>

      <div className="text-xs text-zinc-500">
        Tip: tune autonomy to keep approvals aligned with your leadership voice.
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="grid grid-cols-12 gap-4">
      {/* Bento 1: Pulse (Top Left - Wide) */}
      <div className="col-span-12 lg:col-span-8">
        <Card className="h-full p-0 overflow-hidden">
          <BorderBeam className="h-full p-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-baseline justify-between gap-3">
                <span>Pulse</span>
                <span className="text-xs text-zinc-500">live telemetry</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TerminalPulse />
            </CardContent>
          </BorderBeam>
        </Card>
      </div>

      {/* Bento 2: Network Intelligence (Top Right - Square-ish) */}
      <div className="col-span-12 lg:col-span-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Network Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <NetworkIntelligence />
          </CardContent>
        </Card>
      </div>

      {/* Bento 3: Action Queue (Bottom - Full Width) */}
      <div className="col-span-12 lg:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Action Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <ActionQueue />
          </CardContent>
        </Card>
      </div>

      {/* Bento 4: Agentic Leash (Bottom Right / Side) */}
      <div className="col-span-12 lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Agentic Leash</CardTitle>
          </CardHeader>
          <CardContent>
            <AgenticLeash />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

