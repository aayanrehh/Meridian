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
    id: "linkedin-post",
    asset: "LinkedIn Post",
    detail: "Translating athletic discipline to corporate resilience.",
    action: "deploy" as const,
  },
  {
    id: "comment-reply",
    asset: "Comment Reply",
    detail: "Dr. Smith's post on Federal Work-Study caps",
    action: "needs_input" as const,
  },
  {
    id: "carousel",
    asset: "LinkedIn Carousel Draft",
    detail: "5 slides: Syllabus rigor as leadership practice",
    action: "deploy" as const,
  },
  {
    id: "dm-sequence",
    asset: "Direct Message Sequence",
    detail: "Intro to 3 Corporate Recruiters in NY",
    action: "deploy" as const,
  },
  {
    id: "substack-memo",
    asset: "Substack Newsletter Draft",
    detail: "Dean's memo: retention signals you control vs. rankings headlines",
    action: "deploy" as const,
  },
] as const;

const DRAFT_COPY = `A lot of people think athletic discipline doesn't translate to the boardroom. They are wrong.

The same repetitions that build muscle memory on the field—showing up on time, absorbing blunt feedback, and executing when the play breaks down—are the repetitions that build trust in teams. Leadership isn't a vibe; it's a training log.

Resilience isn't the absence of stress. It's the trained ability to stay coherent when the play breaks—then adjust fast. That's the through-line from athletics to corporate life.

If you're building a bench of leaders under 30, hire for the training log, not the highlight reel.

What's one standard your team rehearses weekly with zero exceptions?`;

export function ExecutiveDeploymentQueue({ className }: { className?: string }) {
  const [deployedIds, setDeployedIds] = useState<Set<string>>(() => new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [draftBody, setDraftBody] = useState(DRAFT_COPY);

  const openReview = useCallback((rowId: string) => {
    setActiveRowId(rowId);
    setDraftBody(DRAFT_COPY);
    setSheetOpen(true);
  }, []);

  const handleApprove = () => {
    toast("Asset Deployed to LinkedIn via API.");
    if (activeRowId) {
      setDeployedIds((prev) => new Set(prev).add(activeRowId));
    }
    setSheetOpen(false);
  };

  const handleRegenerate = () => {
    setDraftBody(DRAFT_COPY);
    toast("Draft refreshed from twin baseline.");
  };

  return (
    <>
      <Card
        className={cn(
          "rounded-xl border border-zinc-800 bg-zinc-950 shadow-none",
          className
        )}
      >
        <CardHeader className="space-y-1 border-b border-zinc-800 pb-4">
          <CardTitle className="text-base font-semibold text-white">
            Deployment Queue
          </CardTitle>
          <p className="text-xs text-zinc-400">
            Full pipeline — review, tighten, ship. Voice-locked to your indexed
            identity.
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-4 pt-0 sm:px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800/80 hover:bg-transparent">
                <TableHead className="h-12 w-[20%] min-w-[7.5rem] pl-6 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Asset
                </TableHead>
                <TableHead className="h-12 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Focus
                </TableHead>
                <TableHead className="h-12 w-[200px] pr-6 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => {
                const isDeployed = deployedIds.has(row.id);
                return (
                  <TableRow
                    key={row.id}
                    className="border-zinc-800/80 hover:bg-white/[0.02]"
                  >
                    <TableCell className="py-5 pl-6 align-middle text-sm font-medium text-white">
                      {row.asset}
                    </TableCell>
                    <TableCell className="max-w-md py-5 align-middle text-sm leading-relaxed text-zinc-400">
                      {row.detail}
                    </TableCell>
                    <TableCell className="py-5 pr-6 text-right align-middle">
                      {row.action === "deploy" ? (
                        <Button
                          type="button"
                          size="sm"
                          disabled={isDeployed}
                          className={cn(
                            "gap-1.5 bg-white font-medium text-black shadow-none",
                            "hover:bg-zinc-200"
                          )}
                          onClick={() => openReview(row.id)}
                        >
                          {isDeployed ? (
                            <>
                              <Check className="size-4" />
                              Deployed
                            </>
                          ) : (
                            "Review & Deploy"
                          )}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="cursor-default border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-300"
                        >
                          Needs Input
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          showCloseButton
          className="flex w-full flex-col border-zinc-800 bg-black sm:max-w-xl md:max-w-2xl"
        >
          <SheetHeader className="border-b border-zinc-800 pb-4 pr-10 text-left">
            <SheetTitle className="text-lg text-white">
              Asset Review: LinkedIn Post
            </SheetTitle>
            <SheetDescription className="text-sm leading-relaxed text-zinc-400">
              Generated via cross-reference with your frameworks and recent
              Higher-Ed signals.
            </SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
            <label
              htmlFor="exec-draft"
              className="text-[11px] font-medium uppercase tracking-wider text-zinc-500"
            >
              Draft
            </label>
            <Textarea
              id="exec-draft"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              className="min-h-[min(52vh,420px)] flex-1 resize-y border-zinc-800 bg-zinc-950 font-sans text-sm leading-relaxed text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-zinc-600/30"
            />
          </div>

          <SheetFooter className="flex flex-row flex-wrap items-center justify-end gap-2 border-t border-zinc-800 bg-zinc-950/80 pt-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              onClick={handleRegenerate}
            >
              <Sparkles className="size-4 text-zinc-400" />
              Regenerate
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400"
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
