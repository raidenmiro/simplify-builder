/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, reatomMap } from "@reatom/framework";

type ActorId = string;
type DataRef = Record<string, unknown>;

export interface Actor<Data extends DataRef> {
  node: HTMLElement;
  id: ActorId;
  data: Data;
}

export enum DraggableState {
  Dragging = "dragging",
  Cancel = "cancel",
  Idle = "idle",
  End = "end",
}

export const $draggables = reatomMap<ActorId, Actor<any>>();
export const $droppables = reatomMap<ActorId, Actor<any>>();

export const $draggableStatus = atom(DraggableState.Idle, "$draggableStatus");
export const $draggable = atom({}, "$draggable");
export const $droppable = atom({}, "$droppable");

export interface DragOptions<Data extends DataRef> {
  onDragCancel(): void;
  onDragStart(): void;
  onDragMove(): void;
  onDragEnd(): void;
}

/**
 * const draggableInstance = reatomDraggable({
 *   onDragStart() {},
 *   onDragMove() {},
 * }).pipe(withModifiers([snapToGrid]))
 */

export function reatomDraggable<Data extends DataRef>(
  node: HTMLElement,
  options: DragOptions<Data>
) {}
