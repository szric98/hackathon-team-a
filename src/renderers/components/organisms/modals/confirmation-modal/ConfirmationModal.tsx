import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Button } from "@/renderers/components/molecules/button/Button";
import { Modal, ModalBody, type WithCommonModalProps } from "@/renderers/components/molecules/modal/Modal";
import { callInOrder } from "@/utils/fn-utils";
import type { FC } from "react";

export type ConfirmationModalProps = WithCommonModalProps<{
  message: string;
  onClickConfirm: () => void;
}>;

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ show, message, onClose, onClickConfirm }) => {
  return (
    <Modal show={show} size="md" onClose={onClose}>
      <ModalBody>
        <div className="flex flex-col items-center gap-4 text-center">
          <Icon icon="ExclamationIcon" className="size-5 fill-gray-400" />
          <Typography.Body color="secondary">{message}</Typography.Body>
          <div className="flex justify-center gap-4">
            <Button dataAnalyticsId="confirm" color="failure" onClick={callInOrder(onClickConfirm, onClose)} size="xs">
              Yes, I'm sure
            </Button>
            <Button dataAnalyticsId="cancel" color="gray" onClick={onClose} size="xs">
              No
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
