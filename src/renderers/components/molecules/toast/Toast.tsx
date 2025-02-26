import * as RToast from "@radix-ui/react-toast";
import type { FC, JSX } from "react";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";

export type ToastProps = Pick<RToast.ToastProps, "open" | "onOpenChange"> & {
  icon?: JSX.Element;
  description: string;
  showCloseButton?: boolean;
  onDismiss?: VoidFunction;
};

export const Toast: FC<ToastProps> = ({ open, onOpenChange, icon, description, showCloseButton, onDismiss }) => {
  return (
    <RToast.Provider>
      <RToast.Root
        open={open}
        onOpenChange={onOpenChange}
        className="mb-4 flex w-full min-w-64 items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 text-gray-500 shadow-xl outline-none dark:bg-gray-800 dark:text-gray-400"
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">{icon}</div>
          <RToast.Description>
            <Typography.Caption color="secondary">{description}</Typography.Caption>
          </RToast.Description>
        </div>
        {showCloseButton && (
          <RToast.Close onClick={onDismiss}>
            <Icon icon="XOutlineIcon" className="size-3 shrink-0 fill-gray-400" />
          </RToast.Close>
        )}
      </RToast.Root>

      <RToast.Viewport className="-translate-x-1/2 fixed bottom-10 left-1/2 z-[10000] transform" />
    </RToast.Provider>
  );
};
