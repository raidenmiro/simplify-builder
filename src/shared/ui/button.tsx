import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "preact/compat";

import { cx } from "~/shared/lib/merge.class";

const classes = cva(
  [
    "text-md font-medium select-none",
    "inline-flex items-center justify-center",
    "border rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none active:border-blue-800",
  ],
  {
    variants: {
      size: {
        large: "w-[152px] h-12",
        middle: "w-[72px] h-12",
        huge: "w-[232px] h-16",
        small: "w-12 h-12",
      },
      highlight: {
        true: "text-white bg-blue-900",
        false: "bg-white",
      },
    },
    defaultVariants: { highlight: false, size: "small" },
  }
);

interface ButtonProps extends VariantProps<typeof classes> {
  label: string | number;
  className?: string;
  onPress?(): void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ highlight, className, onPress, label, size }, ref) => {
    return (
      <button
        className={cx([className, classes({ highlight, size })])}
        onClick={onPress}
        ref={ref}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = "Calculator.Button";

export { type ButtonProps, Button };
