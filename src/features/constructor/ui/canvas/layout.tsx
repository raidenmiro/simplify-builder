import type { JSX } from "preact/jsx-runtime";

import { cx } from "~/shared/lib/merge.class";

export interface CanvasProps {
  children: JSX.Element;
  className?: string;
}

export function CanvasLayout({ className, children }: CanvasProps) {
  const classes = cx(["h-[448px] w-[245px] transition-opacity", className]);

  return (
    <div className={classes} id="droptarget">
      {children}
    </div>
  );
}
