"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

export function MeridianSidebar() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-black"
      )}
    >
      <div className="flex min-h-screen flex-col px-4 py-8">
        <p className="text-[15px] font-semibold leading-snug tracking-tight text-white">
          Meridian <span className="font-normal text-zinc-500">//</span>{" "}
          <span className="font-medium text-zinc-300">Twin Engine</span>
        </p>

        <nav className="mt-12 flex flex-1 flex-col gap-1" aria-label="Primary">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
              home
                ? "border-zinc-700 bg-zinc-900/90 text-white"
                : "border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950 hover:text-white"
            )}
          >
            <LayoutDashboard className="size-4 shrink-0 text-zinc-500" />
            <span className="font-medium">Executive overview</span>
          </Link>
        </nav>

        <div className="mt-auto border-t border-zinc-800 pt-5">
          <p className="text-sm font-semibold text-white">Jerah Reeves</p>
          <p className="mt-1 text-xs text-zinc-400">Level Up Gen-Z</p>
        </div>
      </div>
    </aside>
  );
}
