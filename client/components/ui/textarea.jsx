import { cn } from "@/lib/utils";
import * as React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "resize-none flex bg-transparent caret-white w-full rounded-3xl px-3 min-h-10 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:none focus-visible:none focus-visible:none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
