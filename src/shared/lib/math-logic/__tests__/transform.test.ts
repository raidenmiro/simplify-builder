import { infixToPostfix } from "../transform/infix.to.postfix";
import { splitBy } from "../transform/split.by";

it("should be convert infix to postfix correct", () => {
  const expression = splitBy("1 + 1 * 2", { separator: ["+", "*"] });
  const result = infixToPostfix(expression);

  expect(result).toStrictEqual(["1", "1", "2", "*", "+"]);
});

it("should be correct handle unary minus", () => {
  const expression = splitBy("-1", { separator: ["-"] });
  const result = infixToPostfix(expression);

  expect(result).toStrictEqual(["u", "1"]);
});
