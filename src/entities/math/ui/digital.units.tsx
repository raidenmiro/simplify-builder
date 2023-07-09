import { useMemo } from "preact/hooks";

import { Button } from "~/shared/ui/button";

export interface DigitsProps {
  onPress(digit: string): void;
  palette: string[];
}

export const DigitalUnits = ({ palette, onPress }: DigitsProps) => {
  const containZero = (str: string) => str.includes("0");
  const digits = useMemo(() => palette.concat(","), [palette]);

  return (
    <>
      {digits.map((unit) => (
        <Button
          key={unit}
          size={containZero(unit) ? "large" : "middle"}
          onPress={() => onPress(unit)}
          label={unit}
        />
      ))}
    </>
  );
};
DigitalUnits.displayName = "DigitalUnits";
