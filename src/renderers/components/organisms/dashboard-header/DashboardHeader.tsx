import { cva } from "class-variance-authority";
import { type FC, useRef } from "react";

import { useIsElementVisible } from "@/hooks/use-is-element-visible";
import { useModalState } from "@/hooks/use-modal-state";
import { WithTooltip } from "@/renderers/components/molecules/tooltip/WithTooltip";

import type { LockInfo } from "@/__generated__/dashboards-api";
import { DashboardLockInfo } from "@/renderers/components/molecules/dashboard-lock-info/DashboardLockInfo";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";
import { Button } from "../../molecules/button/Button";
import { DashboardSettingsModal } from "../modals/dashboard-settings-modal/DashboardSettingsModal";
import { DateRangeSelectorWrapper } from "../range-selector/DateRangeSelectorWrapper";

type RichTextObject = {
  type: "paragraph";
  children: {
    text: string;
    __typename?: string | null | undefined;
    bold?: true | undefined;
    italic?: true | undefined;
    underline?: true | undefined;
    strikeThrough?: true | undefined;
  }[];
}[];

export type DashboardHeaderProps = {
  title: string;
  onSaveDashboardSettings: (newLabel: string, newDescription: string) => void;
  description?: string;
  descriptionObject?: RichTextObject;
  lockDashboardMutation: VoidFunction;
  unlockDashboardMutation: VoidFunction;
  lockChangeNotPermitted: boolean;
  lockInfo?: LockInfo | null;
  lockIsLoading: boolean;
};

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  title,
  description,
  descriptionObject,
  onSaveDashboardSettings,
  lockDashboardMutation,
  unlockDashboardMutation,
  lockChangeNotPermitted,
  lockInfo,
  lockIsLoading,
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isFullHeaderVisible = useIsElementVisible(headerRef, { bottom: 24 });

  const { isOpen: isSettingsModalOpen, openFn: openSettingsModal, closeFn: closeSettingsModal } = useModalState();
  const onClickAddMetric = () => console.info("Click add metric");

  const handleApply = (newLabel: string, newDescription: string, newLockedStatus: boolean) => {
    onSaveDashboardSettings(newLabel, newDescription);
    if (newLockedStatus) {
      lockDashboardMutation();
    } else {
      unlockDashboardMutation();
    }
  };

  return (
    <>
      <DashboardHeaderFull
        ref={headerRef}
        title={title}
        description={description}
        descriptionObject={descriptionObject}
        onClickAddMetric={onClickAddMetric}
        openSettingsModal={openSettingsModal}
        DateRangeSelector={DateRangeSelectorWrapper}
        lockDashboardMutation={lockDashboardMutation}
        unlockDashboardMutation={unlockDashboardMutation}
        lockInfo={lockInfo}
        lockChangeNotPermitted={lockChangeNotPermitted}
        lockIsLoading={lockIsLoading}
      />
      {!isFullHeaderVisible && (
        <DashboardHeaderCompact
          title={title}
          onClickAddMetric={onClickAddMetric}
          openSettingsModal={openSettingsModal}
          DateRangeSelector={DateRangeSelectorWrapper}
          lockInfo={lockInfo}
          lockDashboardMutation={lockDashboardMutation}
          unlockDashboardMutation={unlockDashboardMutation}
          lockChangeNotPermitted={lockChangeNotPermitted}
          lockIsLoading={lockIsLoading}
        />
      )}
      <DashboardSettingsModal
        key={JSON.stringify(`${title}-${description}-${lockInfo}`)}
        onApply={handleApply}
        onClose={closeSettingsModal}
        show={isSettingsModalOpen}
        initialDashboardDescription={description}
        initialDashboardName={title}
        locked={!!lockInfo}
        lockChangeNotPermitted={lockChangeNotPermitted}
      />
    </>
  );
};

export type DashboardHeaderFullProps = Pick<
  DashboardHeaderProps,
  | "description"
  | "title"
  | "descriptionObject"
  | "lockDashboardMutation"
  | "unlockDashboardMutation"
  | "lockInfo"
  | "lockChangeNotPermitted"
  | "lockIsLoading"
> & {
  ref: React.RefObject<HTMLDivElement | null>;
  onClickAddMetric: () => void;
  openSettingsModal: () => void;
  DateRangeSelector: FC;
};

export const DashboardHeaderFull: FC<DashboardHeaderFullProps> = ({
  ref,
  title,
  onClickAddMetric,
  openSettingsModal,
  description,
  descriptionObject,
  DateRangeSelector,
  lockDashboardMutation,
  unlockDashboardMutation,
  lockInfo,
  lockChangeNotPermitted,
  lockIsLoading,
}) => {
  return (
    <div ref={ref} className="flex items-center justify-between gap-6">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-6">
          <div className="flex min-w-0 flex-col">
            <WithTooltip
              Component={Typography.Heading2}
              tooltipProps={{ title }}
              componentProps={{ children: title, className: "truncate-clip" }}
            />
          </div>
          <DateRangeSelector />
          <DashboardLockInfo
            locked={!!lockInfo}
            lockDashboardMutation={lockDashboardMutation}
            unlockDashboardMutation={unlockDashboardMutation}
            disabled={lockChangeNotPermitted}
            lockIsLoading={lockIsLoading}
          />
        </div>
        {description && (
          <WithTooltip
            Component={Typography.Caption}
            tooltipProps={{ title: description, placement: "bottom" }}
            componentProps={{
              color: "secondary",
              className: /*tw:*/ "line-clamp-1",
              children: (
                <>
                  {descriptionObject?.map((p) => (
                    <div key={p.children.map((span) => span.text).join("")}>
                      {p.children.map(({ text, bold, italic, underline, strikeThrough }) => (
                        <span key={text} className={descriptionClassName({ bold, italic, underline, strikeThrough })}>
                          {text}
                        </span>
                      ))}
                    </div>
                  ))}
                </>
              ),
            }}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        {!lockInfo ? (
          <Button dataAnalyticsId="dashboard-page-header__add-metric-button" size="sm" onClick={onClickAddMetric}>
            <Icon icon="PlusIcon" className="mr-2 size-3 fill-white" />
            Add Metric
          </Button>
        ) : null}
        <Button.Icon
          ariaLabel="Settings button"
          dataAnalyticsId="dashboard-page-header__settings-button"
          icon="CogIcon"
          color="alternative"
          size="lg"
          onClick={openSettingsModal}
        />
      </div>
    </div>
  );
};

const descriptionClassName = /*tw:*/ cva("", {
  variants: {
    bold: {
      true: "font-bold",
      false: "",
    },
    italic: {
      true: "italic",
      false: "",
    },
    underline: {
      true: "underline",
      false: "",
    },
    strikeThrough: {
      true: "line-through",
      false: "",
    },
  },
});

export type DashboardHeaderCompactProps = Pick<
  DashboardHeaderProps,
  | "title"
  | "lockInfo"
  | "lockDashboardMutation"
  | "unlockDashboardMutation"
  | "lockChangeNotPermitted"
  | "lockIsLoading"
> & {
  onClickAddMetric: () => void;
  openSettingsModal: () => void;
  DateRangeSelector: FC;
};

export const DashboardHeaderCompact: FC<DashboardHeaderCompactProps> = ({
  title,
  lockInfo,
  lockChangeNotPermitted,
  lockIsLoading,
  lockDashboardMutation,
  unlockDashboardMutation,
  onClickAddMetric,
  openSettingsModal,
  DateRangeSelector,
}) => {
  return (
    <div className="sticky top-5 z-50 flex w-full justify-center">
      <div className="flex w-full max-w-4xl items-center justify-between gap-6 rounded-full border border-gray-100 bg-gray-50 px-5 py-2 shadow-lg">
        <div className="flex min-w-0 items-center gap-6">
          <div className="flex min-w-0 flex-1 flex-col">
            <WithTooltip
              Component={Typography.Heading3}
              tooltipProps={{ title }}
              componentProps={{ children: title, className: "truncate-clip" }}
            />
          </div>
          <DateRangeSelector />
          <DashboardLockInfo
            locked={!!lockInfo}
            lockDashboardMutation={lockDashboardMutation}
            unlockDashboardMutation={unlockDashboardMutation}
            disabled={lockChangeNotPermitted}
            lockIsLoading={lockIsLoading}
          />
        </div>
        <div className="flex gap-3">
          {!lockInfo ? (
            <Button.Icon
              ariaLabel="Add metric button"
              dataAnalyticsId="dashboard-page-header__add-metric-button"
              icon="PlusIcon"
              onClick={onClickAddMetric}
            />
          ) : null}
          <Button.Icon
            ariaLabel="Settings button"
            dataAnalyticsId="dashboard-page-header__settings-button"
            icon="CogIcon"
            color="alternative"
            onClick={openSettingsModal}
          />
        </div>
      </div>
    </div>
  );
};
