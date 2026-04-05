import { GrowthBlueprintCard } from "@/components/meridian/growth-blueprint-card";
import { GrowthTrajectoryChart } from "@/components/meridian/growth-trajectory-chart";
import { HeroImpactBanner } from "@/components/meridian/hero-impact-banner";

export default function GrowthOverviewPage() {
  return (
    <div className="flex min-h-full flex-col gap-3 px-4 pb-4 pt-3">
      <HeroImpactBanner />
      <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <GrowthTrajectoryChart className="h-full" />
        </div>
        <div className="lg:col-span-5">
          <GrowthBlueprintCard className="h-full" />
        </div>
      </div>
    </div>
  );
}
