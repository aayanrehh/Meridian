"use client";

import { useCallback, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ROWS = [
  {
    asset: "LinkedIn Post Draft",
    angle: "Athletic Discipline -> Corporate Success",
    status: "Ready for Review",
    action: "deploy" as const,
  },
  {
    asset: "Targeted Network Comment",
    angle: "Dr. Smith's post on First-Gen Students",
    status: "Ready for Review",
    action: "needs_input" as const,
  },
  {
    asset: "X Thread",
    angle: "Three beats: discipline → evidence → CTA for first-gen leaders",
    status: "Queued",
    action: "outline" as const,
  },
  {
    asset: "Substack Newsletter Draft",
    angle: "Dean's memo: retention signals vs. headline rankings",
    status: "Ready for Review",
    action: "outline" as const,
  },
  {
    asset: "High-Signal Comment",
    angle: "R1 thread on federal work-study caps — cite institutional data",
    status: "Blocked",
    action: "outline" as const,
  },
  {
    asset: "LinkedIn Carousel Draft",
    angle: "5 slides: syllabus rigor as leadership practice",
    status: "Ready for Review",
    action: "outline" as const,
  },
] as const;

const LINKEDIN_POST_MOCK = `A lot of people think athletic discipline doesn't translate to the boardroom. They are wrong.

The same repetitions that build muscle memory on the field—showing up on time, absorbing blunt feedback, and executing when the play breaks down—are the repetitions that build trust in teams. Leadership isn't a vibe; it's a training log.

In MGMT 111, we don't reward "busy." We reward evidence: did you improve the system for the next person? That's the bridge from athletics to strategy.

If you're hiring Gen-Z leaders, look for the pattern: discomfort handled with reps, not avoidance.

What's one non-negotiable standard your team rehearses every week—no exceptions?`;

const LINKEDIN_PANEL = {
  title: "Asset Review: LinkedIn Post",
  description:
    "Generated via cross-reference with MGMT 111 Syllabus and recent Higher-Ed news.",
} as const;

function initialDraftForRow(rowIndex: number): string {
  if (rowIndex === 0) return LINKEDIN_POST_MOCK;
  const row = ROWS[rowIndex];
  return `[Draft — ${row.asset}]\n\nAngle: ${row.angle}\n\n(Add your edits here before deploy.)`;
}

export function DeploymentQueueCard({ className }: { className?: string }) {
  const [rowOneDeployed, setRowOneDeployed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [draftBody, setDraftBody] = useState(LINKEDIN_POST_MOCK);

  const openReview = useCallback((rowIndex: number) => {
    setActiveRowIndex(rowIndex);
    setDraftBody(initialDraftForRow(rowIndex));
    setSheetOpen(true);
  }, []);

  const activeRow =
    activeRowIndex !== null ? ROWS[activeRowIndex] : ROWS[0];

  const sheetTitle =
    activeRowIndex === 0
      ? LINKEDIN_PANEL.title
      : `Asset Review: ${activeRow.asset}`;

  const sheetDescription =
    activeRowIndex === 0
      ? LINKEDIN_PANEL.description
      : `Strategic angle: ${activeRow.angle}`;

  const handleApprove = () => {
    toast("Asset Deployed to LinkedIn via API.");
    if (activeRowIndex === 0) setRowOneDeployed(true);
    setSheetOpen(false);
  };

  const handleRegenerate = () => {
    if (activeRowIndex === null) return;
    setDraftBody(initialDraftForRow(activeRowIndex));
    toast("Draft reset from twin baseline.");
  };

  return (
    <>
      <Card
        className={cn(
          "col-span-1 rounded-none border border-border bg-card md:col-span-12",
          "shadow-none",
          className
        )}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-50">Deployment Queue</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[17%] text-zinc-400">
                  Asset Type
                </TableHead>
                <TableHead className="min-w-[200px] text-zinc-400">
                  Strategic Angle
                </TableHead>
                <TableHead className="w-[15%] text-zinc-400">Status</TableHead>
                <TableHead className="w-[190px] text-right text-zinc-400">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row, i) => (
                <TableRow key={`${row.asset}-${i}`} className="border-zinc-800">
                  <TableCell className="font-medium text-zinc-100">
                    {row.asset}
                  </TableCell>
                  <TableCell className="text-zinc-300">{row.angle}</TableCell>
                  <TableCell className="text-zinc-500">{row.status}</TableCell>
                  <TableCell className="text-right">
                    {row.action === "deploy" ? (
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        disabled={rowOneDeployed}
                        className="gap-1.5"
                        onClick={() => openReview(i)}
                      >
                        {rowOneDeployed ? (
                          <>
                            <Check />
                            Deployed
                          </>
                        ) : (
                          "Review & Deploy"
                        )}
                      </Button>
                    ) : row.action === "needs_input" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="cursor-default border border-transparent text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-400"
                      >
                        Needs Input
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900/60 hover:text-zinc-200"
                        onClick={() => openReview(i)}
                      >
                        Review & Deploy
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          showCloseButton
          className="flex w-full flex-col border-zinc-800 bg-[#09090b] sm:max-w-xl md:max-w-2xl"
        >
          <SheetHeader className="border-b border-zinc-800 pb-4 pr-10 text-left">
            <SheetTitle className="text-lg text-zinc-50">{sheetTitle}</SheetTitle>
            <SheetDescription className="text-sm leading-relaxed text-zinc-500">
              {sheetDescription}
            </SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
            <label
              htmlFor="asset-draft"
              className="text-[11px] font-medium uppercase tracking-wider text-zinc-600"
            >
              Draft
            </label>
            <Textarea
              id="asset-draft"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              className="min-h-[min(52vh,420px)] flex-1 resize-y font-sans text-sm leading-relaxed text-zinc-200"
            />
          </div>

          <SheetFooter className="flex flex-row flex-wrap items-center justify-end gap-2 border-t border-zinc-800 bg-zinc-950/80 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-300"
              onClick={handleRegenerate}
            >
              <Sparkles className="size-4" />
              Regenerate
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="bg-zinc-100 font-semibold text-zinc-950 hover:bg-white"
              onClick={handleApprove}
            >
              Approve & Deploy
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
