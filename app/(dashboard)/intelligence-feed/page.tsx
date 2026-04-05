import { GrowthBlueprintCard } from "@/components/meridian/growth-blueprint-card";
import { LiveTwinTelemetryCard } from "@/components/meridian/live-twin-telemetry-card";

export default function IntelligenceFeedPage() {
  return (
    <div className="grid min-h-full grid-cols-1 gap-3 px-4 pb-4 pt-3 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <GrowthBlueprintCard className="h-full" />
      </div>
      <div className="lg:col-span-5">
        <LiveTwinTelemetryCard className="h-full" />
      </div>
    </div>
  );
}
