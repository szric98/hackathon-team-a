import type { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import { arrayMoveImmutable } from "array-move";

export function moveActiveItemInListImmutable<T>(input: {
  items: T[];
  idFor: (x: T) => string;
  activeId: UniqueIdentifier;
  overId: UniqueIdentifier;
}): T[] {
  const oldIndex = input.items.findIndex((x) => input.idFor(x) === input.activeId);
  const newIndex = input.items.findIndex((x) => input.idFor(x) === input.overId);

  return arrayMoveImmutable(input.items, oldIndex, newIndex);
}
