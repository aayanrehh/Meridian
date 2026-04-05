import { DigitalTwinIdentityCard } from "@/components/meridian/digital-twin-identity-card";

export default function VoiceCalibrationPage() {
  return (
    <div className="flex min-h-full flex-col gap-3 px-4 pb-4 pt-3">
      <div className="mb-1">
        <h1 className="font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
          Voice Calibration
        </h1>
        <p className="mt-0.5 font-mono text-[11px] text-[#5a6e66]">
          Your twin's tone, thesis, and content pillars — the engine behind every draft.
        </p>
      </div>
      <div className="max-w-md">
        <DigitalTwinIdentityCard />
      </div>
    </div>
  );
}
