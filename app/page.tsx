import { BentoGrid } from "@/components/command-center/BentoGrid";
import { Sidebar } from "@/components/command-center/Sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <Sidebar activeHref="/" />

        <main className="flex-1 p-4 sm:p-6">
          {/* Mobile context header (sidebar labels are hidden on small) */}
          <div className="mb-4 flex items-end justify-between gap-3 lg:hidden">
            <div className="min-w-0">
              <div className="text-xs text-zinc-500">Meridian</div>
              <div className="truncate text-sm font-medium text-zinc-50">
                Command Center
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Jerah R. - Gen-Z Leadership
              </div>
            </div>
          </div>

          <BentoGrid />
        </main>
      </div>
    </div>
  );
}
