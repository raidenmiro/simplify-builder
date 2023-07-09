type PossibleClass =
  | Record<string, boolean>
  | unknown[]
  | undefined
  | number
  | string
  | null;

export function cx(names: PossibleClass) {
  if (typeof names === "string" || typeof names === "number")
    return String(names);

  let out = "";

  if (Array.isArray(names)) {
    for (let i = 0, tmp; i < names.length; i++) {
      if ((tmp = cx(names[i] as unknown[])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (const k in names) {
      if (names[k]) out += (out && " ") + k;
    }
  }

  return out;
}
