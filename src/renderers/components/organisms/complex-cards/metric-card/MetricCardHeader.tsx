import { compact } from "es-toolkit";
import type { FC } from "react";

import type { CardSizeType, GenericSummaryResponseFragment } from "@/__generated__/dashboards-api";
import { useModalState } from "@/hooks/use-modal-state";
import { CardLargeSizeIcon, CardMediumSizeIcon, CardSmallSizeIcon } from "@/renderers/components/atoms/icons";
import type { CardSizeIcon } from "@/renderers/components/atoms/icons/types";
import { Button } from "@/renderers/components/molecules/button/Button";
import { Dropdown, type DropdownMenuItem } from "@/renderers/components/molecules/dropdown/Dropdown";
import { SummaryValues } from "@/renderers/components/organisms/summary-values/SummaryValues";

import type { OnSummaryClickFn } from "@/charts/chart-render/types";
import type { RenderFn } from "@/types";
import { ConfirmationModal } from "../../modals/confirmation-modal/ConfirmationModal";
import { CopyMetricModal, type CopyMetricModalParams } from "../../modals/copy-metric-modal/CopyMetricModal";
import { SaveHtmlTreeButton } from "../../save-html-tree-buttons/SaveHtmlTreeButton";
import { useMetricCardContext } from "./MetricCardContext";

export const DASHBOARD_CARD_DOWNLOAD_ANALYTICS_ID = "dashboard-card__download";
export const DASHBOARD_CARD_DROPDOWN_ANALYTICS_ID = "dashboard-card__dropdown";

export type MetricCardOptionsDataLoaderProps = {
  children: RenderFn<MoreOptionsProps>;
};

export type MetricCardHeaderProps = {
  MetricCardOptionsDataLoader: FC<MetricCardOptionsDataLoaderProps>;
  generalSummaries: GenericSummaryResponseFragment[];
  summaryClickHandler: OnSummaryClickFn;
};

export const MetricCardHeader: FC<MetricCardHeaderProps> = (props) => {
  const { label } = useMetricCardContext();
  const { MetricCardOptionsDataLoader, generalSummaries, summaryClickHandler } = props;

  return (
    <div
      className="flex items-center justify-between gap-6 border-gray-200 border-b pb-4"
      data-testid={`${label}-dashboard-card-header`}
    >
      <SummaryValues type="DASHBOARD" onClick={summaryClickHandler} generalSummaries={generalSummaries} />

      <div className="flex gap-x-2">
        <SaveHtmlTreeButton
          renderer={
            <Button.Icon
              key="download"
              ariaLabel="Export"
              dataAnalyticsId={DASHBOARD_CARD_DOWNLOAD_ANALYTICS_ID}
              icon="DownloadIcon"
              color="alternative"
            />
          }
        />
        <MetricCardOptionsDataLoader>{(options) => <MoreOptions {...options} />}</MetricCardOptionsDataLoader>
      </div>
    </div>
  );
};

const resizeIconClassname = /*tw:*/ "fill-none stroke-gray-300 w-[53px] h-[22px]";
const RESIZE_ICON_CONFIG: Record<CardSizeType, CardSizeIcon> = {
  // TODO: Change the enum from 'Medium' 'Large' 'Xlarge' to 'Small' 'Medium' 'Large'. Ticket: PLAN-8536
  MEDIUM: CardSmallSizeIcon,
  LARGE: CardMediumSizeIcon,
  XLARGE: CardLargeSizeIcon,
};

type MoreOptionsProps = {
  locked: boolean;
  copyModalParams: CopyMetricModalParams;
  onResize: (newSize: CardSizeType) => void;
  onCopyToThisDashboard: () => void;
  onRemove: () => void;
};

const MoreOptions: FC<MoreOptionsProps> = (props) => {
  const { availableSizes, size } = useMetricCardContext();

  const { copyModalParams: copyModalProps, locked, onCopyToThisDashboard, onRemove, onResize } = props;

  const {
    isOpen: confirmationModalOpen,
    closeFn: closeConfirmationModal,
    openFn: openConfirmationModal,
  } = useModalState();

  const { isOpen: copyModalOpen, closeFn: closeCopyModal, openFn: openCopyModal } = useModalState();

  const resizeCard: DropdownMenuItem | null =
    availableSizes.length <= 1 || locked
      ? null
      : {
          key: "resize",
          label: "Resize",
          icon: "ArrowUpRightDownLeftOutlineIcon",
          iconClassName: "stroke-gray-500",
          menuItems: availableSizes.map((availableSize) => {
            const IconComponent = RESIZE_ICON_CONFIG[availableSize];

            return {
              key: `resize-${availableSize}`,
              iconElement: <IconComponent withCheckmark={availableSize === size} className={resizeIconClassname} />,
              onClick: () => onResize(availableSize),
              dataAnalyticsId: `metric-card__resize__${availableSize}`,
            };
          }),
          dataAnalyticsId: "resize-options-dropdown",
        };

  const duplicateCard: DropdownMenuItem = {
    key: "duplicate",
    label: "Duplicate",
    icon: "CopyIcon",
    menuItems: compact([
      ...(locked
        ? [null]
        : [
            {
              key: "to-this-dashboard",
              label: "To this dashboard",
              onClick: onCopyToThisDashboard,
              dataAnalyticsId: "this-dashboard",
            },
          ]),
      {
        key: "to-different-dashboard",
        label: "To a different dashboard",
        onClick: openCopyModal,
        dataAnalyticsId: "different-dashboard",
      },
    ]),
    dataAnalyticsId: "copy-options-dropdown",
  };

  const deleteCard: DropdownMenuItem = {
    key: "delete",
    label: "Delete",
    icon: "TrashIcon",
    onClick: openConfirmationModal,
    dataAnalyticsId: "dropdown",
  };

  return (
    <>
      <Dropdown
        ariaLabel="More options"
        key="more-options"
        Trigger={
          <Button.Icon
            ariaLabel="More options"
            dataAnalyticsId={DASHBOARD_CARD_DROPDOWN_ANALYTICS_ID}
            icon="DotsVerticalIcon"
            color="alternative"
          />
        }
        menuItems={compact([resizeCard, duplicateCard, deleteCard])}
        dataAnalyticsId={DASHBOARD_CARD_DROPDOWN_ANALYTICS_ID}
      />

      <ConfirmationModal
        show={confirmationModalOpen}
        onClose={closeConfirmationModal}
        message="Are you sure you want to delete this metric?"
        onClickConfirm={onRemove}
      />

      <CopyMetricModal {...copyModalProps} show={copyModalOpen} onClose={closeCopyModal} />
    </>
  );
};
