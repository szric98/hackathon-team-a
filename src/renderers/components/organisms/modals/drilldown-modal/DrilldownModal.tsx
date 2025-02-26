import type { DrilldownForMetricCardResponseFragment } from "@/__generated__/dashboards-api";
import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { Skeleton } from "@/renderers/components/atoms/skeleton/Skeleton";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Breadcrumb } from "@/renderers/components/molecules/breadcrumb/Breadcrumb";
import { Button } from "@/renderers/components/molecules/button/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  type WithCommonModalProps,
} from "@/renderers/components/molecules/modal/Modal";
import type { RenderFn } from "@/types";
import { type FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { v4 } from "uuid";
import { DataErrorCard } from "../../complex-cards/data-error-card/DataErrorCard";
import { DataTable } from "../../tables/data-table/DataTable";
import { DataTableContextWrapper, type OnCellExploreClick } from "../../tables/data-table/DataTableContext";
import { useDataTableInputContext } from "../../tables/data-table/DataTableInputContextWrapper";
import { DataTablePagination } from "../../tables/data-table/DataTablePagination";

type DrilldownDataLoaderResult = {
  mainData: DrilldownForMetricCardResponseFragment;
  exploreData: DrilldownForMetricCardResponseFragment | null;
};

export type DrilldownDataLoaderProps = {
  children: RenderFn<DrilldownDataLoaderResult>;
};
export type DrilldownModalProps = WithCommonModalProps<{
  onExplore: OnCellExploreClick;
  resetItemDrilldownInput: VoidFunction;
  DrilldownDataLoader: FC<DrilldownDataLoaderProps>;
}>;

export const DrilldownModal: FC<DrilldownModalProps> = (props) => {
  const { show, onClose, onExplore, resetItemDrilldownInput, DrilldownDataLoader } = props;

  return (
    <Modal show={show} onClose={onClose} size="fit-full">
      <ErrorBoundary fallback={<DrilldownModalError />}>
        <Suspense fallback={<DrilldownModalLoadingSkeleton onClose={onClose} />}>
          <DrilldownDataLoader>
            {(result) => {
              const { mainData, exploreData } = result;
              const tableData = exploreData?.dataTable ?? mainData.dataTable;

              return (
                <DataTableContextWrapper data={tableData} onCellExploreClick={onExplore} visibility={null}>
                  <ModalTitle onClose={onClose}>
                    <DrilldownTitle {...result} resetItemDrilldownInput={resetItemDrilldownInput} />
                  </ModalTitle>
                  <ModalBody className="pb-0">
                    <DataTable />
                  </ModalBody>
                  <ModalFooter>
                    <DataTablePagination />
                  </ModalFooter>
                </DataTableContextWrapper>
              );
            }}
          </DrilldownDataLoader>
        </Suspense>
      </ErrorBoundary>
    </Modal>
  );
};

const DrilldownTitle: FC<DrilldownDataLoaderResult & { resetItemDrilldownInput: VoidFunction }> = (props) => {
  const { mainData, exploreData, resetItemDrilldownInput } = props;
  const { title, date } = parseTabLabel(mainData.tabLabel);

  return (
    <div className="mr-20">
      <div className="flex items-center gap-x-4">
        <Typography.Heading2>{title}</Typography.Heading2>
        <Typography.CaptionMedium color="secondary">
          {mainData.dataTable.totalRowsUnfiltered} {mainData.dataTable.titleSuffix}
        </Typography.CaptionMedium>

        <Button dataAnalyticsId="disabled" color="alternative" disabled>
          <Icon icon="CalendarDayIcon" className="mr-2 size-3 fill-gray-500" />
          {date}
        </Button>
      </div>
      {exploreData && (
        <div className="mt-4">
          <Breadcrumb
            icon="ChartLineUpIcon"
            items={[
              { itemLabel: mainData.tabLabel, onClick: resetItemDrilldownInput },
              { itemLabel: exploreData.tabLabel },
            ]}
          />
        </div>
      )}
    </div>
  );
};

const DrilldownModalLoadingSkeleton: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { dataTableInput } = useDataTableInputContext();
  const { pageSize } = dataTableInput;

  const RowSkeleton: FC = () => (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-2 w-28 rounded" />
      <Skeleton className="h-2 w-24 rounded" />
    </div>
  );

  return (
    <>
      <ModalTitle onClose={onClose}>
        <RowSkeleton />
      </ModalTitle>
      <ModalBody>
        <div className="flex flex-1 justify-between py-4">
          <Skeleton className="h-10 w-[384px] rounded" />
          <Skeleton className="h-10 w-36 rounded" />
        </div>
        {Array.from({ length: pageSize }).map(() => (
          <div key={v4()} className="flex flex-1 justify-between border-gray-200 border-b py-5">
            <RowSkeleton />
            <Skeleton className="h-1 w-4" />
          </div>
        ))}

        <div className="flex flex-1 justify-between pt-5">
          <RowSkeleton />
          <Skeleton className="h-1 w-4" />
        </div>
      </ModalBody>

      <ModalFooter>
        <Skeleton className="h-6 w-28 py-4" />
      </ModalFooter>
    </>
  );
};

const DrilldownModalError: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <DataErrorCard title="Something went wrong with this metric." description="Please contact support" />
    </div>
  );
};

const parseTabLabel = (tabLabel: string) => {
  const lastColumnIndex = tabLabel.lastIndexOf(":");
  return { title: tabLabel.slice(0, lastColumnIndex), date: tabLabel.slice(lastColumnIndex + 1) };
};
