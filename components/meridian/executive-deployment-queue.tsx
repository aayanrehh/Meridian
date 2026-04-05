"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Globe, Loader2, RefreshCw, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const ROWS = [
  {
    id: "linkedin-post",
    asset: "LinkedIn Post",
    detail: "Translating athletic discipline to corporate resilience.",
    source: "Harvard Business Review · 2h ago",
    publication: "Harvard Business Review",
    timeAgo: "2h ago",
    score: 94,
    reviewText:
      "A lot of people think athletic discipline does not translate to the boardroom. They are wrong.\n\nThe same repetitions that build muscle memory on the field, showing up on time, absorbing blunt feedback, and executing when the play breaks down, are the repetitions that build trust in teams. Leadership is not a vibe; it is a training log.\n\nIf you are hiring Gen-Z leaders, look for the pattern: discomfort handled with reps, not avoidance.\n\nWhat is one non-negotiable standard your team rehearses every week?",
    tag: "sourced" as const,
    action: "deploy" as const,
  },
  {
    id: "comment-reply",
    asset: "Comment Reply",
    detail: "Dr. Smith's post on Federal Work-Study caps",
    source: "LinkedIn Trending · Higher Ed · 4h ago",
    publication: "LinkedIn Trending · Higher Ed",
    timeAgo: "4h ago",
    score: 88,
    reviewText:
      "Policy changes around Federal Work-Study should push us toward outcomes-based mentorship.\n\nIf institutions want ROI, pair every student role with one measurable skill transfer target. Progress should be auditable every two weeks, not guessed at semester end.",
    tag: "awaiting" as const,
    action: "needs_input" as const,
  },
  {
    id: "carousel-draft",
    asset: "LinkedIn Carousel Draft",
    detail: "5 slides: Syllabus rigor as leadership practice",
    source: "NYT Education · this morning",
    publication: "NYT Education",
    timeAgo: "6h ago",
    score: 91,
    reviewText:
      "Rigor is not punishment. Rigor is design clarity.\n\nWhen students understand why standards exist and can see the progression of difficulty, they build real confidence instead of short-term compliance.\n\nIn leadership development, clarity beats charisma every time.",
    tag: "carousel" as const,
    action: "deploy" as const,
  },
  {
    id: "substack-draft",
    asset: "Substack Draft",
    detail: "Dean memo: retention signals vs. headline rankings",
    source: "Inside Higher Ed · 8h ago",
    publication: "Inside Higher Ed",
    timeAgo: "8h ago",
    score: 90,
    reviewText:
      "Rankings make noise. Retention data reveals truth.\n\nIf we want stronger leadership pipelines, we should optimize for persistence, mentorship quality, and career outcomes, not optics.",
    tag: "sourced" as const,
    action: "deploy" as const,
  },
] as const;

const DRAFT_COPY = `A lot of people think athletic discipline doesn't translate to the boardroom. They are wrong.

The same repetitions that build muscle memory on the field—showing up on time, absorbing blunt feedback, and executing when the play breaks down—are the repetitions that build trust in teams. Leadership isn't a vibe; it's a training log.

Resilience isn't the absence of stress. It's the trained ability to stay coherent when the play breaks—then adjust fast. That's the through-line from athletics to corporate life.

If you're building a bench of leaders under 30, hire for the training log, not the highlight reel.

What's one standard your team rehearses weekly with zero exceptions?`;

export function ExecutiveDeploymentQueue({ className }: { className?: string }) {
  const [dbRows, setDbRows] = useState<any[]>([]);
  const [deployedIds, setDeployedIds] = useState<Set<string>>(() => new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string>("");
  const [draftBody, setDraftBody] = useState("");
  const [promptText, setPromptText] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [deployFlash, setDeployFlash] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [promptUpdated, setPromptUpdated] = useState(false);
  const [schedule, setSchedule] = useState("Afternoon · 1:05 PM Tue");
  const [reviewModeOpen, setReviewModeOpen] = useState(false);
  const [reviewModeVisible, setReviewModeVisible] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewTransition, setReviewTransition] = useState<"idle" | "out-left" | "in-right">(
    "idle"
  );
  const [reviewRegenLoading, setReviewRegenLoading] = useState(false);
  const [reviewCopies, setReviewCopies] = useState<Record<string, string>>({});
  const [fadingRowIds, setFadingRowIds] = useState<Set<string>>(() => new Set());
  const [hiddenRowIds, setHiddenRowIds] = useState<Set<string>>(() => new Set());
  const [pendingPulse, setPendingPulse] = useState(false);
  const [injectedRows, setInjectedRows] = useState<Array<{
    id: string; asset: string; detail: string; source: string;
    publication: string; timeAgo: string; score: number; reviewText: string;
    tag: "sourced"; action: "deploy"; fadingIn: boolean;
  }>>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const posts = await res.json();
          const mapped = posts.map((post: any) => ({
            id: post.id,
            asset: post.asset_type || "LinkedIn Post",
            detail: post.focus || "Generated Draft",
            source: "AI Engine",
            publication: "Meridian Twin",
            timeAgo: "just now",
            score: 95,
            reviewText: post.content,
            tag: "sourced",
            action: "deploy",
          }));
          setDbRows(mapped);
          if (mapped.length > 0 && !activeRowId) {
            setActiveRowId(mapped[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    }
    fetchPosts();
  }, []);

  const allRows = useMemo(() => [...injectedRows, ...dbRows], [injectedRows, dbRows]);

  const openReview = (rowId: string) => {
    setActiveRowId(rowId);
    const row = allRows.find(r => r.id === rowId);
    setDraftBody(row?.reviewText || "");
    setDeploySuccess(false);
    setDeployFlash(false);
    setSheetOpen(true);
  };

  const activeRow = useMemo(
    () => allRows.find((row) => row.id === activeRowId) ?? allRows[0] ?? {},
    [activeRowId, allRows]
  );

  const reviewRows = useMemo(() => dbRows.filter((row) => row.action === "deploy"), [dbRows]);
  
  const tableRows = useMemo(
    () => allRows.filter((row) => !hiddenRowIds.has(row.id)),
    [allRows, hiddenRowIds]
  );

  const pendingCount = reviewRows.filter(
    (row) => row.action === "deploy" && !deployedIds.has(row.id)
  ).length + injectedRows.length;

  const approvedCount = reviewRows.filter((row) => deployedIds.has(row.id)).length;
  const totalReviewCount = reviewRows.length;
  const reviewProgress = (approvedCount / totalReviewCount) * 100;

  const currentReviewRow = reviewRows[reviewIndex % reviewRows.length] ?? reviewRows[0];
  const currentReviewText =
    reviewCopies[currentReviewRow?.id ?? ""] ?? currentReviewRow?.reviewText ?? "";

  const openReviewMode = () => {
    setReviewModeOpen(true);
    window.setTimeout(() => setReviewModeVisible(true), 10);
  };

  const closeReviewMode = () => {
    setReviewModeVisible(false);
    window.setTimeout(() => setReviewModeOpen(false), 300);
  };

  const moveToNextReviewCard = () => {
    setReviewTransition("out-left");
    window.setTimeout(() => {
      setReviewIndex((prev) => (prev + 1) % reviewRows.length);
      setReviewTransition("in-right");
      window.setTimeout(() => setReviewTransition("idle"), 250);
    }, 250);
  };

  const handleReviewApprove = () => {
    if (!currentReviewRow) return;
    setDeployedIds((prev) => new Set(prev).add(currentReviewRow.id));
    toast("✓ Scheduled · Tue 9:14 AM", { duration: 2000 });
    moveToNextReviewCard();
  };

  const handleReviewSkip = () => {
    moveToNextReviewCard();
  };

  const handleReviewRegen = () => {
    if (reviewRegenLoading || !currentReviewRow) return;
    setReviewRegenLoading(true);
    window.setTimeout(() => {
      setReviewCopies((prev) => ({
        ...prev,
        [currentReviewRow.id]:
          `${currentReviewRow.reviewText}\n\n[Regenerated variant] Add one sharp contrarian angle and tighten to a clearer CTA.`,
      }));
      setReviewRegenLoading(false);
    }, 900);
  };

  useEffect(() => {
    if (!reviewModeOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "a") handleReviewApprove();
      if (key === "r") handleReviewRegen();
      if (key === "s") handleReviewSkip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reviewModeOpen, currentReviewRow?.id, reviewRegenLoading]);

  useEffect(() => {
    if (reviewModeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [reviewModeOpen]);

  useEffect(() => {
    const onFeedResolved = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      const newRow = {
        id: `feed-${Date.now()}`,
        asset: "LinkedIn Post",
        detail: detail.summary ?? "",
        source: detail.source ?? "",
        publication: (detail.source ?? "").split("·")[0].trim(),
        timeAgo: (detail.source ?? "").split("·").slice(1).join("·").trim(),
        score: detail.score ?? 96,
        reviewText: detail.summary ?? "",
        tag: "sourced" as const,
        action: "deploy" as const,
        fadingIn: true,
      };
      setInjectedRows((prev) => [newRow, ...prev]);
      setPendingPulse(true);
      window.setTimeout(() => setPendingPulse(false), 200);
      window.setTimeout(() => {
        setInjectedRows((prev) => prev.map((r) => r.id === newRow.id ? { ...r, fadingIn: false } : r));
      }, 400);
    };
    window.addEventListener("meridian:feed-resolved", onFeedResolved);
    return () => window.removeEventListener("meridian:feed-resolved", onFeedResolved);
  }, []);

  useEffect(() => {
    setPendingPulse(true);
    const timeout = window.setTimeout(() => setPendingPulse(false), 200);
    return () => window.clearTimeout(timeout);
  }, [pendingCount]);

  const handlePromptSubmit = async () => {
    if (!promptText.trim() || promptLoading) return;
    setPromptLoading(true);
    setPromptUpdated(false);
    const instruction = promptText.trim();
    window.setTimeout(() => {
      setDraftBody((prev) => `${prev}\n\n[Twin update] ${instruction}`);
      setPromptText("");
      setPromptLoading(false);
      setPromptUpdated(true);
    }, 1500);
  };

  const handleRegenerate = async () => {
    if (regenLoading) return;
    setRegenLoading(true);
    window.setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setDraftBody(prev => `${prev}\n\n[Regenerated] Framed for sharper executive tone.`);
        setIsFading(false);
      }, 150);
      setRegenLoading(false);
    }, 1500);
  };

  const handleApprove = async () => {
    if (deployLoading) return;
    setDeployLoading(true);
    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: activeRow.id, content: draftBody }),
      });
      if (!response.ok) throw new Error("deploy failed");
      setDeployedIds((prev) => new Set(prev).add(activeRow.id));
      setDeploySuccess(true);
      setDeployFlash(true);
      setTimeout(() => setDeployFlash(false), 80);
      setFadingRowIds((prev) => new Set(prev).add(activeRow.id));
      setTimeout(() => {
        setHiddenRowIds((prev) => new Set(prev).add(activeRow.id));
        setFadingRowIds((prev) => {
          const next = new Set(prev);
          next.delete(activeRow.id);
          return next;
        });
      }, 400);
      setTimeout(() => {
        setSheetOpen(false);
        setDeploySuccess(false);
      }, 1500);
      toast("✓ Post scheduled · Tue 9:14 AM");
    } catch {
      toast("Deploy request failed.");
    } finally {
      setDeployLoading(false);
    }
  };

  return (
    <>
      <Card
        className={cn(
          "rounded-none border border-border bg-card shadow-none",
          className
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between border-b border-border px-5 py-3">
          <div>
            <CardTitle className="font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
              Deployment Queue
            </CardTitle>
            <p className="mt-1 font-mono text-[10px] text-[#00C48C]">↑ 4.2 hrs saved this week</p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span
              className={cn(
                "rounded-none border border-[var(--meridian-border-hi)] bg-[var(--meridian-mint-glow)] px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--meridian-mint)]",
                pendingPulse && "animate-[meridianPendingPulse_200ms_ease-out]"
              )}
            >
              {pendingCount} pending
            </span>
            <button
              type="button"
              onClick={openReviewMode}
              className="rounded-none border border-[rgba(0,196,140,0.3)] bg-transparent px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.08em] text-[#00C48C] transition-colors duration-[120ms] hover:bg-[rgba(0,196,140,0.06)]"
            >
              REVIEW ALL →
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-[1.05fr_1.7fr_auto] border-b border-border px-5 py-2">
            <div className="whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.18em] text-[var(--meridian-muted)]">
              ASSET
            </div>
            <div className="whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.18em] text-[var(--meridian-muted)]">
              FOCUS
            </div>
            <div className="whitespace-nowrap text-right font-sans text-[9px] uppercase tracking-[0.18em] text-[var(--meridian-muted)]">
              ACTION
            </div>
          </div>

          {tableRows.map((row, index) => {
            const isDeployed = deployedIds.has(row.id);
            const isDeploy = row.action === "deploy";
            const isInjected = "fadingIn" in row;
            const isFadingIn = isInjected && (row as typeof injectedRows[number]).fadingIn;
            return (
              <div
                key={row.id}
                className={cn(
                  "grid h-[60px] grid-cols-[1.05fr_1.7fr_auto] items-center gap-4 px-5 transition-all duration-[400ms] hover:bg-[rgba(0,196,140,0.03)]",
                  fadingRowIds.has(row.id) && "pointer-events-none opacity-0",
                  isFadingIn && "opacity-0",
                  index < tableRows.length - 1 && "border-b border-[rgba(0,196,140,0.08)]"
                )}
              >
                <div>
                  <p className="font-sans text-[12px] font-bold text-white">
                    {row.asset}
                  </p>
                  {row.tag === "sourced" ? (
                    <p className="mt-0.5 font-sans text-[8px] uppercase tracking-[0.14em] text-[var(--meridian-mint)]">
                      ● SOURCED
                    </p>
                  ) : row.tag === "carousel" ? (
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <p className="font-sans text-[8px] uppercase tracking-[0.14em] text-[var(--meridian-mint)]">
                        ● SOURCED
                      </p>
                      <span className="rounded-none border border-[rgba(245,163,74,0.25)] bg-[rgba(245,163,74,0.12)] px-[6px] py-[1px] font-sans text-[8px] uppercase tracking-[0.14em] text-[#f5a34a]">
                        CAROUSEL
                      </span>
                    </div>
                  ) : (
                    <p className="mt-0.5 font-sans text-[8px] uppercase tracking-[0.14em] text-[var(--meridian-muted)]">
                      ● AWAITING INPUT
                    </p>
                  )}
                </div>

                <div>
                  <p className="truncate font-mono text-[11px] italic text-[var(--meridian-sub)]">
                    {row.detail}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[9px] text-[var(--meridian-muted)]">
                    ↳ sourced from:{" "}
                    <span className="text-[var(--meridian-sub)]">{row.source}</span>
                  </p>
                </div>

                <div className="text-right">
                  {isDeploy ? (
                    <Button
                      type="button"
                      size="sm"
                      disabled={isDeployed}
                      onClick={() => openReview(row.id)}
                      className="rounded-none border border-transparent bg-[#00C48C] px-4 py-[9px] font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[#080b09] transition-colors duration-[120ms] hover:bg-[rgba(0,196,140,0.85)]"
                    >
                      {isDeployed ? (
                        <>
                          <Check className="size-3.5" />
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
                      className="cursor-default rounded-none border-[rgba(0,196,140,0.25)] bg-transparent px-4 py-[9px] font-sans text-[10px] text-[#5a6e66] transition-colors duration-[120ms] hover:border-[rgba(0,196,140,0.5)] hover:bg-transparent hover:text-[#8a9e96]"
                    >
                      Needs Input
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Side sheet for individual review */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          showCloseButton
          className="flex flex-col border-l border-border bg-[var(--meridian-bg)] p-0"
          style={{ width: 480, maxWidth: 480 }}
        >
          <SheetTitle className="sr-only">Asset Review</SheetTitle>
          <SheetDescription className="sr-only">
            Review and deploy generated content for the selected asset.
          </SheetDescription>

          <div className="shrink-0 border-b border-border px-6 py-3 pr-12">
            <div className="flex items-center gap-3">
              <p className="font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-white">
                Asset Review
              </p>
              <span className="border border-[var(--meridian-mint)] bg-[var(--meridian-mint-glow)] px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--meridian-mint)]">
                LINKEDIN POST
              </span>
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-[var(--meridian-muted)]">
              ↳{" "}
              <span className="text-[var(--meridian-sub)]">
                Harvard Business Review · Athletic Leadership · 2h ago
              </span>
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <div className="overflow-hidden border border-[rgba(0,196,140,0.12)] bg-[var(--meridian-bg2)] transition-colors duration-[150ms] focus-within:border-[var(--meridian-border-hi)]">
              {/* LinkedIn profile header */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(0,196,140,0.15)] font-sans text-[13px] font-bold text-[var(--meridian-mint)]">
                  JR
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[13px] font-semibold text-white">Jarah Reeves</p>
                  <p className="font-mono text-[11px] leading-snug text-[#8a9e96]">
                    Gen-Z Business Dean · Binghamton University SOM
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[var(--meridian-muted)]">
                    <span className="font-sans text-[10px]">2h</span>
                    <span className="text-[10px]">·</span>
                    <Globe className="size-2.5" />
                  </div>
                </div>
              </div>

              {/* Post body — editable textarea styled as post text */}
              <div className="px-4 pb-3">
                <textarea
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  style={{ fieldSizing: "content" } as React.CSSProperties}
                  className={cn(
                    "min-h-[120px] w-full resize-none border-0 bg-transparent p-0 font-sans text-[13px] leading-[1.75] text-[var(--meridian-sub)] outline-none",
                    isFading ? "opacity-70" : "opacity-100 transition-opacity duration-[120ms]"
                  )}
                />
              </div>

              {/* Character progress */}
              <div className="flex items-center gap-3 px-4 pb-2">
                <div className="h-[3px] flex-1 rounded-full bg-[rgba(0,196,140,0.1)]">
                  <div
                    className="h-full rounded-full bg-[#00C48C] transition-[width] duration-200"
                    style={{
                      width: `${Math.min((draftBody.length / 3000) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="shrink-0 font-mono text-[9px] text-[var(--meridian-muted)]">
                  {draftBody.length} / 3000
                </span>
              </div>

              {/* Predicted engagement — LinkedIn-style metrics row */}
              <div className="flex border-t border-[rgba(0,196,140,0.08)] px-4 py-2.5">
                <div className="flex-1">
                  <p className="font-heading text-[13px] font-bold text-white">1.4-2.2K</p>
                  <p className="font-mono text-[8px] text-[var(--meridian-muted)]">impr</p>
                </div>
                <div className="flex-1">
                  <p className="font-heading text-[13px] font-bold text-[#00C48C]">3.8-5.1%</p>
                  <p className="font-mono text-[8px] text-[var(--meridian-muted)]">eng</p>
                </div>
                <div className="flex-1">
                  <p className="font-heading text-[13px] font-bold text-white">Tue 9:14 AM</p>
                  <p className="font-mono text-[8px] text-[var(--meridian-muted)]">best</p>
                </div>
              </div>
            </div>

            <div className="mt-3 border-t border-[rgba(0,196,140,0.08)] pt-3">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="size-3 text-[#00C48C]" />
                <p className="font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--meridian-muted)]">
                  PROMPT THE TWIN
                </p>
              </div>
              <div className="flex items-center gap-2 border border-border bg-[var(--meridian-bg2)] px-3 py-2 transition-colors duration-[150ms] focus-within:border-[var(--meridian-border-hi)]">
                <input
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. make this more contrarian..."
                  className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[11px] italic text-[var(--meridian-sub)] outline-none placeholder:text-[var(--meridian-muted)]"
                />
                <button
                  type="button"
                  onClick={handlePromptSubmit}
                  className="shrink-0 text-[14px] text-[var(--meridian-mint)] transition-opacity duration-[120ms] hover:opacity-85"
                >
                  {promptLoading ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    "↵"
                  )}
                </button>
              </div>
              {promptUpdated ? (
                <p className="mt-1.5 font-sans text-[10px] text-[#00C48C]">Twin updated ✓</p>
              ) : null}
            </div>
          </div>

          <div className="shrink-0 border-t border-[rgba(0,196,140,0.1)] bg-[#0c1014] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#5a6e66]">
                  Schedule:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSchedule((current) =>
                      current === "Afternoon · 1:05 PM Tue"
                        ? "Optimal · 9:14 AM Tue"
                        : current === "Optimal · 9:14 AM Tue"
                          ? "Evening · 6:30 PM Tue"
                          : "Afternoon · 1:05 PM Tue"
                    )
                  }
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#8a9e96]"
                >
                  {schedule}
                  <ChevronDown className="size-3 text-[#5a6e66]" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                className="rounded-none border-[rgba(0,196,140,0.25)] bg-transparent px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9e96] transition-colors duration-[120ms] hover:text-white"
              >
                {regenLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="size-3.5" />
                )}
                Regenerate
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleApprove}
                className={cn(
                  "flex-1 rounded-none py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#080b09] transition-all duration-[120ms]",
                  deployFlash ? "bg-white" : "bg-[var(--meridian-mint)]",
                  "hover:opacity-85"
                )}
              >
                {deployLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : deploySuccess ? (
                  <Check className="size-3.5" />
                ) : (
                  "Approve & Deploy"
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Full-viewport Review All overlay — portaled to body to escape transform containing block */}
      {reviewModeOpen ? createPortal(
        <div
          className={cn(
            "transition-opacity duration-300",
            reviewModeVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: "#080b09",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {approvedCount >= totalReviewCount ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="font-heading text-[44px] italic text-white">
                {totalReviewCount} posts approved.
              </p>
              <p className="mt-2 font-heading text-[28px] italic text-[#00C48C]">
                14 seconds. 4.5 hours saved.
              </p>
              <p className="mt-4 font-mono text-[13px] text-[#5a6e66]">Your twin handles the rest.</p>
              <button
                type="button"
                onClick={closeReviewMode}
                className="mt-8 rounded-none border border-[rgba(0,196,140,0.3)] bg-transparent px-6 py-3 font-sans text-[11px] uppercase tracking-[0.1em] text-[#00C48C] transition-colors duration-[120ms] hover:bg-[rgba(0,196,140,0.06)]"
              >
                ← Return to Dashboard
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              {/* ROW 1 — Top bar */}
              <div
                className="flex items-center justify-between px-10"
                style={{
                  height: 52,
                  flexShrink: 0,
                  borderBottom: "1px solid rgba(0,196,140,0.1)",
                }}
              >
                <button
                  type="button"
                  onClick={closeReviewMode}
                  className="font-sans text-[10px] text-[#5a6e66] transition-colors duration-[120ms] hover:text-[#8a9e96]"
                >
                  ← Exit Review
                </button>
                <div className="text-center">
                  <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#00C48C]">
                    REVIEW QUEUE
                  </p>
                  <p className="font-mono text-[10px] text-[#5a6e66]">
                    {approvedCount} of {totalReviewCount} approved
                  </p>
                </div>
                <p className="font-mono text-[9px] text-[#5a6e66]">⌨ A approve · R regen · S skip</p>
              </div>

              {/* ROW 2 — Progress bar */}
              <div style={{ height: 2, flexShrink: 0, backgroundColor: "rgba(0,196,140,0.1)" }}>
                <div
                  className="h-full bg-[#00C48C]"
                  style={{ width: `${reviewProgress}%`, transition: "width 300ms ease" }}
                />
              </div>

              {/* ROW 3 — Card area */}
              <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                  className={cn(
                    "transition-all",
                    reviewTransition === "idle" && "duration-[250ms] ease-out"
                  )}
                  style={{
                    position: "relative",
                    width: 600,
                    maxHeight: "calc(100vh - 140px)",
                    overflowY: "auto",
                    backgroundColor: "#0c1014",
                    border: "1px solid rgba(0,196,140,0.15)",
                    borderTop: "2px solid #00C48C",
                    padding: 32,
                    transform: reviewTransition === "out-left"
                      ? "translateX(-150%)"
                      : reviewTransition === "in-right"
                        ? "translateX(150%)"
                        : "translateX(0)",
                    opacity: reviewTransition === "idle" ? 1 : 0,
                    transitionDuration: reviewTransition === "in-right" ? "0ms" : "250ms",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-none bg-[rgba(0,196,140,0.1)] px-2 py-[3px] font-sans text-[11px] font-bold text-[#00C48C]">
                      {currentReviewRow.score}
                    </span>
                    <p className="font-sans text-[13px] font-semibold text-white">
                      {currentReviewRow.publication}
                    </p>
                    <p className="font-mono text-[10px] text-[#5a6e66]">· {currentReviewRow.timeAgo}</p>
                  </div>

                  <div className="mt-2">
                    <span className="rounded-none border border-[var(--meridian-mint)] bg-[var(--meridian-mint-glow)] px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--meridian-mint)]">
                      LINKEDIN POST
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-line font-mono text-[12.5px] leading-[1.65] text-[#8a9e96]">
                    {currentReviewText}
                  </p>

                  <p className="mt-2 font-mono text-[10px] text-[#5a6e66]">
                    Est. 1,400-2,200 impressions
                    <span className="px-2">·</span>
                    <span className="text-[#00C48C]">above your avg</span>
                  </p>

                  {/* Sticky action buttons */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#0c1014",
                      borderTop: "1px solid rgba(0,196,140,0.08)",
                      paddingTop: 16,
                      marginTop: 16,
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => openReview(currentReviewRow.id)}
                      className="font-mono text-[10px] text-[#5a6e66] transition-colors duration-[120ms] hover:text-[#8a9e96]"
                    >
                      open in sidebar for detailed edits →
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleReviewSkip}
                        className="font-sans text-[11px] text-[#5a6e66] transition-colors duration-[120ms] hover:text-[#8a9e96]"
                      >
                        S - SKIP →
                      </button>
                      <button
                        type="button"
                        onClick={handleReviewRegen}
                        className="inline-flex items-center gap-2 rounded-none border border-[rgba(0,196,140,0.3)] bg-transparent px-4 py-2 font-sans text-[11px] text-[#8a9e96] transition-colors duration-[120ms] hover:text-white"
                      >
                        {reviewRegenLoading ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          "R - REGENERATE ↺"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleReviewApprove}
                        className="rounded-none bg-[#00C48C] px-6 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#080b09] transition-opacity duration-[120ms] hover:opacity-90"
                      >
                        A - APPROVE ✓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      ) : null}
    </>
  );
}
