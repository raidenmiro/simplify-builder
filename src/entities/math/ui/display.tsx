import { withPrevent } from "~/shared/lib/events";
import { useHotkey } from "~/shared/lib/hooks";

export interface DisplayProps {
  expression: string;
  backward?(): void;
}

export const Display = ({ expression, backward }: DisplayProps) => {
  const ref = useHotkey<HTMLInputElement>(() => backward?.(), {
    codes: "Backspace+Delete",
  });

  return (
    <form
      className="h-[52px] w-[232px] rounded bg-gray-100"
      onSubmit={withPrevent(() => {})}
    >
      <label className="sr-only" htmlFor="display">
        Display
      </label>
      <input
        className="h-full w-full rounded bg-transparent px-2 text-end text-4xl font-bold focus:outline-0 focus:ring-2 focus:ring-blue-800"
        value={expression}
        name="display"
        id="display"
        type="text"
        ref={ref}
        readOnly
      />
    </form>
  );
};
Display.displayName = "Display";
