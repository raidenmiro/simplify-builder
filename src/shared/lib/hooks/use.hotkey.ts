import { useEffect, useMemo, useRef } from "preact/compat";

type CodesWithPlusSeparator = string;

export const useHotkey = <T extends HTMLElement>(
  cb: (evt: KeyboardEvent) => void,
  options: { codes: CodesWithPlusSeparator; capture?: boolean }
) => {
  const { capture = true } = options;

  const ref = useRef<T>(null);
  const normalizedCodes = useMemo(
    () => options.codes.split("+"),
    [options.codes]
  );

  useEffect(() => {
    const listener = (evt: Event) => {
      if (evt instanceof KeyboardEvent && normalizedCodes.includes(evt.key)) {
        cb(evt);
      }
    };

    const container = ref.current ? ref.current : document;

    container.addEventListener("keydown", listener, { capture });
    return () => {
      container.removeEventListener("keydown", listener, { capture });
    };
  }, [capture, cb, normalizedCodes]);

  return ref;
};
