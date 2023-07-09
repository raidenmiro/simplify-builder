import type { HTMLAttributes } from "preact/compat";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact/jsx-runtime";

import { cx } from "../lib/merge.class";

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[] | JSX.Element;
}

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...attr }, forwardedRef) => {
    return (
      <div
        className={cx([className, "box-border rounded p-1 shadow-md"])}
        ref={forwardedRef}
        {...attr}
      >
        {children}
      </div>
    );
  }
);

View.displayName = "Shared.View";

export { type ViewProps, View };
