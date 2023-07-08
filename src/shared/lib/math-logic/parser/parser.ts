import { ListNode } from "./list";

export const OPERATORS = new Set(["/", "x", "-", "+"]);

const INVALID_EXPRESSION = void 0;
const BRACKETS_PAIR = { "{": "}", "(": ")", "[": "]" };

export enum Tok {
  Root,
  Ident,
  Number,
  OpenBr,
  CloseBr,
  Function,
}

export type Token<Value = unknown> = Readonly<{
  type: Tok;
  value: Value;
}>;

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
  return code === 40 || code === 41;
}

/* parser */

/**
 * @example
 * ```js
 * const result = tokenize('5.5 + 5 * 2 - (3 - 1)');
 * ```
 */
export function parse(s: string) {
  const chars = s.trim();
  const tokens = new ListNode({ type: Tok.Root, value: [] });

  let i = 0;
  while (i < s.length) {
    const ch = s[i++].charCodeAt(0);

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

  return tokens.next ?? INVALID_EXPRESSION;
}
