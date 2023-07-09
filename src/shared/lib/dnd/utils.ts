export function setTranslate<T extends HTMLElement>(
  node: T,
  config: { x: number; y: number }
) {
  const { x, y } = config;

  node.style.setProperty("translate", `${Number(x)}px ${Number(y)}px`);
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export const preventBubbles = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const preventDefault = (event: Event) => {
  event.preventDefault();
};

export function stopPropagation(event: Event) {
  event.stopPropagation();
}

export function removeSelection() {
  window.getSelection()?.removeAllRanges();
}

export function getEventCoordinates(event: Event) {
  if (event instanceof TouchEvent) {
    if (event.touches.length > 0) {
      const { clientX: x, clientY: y } = event.touches[0];

      return {
        x,
        y,
      };
    }
    if (event.changedTouches.length > 0) {
      const { clientX: x, clientY: y } = event.changedTouches[0];

      return {
        x,
        y,
      };
    }
  }

  if ("clientX" in event && "clientY" in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return null;
}
