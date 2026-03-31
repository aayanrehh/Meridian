"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useCountUp(to: number, duration: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(to * easeOutCubic(progress)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, to]);

  return value;
}

export function HeroImpactBanner({ className }: { className?: string }) {
  const followerGain = useCountUp(124, 1200);
  const postsPublished = useCountUp(14, 1000);
  const engagement = (useCountUp(42, 1100) / 10).toFixed(1);

  return (
    <div className={cn(className)}>
      <div className="flex h-[56px] items-center justify-center border-y border-[rgba(0,196,140,0.12)] bg-[linear-gradient(to_right,rgba(0,196,140,0.04),transparent)]">
        <div className="relative flex flex-1 items-center justify-center gap-[10px] px-4">
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-[#00C48C]">+{followerGain}</span>
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-white">followers</span>
          <span className="whitespace-nowrap font-mono text-[10px] text-[#5a6e66]">· added by your twin this month</span>
          <div className="absolute right-0 top-1/2 h-[28px] w-px -translate-y-1/2 bg-[rgba(0,196,140,0.2)]" />
        </div>

        <div className="relative flex flex-1 items-center justify-center gap-[10px] px-4">
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-white">{postsPublished}</span>
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-white">posts published</span>
          <span className="whitespace-nowrap font-mono text-[10px] text-[#5a6e66]">· approved in 3 min total</span>
          <div className="absolute right-0 top-1/2 h-[28px] w-px -translate-y-1/2 bg-[rgba(0,196,140,0.2)]" />
        </div>

        <div className="flex flex-1 items-center justify-center gap-[10px] px-4">
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-[#00C48C]">{engagement}%</span>
          <span className="whitespace-nowrap font-sans text-[15px] font-bold text-white">engagement</span>
          <span className="whitespace-nowrap font-mono text-[10px] text-[#8a9e96]">· +282% above LinkedIn avg</span>
        </div>
      </div>
    </div>
  );
}
