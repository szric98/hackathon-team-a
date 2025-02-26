import * as Dialog from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";

type CommonModalProps = {
  show: boolean;
  onClose: () => void;
};

export const MODAL_SIZES = [
  "fit",
  "fit-full",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
] as const;
type ModalSize = (typeof MODAL_SIZES)[number];

export type WithCommonModalProps<T> = T & CommonModalProps;

export type ModalProps = WithCommonModalProps<{
  size: ModalSize;
}>;
export const Modal: FC<PropsWithChildren<ModalProps>> = ({ size, show, onClose, children }) => {
  const contentClassName = modalContentVariants({ size });

  return (
    <Dialog.Root open={show} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-x-0 top-0 z-50 flex h-screen overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 md:inset-0 md:h-full dark:bg-opacity-80" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={twMerge(
            "-translate-x-1/2 -translate-y-1/2 no-drag fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[85vw] flex-col overflow-hidden bg-white focus:outline-none",
            contentClassName,
          )}
          aria-describedby={undefined}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type ModalTitleProps = { onClose: () => void };
export const ModalTitle: FC<PropsWithChildren<ModalTitleProps>> = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-between rounded-t border-b p-6 pb-5 dark:border-gray-600">
      <Dialog.Title>
        {typeof children === "string" ? <Typography.Heading3>{children}</Typography.Heading3> : children}
      </Dialog.Title>
      <Dialog.Close asChild>
        <Icon
          dataAnalyticsId="modal__close-button"
          icon="XOutlineIcon"
          className="size-3 cursor-pointer fill-gray-400"
          onClick={onClose}
          aria-label="Close"
        />
      </Dialog.Close>
    </div>
  );
};

export const ModalBody: FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
  return <div className={twMerge("h-full flex-1 overflow-y-auto p-6", className)}>{children}</div>;
};

export const ModalFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center space-x-2 rounded-b border-gray-200 border-t p-6 dark:border-gray-600">
      {children}
    </div>
  );
};

const modalContentVariants = /*tw:*/ cva("", {
  variants: {
    size: {
      fit: "max-w-max rounded-lg",
      "fit-full": "h-full max-w-[85vw] rounded-lg",
      xs: "max-w-xs rounded-lg",
      sm: "max-w-sm rounded-lg",
      md: "max-w-md rounded-lg",
      lg: "max-w-lg rounded-xl",
      xl: "max-w-xl rounded-xl",
      "2xl": "max-w-2xl rounded-xl",
      "3xl": "max-w-3xl rounded-xl",
      "4xl": "max-w-4xl rounded-xl",
      "5xl": "max-w-5xl rounded-xl",
      "6xl": "max-w-6xl rounded-xl",
      "7xl": "max-w-7xl rounded-xl",
    },
  },
});
