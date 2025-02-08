import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
