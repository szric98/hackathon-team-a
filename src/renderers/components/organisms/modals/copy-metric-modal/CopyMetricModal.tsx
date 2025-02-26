import type { DashboardKeysInput, DataSet, MetricDashboardsForDataSetTreeQuery } from "@/__generated__/dashboards-api";

import { useModalState } from "@/hooks/use-modal-state";
import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { IconRenderFn } from "@/renderers/components/atoms/icons/IconRenderFn";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Alert } from "@/renderers/components/molecules/alert/Alert";
import { Button } from "@/renderers/components/molecules/button/Button";
import { SelectInput } from "@/renderers/components/molecules/inputs/select-input/SelectInput";
import { Modal, ModalBody, ModalTitle, type WithCommonModalProps } from "@/renderers/components/molecules/modal/Modal";
import type { BaseKeyLabel } from "@/types";
import { isEqual, uniqueId } from "es-toolkit/compat";
import { type FC, useMemo, useState } from "react";
import { ConfirmationModal } from "../confirmation-modal/ConfirmationModal";

type Row = {
  id: string;
  dataSet: { dataSetKey: string; label: string } | null;
  dashboard: { dashboardKey: string; label: string } | null;
};

type ValidRow = {
  [K in keyof Row]: NonNullable<Row[K]>;
};

type DataSetWithDashboards = {
  key: string;
  label: string;
  category: string;
  dashboards: { dashboardKey: string; label: string }[];
};

export type DuplicateDashboardFn = (targetDashboards: DashboardKeysInput[]) => void;

export type CopyMetricModalParams = {
  currentDataSet: Pick<DataSet, "dataSetKey" | "label" | "clientKey">;
  metricDashboardDataSetTree: MetricDashboardsForDataSetTreeQuery["metricDashboardsForDataSetTree"];
  onDuplicate: DuplicateDashboardFn;
};

export type CopyMetricModalProps = WithCommonModalProps<CopyMetricModalParams>;
export const CopyMetricModal: FC<CopyMetricModalProps> = ({
  show,
  currentDataSet,
  metricDashboardDataSetTree,
  onClose,
  onDuplicate,
}) => {
  const { isOpen: showNotice, closeFn: dismissNotice } = useModalState(true);
  const {
    isOpen: confirmationModalOpen,
    closeFn: closeConfirmationModal,
    openFn: openConfirmationModal,
  } = useModalState();

  const { categories, allDataSet } = metricDashboardDataSetTree;

  const dataSetsWithDashboards = [
    ...categories
      .filter((c) => c.dataSetWithDashboardsList.length > 0)
      .flatMap((category) =>
        category.dataSetWithDashboardsList.map(({ dataSet, dashboards }) => ({
          key: dataSet.dataSetKey,
          label: dataSet.label,
          category: category.label,
          dashboards,
        })),
      ),
    {
      key: allDataSet?.dataSet.dataSetKey ?? "",
      label: allDataSet?.dataSet.label ?? "",
      dashboards: allDataSet?.dashboards ?? [],
      category: "",
    },
  ];

  const defaultRow = {
    id: "default",
    dataSet: { dataSetKey: currentDataSet.dataSetKey, label: currentDataSet.label },
    dashboard: null,
  };

  const [rows, setRows] = useState<Row[]>([defaultRow]);
  const isInputValid = rows.every((row) => row.dataSet?.dataSetKey && row.dashboard?.dashboardKey);
  const canAddMoreRows = rows.length < 20;

  const handleDuplicate = () => {
    const validRows = rows.filter((row) => row.dataSet?.dataSetKey && row.dashboard?.dashboardKey) as ValidRow[];

    const targetDashboards = validRows.map((row) => ({
      clientKey: currentDataSet.clientKey,
      dataSetKey: row.dataSet.dataSetKey,
      dashboardKey: row.dashboard.dashboardKey,
    }));

    onDuplicate(targetDashboards);
    onClose();
  };

  const handleAddRow = () => {
    if (!canAddMoreRows) return;
    setRows((prev) => [...prev, { id: uniqueId(), dataSet: null, dashboard: null }]);
  };

  const handleClose = () => {
    const hasInputChanged = !isEqual(rows, [defaultRow]);

    if (hasInputChanged) {
      openConfirmationModal();
      return;
    }

    closeModal();
  };

  const closeModal = () => {
    setRows([defaultRow]);
    onClose();
  };

  return (
    <>
      <Modal show={show} onClose={handleClose} size="2xl">
        <ModalTitle onClose={handleClose}>Copy metric to a different dashboard</ModalTitle>

        <ModalBody>
          <div className="flex flex-col gap-3">
            <div className="flex max-h-[60dvh] flex-col gap-6 overflow-y-auto pr-2 pb-0.5">
              {showNotice && (
                <Alert
                  icon={() => IconRenderFn("InfoIcon")({ className: "fill-brand-800 dark:fill-brand-400 size-4 mr-2" })}
                  onDismiss={dismissNotice}
                  additionalContent={
                    <Typography.Caption color="brandDark">
                      Copying a metric will also copy its settings (filters and breakdowns). If the target workspace or
                      dashboard doesn’t support these, you’ll need to reset them manually by clearing current settings,
                      saving, and reapplying applicable configurations.
                    </Typography.Caption>
                  }
                >
                  <Typography.BodyMedium color="brandDark">Metric Copy Notice</Typography.BodyMedium>
                </Alert>
              )}
              <div className="flex flex-col gap-3">
                {rows.map((input, index) => (
                  <RowInput
                    key={input.id}
                    input={input}
                    index={index}
                    onSelect={setRows}
                    dataSetsWithDashboards={dataSetsWithDashboards}
                  />
                ))}
              </div>
            </div>
            {canAddMoreRows && (
              <div className="grid flex-1 grid-cols-[1.5rem,1fr,1fr] items-center gap-3">
                <div className="placeholder-div" />
                <Button
                  size="sm"
                  color="light"
                  className="w-fit"
                  dataAnalyticsId="copy-metric-modal__add-more-dashboards"
                  onClick={handleAddRow}
                >
                  <Icon icon="PlusIcon" className="mr-2 size-3 fill-gray-800" />
                  Add more dashboards
                </Button>
              </div>
            )}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                {!canAddMoreRows && (
                  <>
                    <Icon icon="InfoIcon" className="size-4 shrink-0 fill-gray-500" />
                    <Typography.Caption color="secondary" className="whitespace-nowrap">
                      You can only copy to 20 dashboards at a time
                    </Typography.Caption>
                  </>
                )}
              </div>
              <div className="flex w-full justify-end gap-3">
                <Button
                  size="sm"
                  color="light"
                  dataAnalyticsId="copy-metric-modal__cancel-button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  dataAnalyticsId="copy-metric-modal__duplicate-button"
                  onClick={handleDuplicate}
                  disabled={!isInputValid}
                >
                  Duplicate Metric
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <ConfirmationModal
        show={confirmationModalOpen}
        message="Are you sure you want to cancel duplicating this metric? Your selected dashboard will remain unchanged."
        onClickConfirm={closeModal}
        onClose={closeConfirmationModal}
      />
    </>
  );
};

type RowInputProps = {
  index: number;
  input: Row;
  onSelect: React.Dispatch<React.SetStateAction<Row[]>>;
  dataSetsWithDashboards: DataSetWithDashboards[];
};

const RowInput: FC<RowInputProps> = ({ index, input, onSelect, dataSetsWithDashboards }) => {
  const filteredDataSets = dataSetsWithDashboards.filter((dataSet) => dataSet.dashboards.length > 0);

  const workspaceOptions = useMemo(
    () => filteredDataSets.map((item) => ({ key: item.key, label: item.label, category: item.category })),
    [filteredDataSets],
  );

  const dashboardOptions =
    dataSetsWithDashboards
      .find((item) => item.key === input.dataSet?.dataSetKey)
      ?.dashboards.map((dashboard) => ({ key: dashboard.dashboardKey, label: dashboard.label })) ?? [];

  const handleChangeDashboard = (dashboard?: BaseKeyLabel) => {
    onSelect((prev) =>
      updateRow(prev, input.id, {
        dashboard: dashboard ? { dashboardKey: dashboard.key, label: dashboard.label } : null,
      }),
    );
  };

  const handleDeleteRow = () => onSelect((prev) => prev.filter((prevInput) => prevInput.id !== input.id));

  return (
    <div key={input.id} className="flex items-center gap-3">
      <div className="grid flex-1 grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3">
        <Typography.BodyMedium className={index === 0 ? "pt-7" : undefined}>{index + 1}#</Typography.BodyMedium>
        <SelectInput
          valueKey={input.dataSet?.dataSetKey}
          label={index === 0 ? "Workspace" : undefined}
          items={workspaceOptions}
          showCategories
          ariaLabel="Workspace dropdown"
          placeholder="Select a workspace"
          onSelect={(item) => {
            onSelect((prev) =>
              updateRow(prev, input.id, {
                dataSet: item ? { dataSetKey: item.key, label: item.label } : null,
                dashboard: null,
              }),
            );
          }}
          dataAnalyticsId="copy-metric-modal__workspace-dropdown"
        />
        <SelectInput
          valueKey={input.dashboard?.dashboardKey}
          label={index === 0 ? "Dashboard" : undefined}
          items={dashboardOptions}
          ariaLabel="Dashboard dropdown"
          disabled={!input.dataSet?.dataSetKey}
          placeholder="Select a dashboard"
          dataAnalyticsId="copy-metric-modal__dashboard-select-input"
          onSelect={handleChangeDashboard}
        />
      </div>
      {index > 0 && (
        <Button.Icon
          icon="TrashIcon"
          ariaLabel="Delete row"
          dataAnalyticsId="copy-metric-modal__delete-row"
          color="alternative"
          onClick={handleDeleteRow}
        />
      )}
    </div>
  );
};

const updateRow = (rows: Row[], id: string, updatedProperties: Partial<Row>) => {
  return rows.map((row) => {
    if (row.id !== id) return row;
    return { ...row, ...updatedProperties };
  });
};
