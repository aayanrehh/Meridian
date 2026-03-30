"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpenText,
  ClipboardCheck,
  Command,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV = [
  {
    href: "/",
    label: "Command Center",
    icon: Command,
  },
  {
    href: "/approval-studio",
    label: "Approval Studio",
    icon: ClipboardCheck,
  },
  {
    href: "/knowledge-base",
    label: "Knowledge Base",
    icon: BookOpenText,
  },
  {
    href: "/autonomy-settings",
    label: "Autonomy Settings",
    icon: SlidersHorizontal,
  },
];

export function Sidebar({ activeHref = "/" }: { activeHref?: string }) {
  const workspaces = useMemo(
    () => [
      "Jerah R. - Gen-Z Leadership",
      "Assistant Dean - Admissions Insights",
      "VP Strategy - Corporate Leadership Signals",
    ],
    []
  );

  const [workspace, setWorkspace] = useState(workspaces[0] ?? "");

  return (
    <aside
      className={cn(
        "flex flex-col",
        "w-[92px] lg:w-[280px] border-r border-white/10",
        "bg-[#09090b]"
      )}
    >
      <div className="flex h-full flex-col px-3 py-4 lg:px-4">
        {/* Top: Meridian + workspace */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              aria-hidden="true"
            >
              <span className="text-sm font-semibold text-zinc-200">MB</span>
            </div>

            <div className="hidden leading-tight lg:block">
              <div className="text-sm font-semibold tracking-tight text-zinc-50">
                Meridian
              </div>
              <div className="text-xs text-zinc-500">Command Center</div>
            </div>
          </div>

          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between border-white/10 bg-white/0 text-zinc-200 hover:bg-white/5"
                >
                  <span className="truncate">{workspace}</span>
                  <span aria-hidden="true" className="ml-3 h-4 w-4 rounded-sm border border-white/10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {workspaces.map((w) => (
                  <DropdownMenuItem
                    key={w}
                    onSelect={() => setWorkspace(w)}
                    className="cursor-pointer"
                  >
                    {w}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  "border border-transparent",
                  "text-zinc-300 hover:text-zinc-50 hover:bg-white/5",
                  isActive &&
                    "border-white/20 bg-white/5 text-zinc-50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:block whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom profile + sign-out */}
        <div className="mt-auto">
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="font-mono text-xs text-zinc-200">
                  JR
                </AvatarFallback>
              </Avatar>
              <div className="hidden min-w-0 lg:block">
                <div className="truncate text-sm font-medium text-zinc-50">
                  Jerah R.
                </div>
                <div className="truncate text-xs text-zinc-500">
                  Assistant Dean
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-center border-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

