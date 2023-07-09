import { splitBy } from "../transform/split.by";

export const OPERATORS = new Set(["/", "x", "-", "+"]);
const INVALID_EXPRESSION = void 0;
const BRACKETS_PAIR = { "{": "}", "(": ")", "[": "]" };

export enum Tok {
  Ident,
  Number,
  OpenBr,
  CloseBr,
  Function,
}

export type Token<Value = unknown> = Readonly<{
  value: Value;
  type: Tok;
}>;

type Bracket = keyof typeof BRACKETS_PAIR;

/* char code definition */
function isDigit(code: number) {
  return code >= 0x0030 && code <= 0x0039;
}

function isWhitespace(code: number) {
  return code === 0x0020 || code === 0x0009;
}

function isPlusOrMinus(code: number) {
  return code === 43 || code === 45;
}

function isBracket(code: number) {
  const openedBr = Object.keys(BRACKETS_PAIR);
  return openedBr.some((opBr) => {
    const pairBr = BRACKETS_PAIR[opBr as Bracket];
    return code === pairBr.charCodeAt(0) || code === opBr.charCodeAt(0);
  });
}

/* cast */
function int(v: string) {
  const p = Number.parseFloat(v);
  return isNaN(p) ? 0 : p;
}

/* create token */
function buildNumber(value: string) {
  return { value, type: Tok.Number };
}

/* parser */

/**
 * @example
 * ```js
 * const result = tokenize('5.5 + 5 * 2 - (3 - 1)');
 * ```
 */
export function parse(s: string | string[]) {
  const chars = Array.isArray(s)
    ? s
    : splitBy(s.trim(), { separator: Array.from(OPERATORS) });

  const openedBr: Bracket[] = [];
  const root = { type: "Expression", body: [] };

  let i = 0;
  while (i < s.length) {
    const ch = chars[i++].charCodeAt(0);

    if (isWhitespace(ch)) {
      return INVALID_EXPRESSION;
    }

    if (isPlusOrMinus(ch)) {
      const next = s[i].charCodeAt(0);

      if (!isDigit(next)) {
        return INVALID_EXPRESSION;
      }
    }
  }

  return root;
}
