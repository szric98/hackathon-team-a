import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC, PropsWithChildren } from "react";
import { useCallback } from "react";

import { usePreventDragElements } from "@/hooks/use-prevent-drag-elements";

import { Card } from "@/renderers/components/atoms/card/Card";
import { useSaveHtmlTreeContext } from "@/renderers/components/organisms/save-html-tree-buttons/SaveHtmlTreeContext";
import { useMetricCardContext } from "./MetricCardContext";

type MetricCardContainerProps = { className: string };
export const MetricCardContainer: FC<PropsWithChildren<MetricCardContainerProps>> = (props) => {
  const { children, className } = props;

  const { key } = useMetricCardContext();
  const ctx = useSaveHtmlTreeContext();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: key });

  const modifiedListeners = usePreventDragElements(listeners);
  const optimizedReferenceSetter = useCallback((node: HTMLDivElement | null) => setNodeRef(node), [setNodeRef]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 30 : "auto",
    cursor: isDragging ? "grabbing" : "default",
  };
  return (
    <Card
      size="lg"
      ref={(ref) => {
        optimizedReferenceSetter(ref);
        ctx.changeTreeRef(ref);
      }}
      style={style}
      className={className}
      attributes={attributes}
      listeners={modifiedListeners}
    >
      {children}
    </Card>
  );
};
