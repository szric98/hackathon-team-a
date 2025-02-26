import { useModalState } from "@/hooks/use-modal-state";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Button } from "@/renderers/components/molecules/button/Button";
import { AreaInput } from "@/renderers/components/molecules/inputs/area-input/AreaInput";
import { TextInput } from "@/renderers/components/molecules/inputs/text-input/TextInput";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  type WithCommonModalProps,
} from "@/renderers/components/molecules/modal/Modal";
import { Toggle } from "@/renderers/components/molecules/toggle/Toggle";
import { type FC, useState } from "react";
import { ConfirmationModal } from "../confirmation-modal/ConfirmationModal";

export type DashboardSettingsModalProps = WithCommonModalProps<{
  initialDashboardName: string;
  initialDashboardDescription?: string;
  locked: boolean;
  lockChangeNotPermitted: boolean;
  onApply: (newLabel: string, newDescription: string, newLockedStatus: boolean) => void;
}>;

export const DashboardSettingsModal: FC<DashboardSettingsModalProps> = ({
  show,
  initialDashboardName,
  initialDashboardDescription = "",
  locked,
  lockChangeNotPermitted,
  onClose,
  onApply,
}) => {
  const [dashboardName, setDashboardName] = useState(initialDashboardName);
  const [dashboardDescription, setDashboardDescription] = useState(initialDashboardDescription);
  const [dashboardLocked, setDashboardLocked] = useState(locked);

  const { isOpen: isConfirmModalOpen, openFn: openConfirmModal, closeFn: closeConfirmModal } = useModalState();

  const handleClose = () => {
    if (
      dashboardName === initialDashboardName &&
      dashboardDescription === initialDashboardDescription &&
      dashboardLocked === locked
    ) {
      onClose();
      return;
    }

    openConfirmModal();
  };

  return (
    <Modal show={show} onClose={handleClose} size="2xl">
      <ModalTitle onClose={handleClose}>Dashboard settings</ModalTitle>

      <ModalBody>
        <div className="flex flex-col gap-6">
          <TextInput
            label="Dashboard name*"
            placeholder="Dashboard name"
            value={dashboardName}
            maxLength={50}
            onChange={setDashboardName}
            helperText={
              <Typography.Caption color="secondary" className="leading-tight">
                Character limit : {dashboardName.length}/50
              </Typography.Caption>
            }
            disabled={locked}
          />

          <AreaInput
            label="Dashboard description"
            input={{
              className: "resize-none",
              placeholder: "Add a description",
              value: dashboardDescription,
              maxLength: 200,
              rows: 3,
              helperText: (
                <Typography.Caption color="secondary" className="leading-tight">
                  Character limit : {dashboardDescription.length}/200
                </Typography.Caption>
              ),
              onChange: (newValue) => setDashboardDescription(newValue),
              disabled: locked,
            }}
          />
          <Toggle
            label="Lock Dashboard"
            helperText="You can lock this dashboard to prevent users from making changes"
            checked={dashboardLocked}
            onCheckedChange={setDashboardLocked}
            disabled={lockChangeNotPermitted}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex w-full justify-end gap-3">
          <Button
            size="sm"
            color="light"
            dataAnalyticsId="dashboard-settings-modal__cancel-button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={dashboardName.length === 0}
            dataAnalyticsId="dashboard-settings-modal__apply-button"
            onClick={() => {
              onApply(dashboardName, dashboardDescription, dashboardLocked);
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </ModalFooter>
      <ConfirmationModal
        show={isConfirmModalOpen}
        message="Changes have been made to this dashboard settings. Are you sure you want to cancel?"
        onClickConfirm={() => {
          setDashboardName(initialDashboardName);
          setDashboardDescription(initialDashboardDescription);
          setDashboardLocked(locked);
          onClose();
        }}
        onClose={closeConfirmModal}
      />
    </Modal>
  );
};
