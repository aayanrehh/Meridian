import { DigitalTwinIdentityCard } from "@/components/meridian/digital-twin-identity-card";
import { ExecutiveDeploymentQueue } from "@/components/meridian/executive-deployment-queue";
import { GrowthBlueprintCard } from "@/components/meridian/growth-blueprint-card";
import { cn } from "@/lib/utils";

export function DashboardBento() {
  return (
    <div
      className={cn("grid grid-cols-1 gap-6 p-8 lg:grid-cols-12")}
    >
      <DigitalTwinIdentityCard className="lg:col-span-4" />
      <GrowthBlueprintCard className="lg:col-span-8" />
      <ExecutiveDeploymentQueue className="lg:col-span-12" />
    </div>
  );
}
