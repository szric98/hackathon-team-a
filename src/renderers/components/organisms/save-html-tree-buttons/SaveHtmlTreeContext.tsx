import {
  DASHBOARD_CARD_DOWNLOAD_ANALYTICS_ID,
  DASHBOARD_CARD_DROPDOWN_ANALYTICS_ID,
} from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardHeader";
import { type FC, type PropsWithChildren, createContext, use, useRef } from "react";

import html2canvas from "html2canvas-pro";
import type { RefObject } from "react";

type ChangeTreeRefFn = (ref: HTMLElement | null) => void;
type SaveHtmlTreeContextProps = {
  changeTreeRef: ChangeTreeRefFn;
  copy: () => void;
  download: () => void;
};

const SaveHtmlTreeContext = createContext<SaveHtmlTreeContextProps | null>(null);

export const useSaveHtmlTreeContext = () => {
  const ctx = use(SaveHtmlTreeContext);
  if (!ctx) throw new Error(`${SaveHtmlTreeContext.name} does not exists.`);
  return ctx;
};

export const SaveHtmlTreeContextWrapper: FC<PropsWithChildren & { fileName: string }> = ({ fileName, children }) => {
  const treeRef = useRef<HTMLElement | null>(null);

  const changeTreeRef: ChangeTreeRefFn = (ref) => {
    treeRef.current = ref;
  };

  const { copy, download } = useSaveHtmlTree(treeRef, fileName);

  return (
    <SaveHtmlTreeContext.Provider value={{ changeTreeRef, copy, download }}>{children}</SaveHtmlTreeContext.Provider>
  );
};

function useSaveHtmlTree(ref: RefObject<HTMLElement | null>, filename: string | null) {
  const download = () => {
    if (!ref.current) throw new Error("There is no HTML reference to save");
    if (!filename) throw new Error("Missing filename for your image");

    html2canvas(ref.current, {
      onclone: onClone,
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = `${filename}.png`;
      a.click();
    });
  };

  const copy = () => {
    if (!ref.current) throw new Error("There is no HTML reference to save");
    if (!filename) throw new Error("Missing filename for your image");

    return html2canvas(ref.current, {
      onclone: onClone,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (!blob) return;

        navigator.clipboard.write([
          new ClipboardItem(
            Object.defineProperty({}, blob.type, {
              value: blob,
              enumerable: true,
            }),
          ),
        ]);
      });
    });
  };

  return { download, copy };
}

function onClone(document: Document, element: HTMLElement) {
  element.setAttribute("style", "background-color: white; position: relative; box-shadow: none;");

  // Selectors for remove unnecessary elements from the image
  element.querySelector(`[data-analytics-id=${DASHBOARD_CARD_DOWNLOAD_ANALYTICS_ID}]`)?.remove();
  element.querySelector(`[data-analytics-id=${DASHBOARD_CARD_DROPDOWN_ANALYTICS_ID}]`)?.remove();

  const sourceDiv = document.createElement("div");
  sourceDiv.textContent = "Source: Plandek";
  sourceDiv.setAttribute(
    "style",
    `
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
  `,
  );

  element.appendChild(sourceDiv);
}
