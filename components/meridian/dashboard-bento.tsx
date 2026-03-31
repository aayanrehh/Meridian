import type { CSSProperties } from "react";

import { DigitalTwinIdentityCard } from "@/components/meridian/digital-twin-identity-card";
import { ExecutiveDeploymentQueue } from "@/components/meridian/executive-deployment-queue";
import { GrowthBlueprintCard } from "@/components/meridian/growth-blueprint-card";
import { HeroImpactBanner } from "@/components/meridian/hero-impact-banner";
import { cn } from "@/lib/utils";

export function DashboardBento() {
  return (
    <div className={cn("grid min-h-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-3 px-4 pb-4 pt-3 lg:grid-cols-12")}>
      <div
        className="dashboard-card-reveal lg:col-span-5"
        style={{ "--reveal-delay": "0ms" } as CSSProperties}
      >
        <DigitalTwinIdentityCard />
      </div>
      <div
        className="dashboard-card-reveal lg:col-span-7"
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
      >
        <GrowthBlueprintCard />
      </div>
      <div
        className="dashboard-card-reveal lg:col-span-12"
        style={{ "--reveal-delay": "160ms" } as CSSProperties}
      >
        <HeroImpactBanner />
      </div>
      <div
        className="dashboard-card-reveal lg:col-span-12"
        style={{ "--reveal-delay": "240ms" } as CSSProperties}
      >
        <ExecutiveDeploymentQueue className="h-full" />
      </div>
    </div>
  );
}
