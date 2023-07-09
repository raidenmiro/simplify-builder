import { Button } from "~/shared/ui/button";

export interface ComputeProps {
  onPress(): void;
}

export function Compute({ onPress }: ComputeProps) {
  return <Button onPress={onPress} size="huge" label="=" highlight />;
}
