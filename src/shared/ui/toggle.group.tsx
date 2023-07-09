import { cva } from "class-variance-authority";
import { createContext } from "preact";
import type { StateUpdater } from "preact/compat";
import { useContext, useState } from "preact/compat";
import type { JSX } from "preact/jsx-runtime";

import { cx } from "~/shared/lib/merge.class";

interface RadioContext {
  setCurrent: StateUpdater<string>;
  current: string;
}

const RadioContext = createContext<RadioContext | null>(null);

const useRadioContext = () => {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("[toggle.group] not provided Root");
  }

  return context;
};

interface RootProps {
  children: JSX.Element[] | JSX.Element;
  defaultValue: string;
  className?: string;
}

const Root = ({ defaultValue, className, children }: RootProps) => {
  const [current, setCurrent] = useState(defaultValue);

  const classes = cx([
    "flex h-[38px] w-[243px] items-center justify-between bg-gray-100",
    "select-none rounded-md p-0.5 text-sm font-medium",
    className,
  ]);

  return (
    <RadioContext.Provider value={{ setCurrent, current }}>
      <div
        aria-label="switch mode constructor"
        className={classes}
        role="group"
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
};
Root.displayName = "ToggleGroup.Root";

interface ButtonProps {
  children: JSX.Element[] | JSX.Element;
  activeClassName?: string;
  className?: string;
  value: string;
  onPress?(): void;
}

const variantButton = cva(
  "inline-flex items-center gap-2 h-full py-2 px-4 rounded transition-colors",
  {
    variants: {
      highlight: {
        true: "bg-white [&>svg]:stroke-[#5D5FEF]",
      },
    },
    defaultVariants: { highlight: false },
  }
);

const Button = ({
  activeClassName,
  className,
  children,
  onPress,
  value,
}: ButtonProps) => {
  const { setCurrent, current } = useRadioContext();
  const checked = current === value;

  const classes = cx([
    variantButton({ highlight: checked }),
    checked && activeClassName,
    className,
  ]);

  return (
    <button
      role="radio"
      aria-checked={checked}
      className={classes}
      onClick={() => {
        setCurrent(value);
        onPress?.();
      }}
    >
      {children}
    </button>
  );
};
Button.displayName = "ToggleGroup.Button";

export const ToggleGroup = { Button, Root };
