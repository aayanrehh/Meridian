"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * MagicUI-like "BorderBeam": a thin animated accent sweep + subtle glow.
 * Use `pace="slow"` for a calmer, premium "thinking" cadence.
 */
export function BorderBeam({
  className,
  children,
  accent = "#00A3FF",
  pace = "default",
}: {
  className?: string;
  children: React.ReactNode;
  accent?: string;
  pace?: "default" | "slow";
}) {
  const slow = pace === "slow";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="relative z-10">{children}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className={cn("beam-glow", slow && "beam-glow--slow")}
          style={
            {
              background: `radial-gradient(720px circle at 14% 0%, ${slow ? `${accent}26` : `${accent}33`}, transparent 58%)`,
            } as React.CSSProperties
          }
        />

        <div
          className={cn("beam-line", slow && "beam-line--slow")}
          style={
            {
              background: `linear-gradient(90deg, transparent, ${accent}${slow ? "99" : "cc"}, transparent)`,
            } as React.CSSProperties
          }
        />
      </div>

      <style jsx>{`
        .beam-glow {
          position: absolute;
          inset: -22%;
          animation: beamBreath 3.2s ease-in-out infinite;
          opacity: 0.82;
        }

        .beam-glow--slow {
          animation: beamBreath 7s ease-in-out infinite;
          opacity: 0.52;
        }

        .beam-line {
          position: absolute;
          top: 0;
          left: -48%;
          height: 1px;
          width: 72%;
          opacity: 0.68;
          transform: rotate(-0.0001deg);
          animation: beamSweep 2.15s ease-in-out infinite;
          filter: drop-shadow(0 0 14px ${accent}55);
        }

        .beam-line--slow {
          animation: beamSweep 6.25s ease-in-out infinite;
          opacity: 0.38;
          filter: drop-shadow(0 0 18px ${accent}33);
        }

        @keyframes beamBreath {
          0% {
            opacity: 0.58;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.025);
          }
          100% {
            opacity: 0.58;
            transform: scale(1);
          }
        }

        @keyframes beamSweep {
          0% {
            transform: translateX(0);
          }
          58% {
            transform: translateX(240%);
          }
          100% {
            transform: translateX(240%);
          }
        }
      `}</style>
    </div>
  );
}
