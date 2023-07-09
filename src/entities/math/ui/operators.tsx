import { Button } from "../../../shared/ui/button";

export interface OperatorsProps {
  onPress(operator: string): void;
  operationsSet: Set<string>;
}

export const Operators = ({ operationsSet, onPress }: OperatorsProps) => {
  return (
    <>
      {Array.from(operationsSet).map((operator) => (
        <Button
          key={operator}
          size="small"
          label={operator}
          onPress={() => onPress(operator)}
        />
      ))}
    </>
  );
};
Operators.displayName = "Operators";
