import { ExecutiveDeploymentQueue } from "@/components/meridian/executive-deployment-queue";

export default function DeploymentQueuePage() {
  return (
    <div className="flex min-h-full flex-col px-4 pb-4 pt-3">
      <ExecutiveDeploymentQueue className="flex-1" />
    </div>
  );
}
