"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * MagicUI-like "BorderBeam": a thin animated accent sweep + subtle glow.
 * Intentionally minimal to avoid "AI slop" aesthetics.
 */
export function BorderBeam({
  className,
  children,
  accent = "#00A3FF",
}: {
  className?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="relative z-10">{children}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Breathing radial glow */}
        <div
          className="beam-glow"
          style={
            {
              background: `radial-gradient(700px circle at 15% 0%, ${accent}33, transparent 55%)`,
            } as React.CSSProperties
          }
        />

        {/* Sweeping 1px beam */}
        <div
          className="beam-line"
          style={
            {
              background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)`,
            } as React.CSSProperties
          }
        />
      </div>

      <style jsx>{`
        .beam-glow {
          position: absolute;
          inset: -20%;
          animation: beamBreath 3.2s ease-in-out infinite;
          opacity: 0.85;
        }

        .beam-line {
          position: absolute;
          top: 0;
          left: -40%;
          height: 1px;
          width: 60%;
          opacity: 0.7;
          transform: rotate(-0.0001deg);
          animation: beamSweep 2.1s ease-in-out infinite;
          filter: drop-shadow(0 0 14px ${accent}55);
        }

        @keyframes beamBreath {
          0% {
            opacity: 0.65;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0.65;
            transform: scale(1);
          }
        }

        @keyframes beamSweep {
          0% {
            transform: translateX(0);
          }
          60% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}

