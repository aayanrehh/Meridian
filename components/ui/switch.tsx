"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border border-white/15 bg-white/5 outline-none transition-colors",
      "focus-visible:ring-1 focus-visible:ring-[#00A3FF]/60",
      "data-[state=checked]:border-[#00A3FF]/50 data-[state=checked]:bg-[#00A3FF]/15",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full bg-zinc-200 shadow-sm transition-transform",
        "data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-[#00A3FF]",
        "data-[disabled]:bg-zinc-300"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

