import type {
  DataTableCellFragment,
  DataTableColumn,
  DataTableColumnFragment,
  DataTableRowFragment,
  DataTableSort,
} from "@/__generated__/dashboards-api";

import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Checkbox } from "@/renderers/components/molecules/checkbox/Checkbox";
import { IconShape } from "@/renderers/components/molecules/icon-shape/IconShape";
import { SearchInput } from "@/renderers/components/molecules/inputs/search-input/SearchInput";
import { Link } from "@/renderers/components/molecules/link/Link";
import { Table } from "@/renderers/components/organisms/tables/table-blocks/Table";
import { TableBody } from "@/renderers/components/organisms/tables/table-blocks/body/TableBody";
import { TableBodyRow } from "@/renderers/components/organisms/tables/table-blocks/body/TableBodyRow";
import { TableHeader } from "@/renderers/components/organisms/tables/table-blocks/header/TableHeader";
import { TableHeaderRow } from "@/renderers/components/organisms/tables/table-blocks/header/TableHeaderRow";
import { numberFormatDecimal, numberFormatDecimalForced, numberFormatInt } from "@/utils/number-format";
import { strictGet } from "@/utils/strict-utils";
import { formatDate, formatDateTime, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import {
  type DataTableCellFloat,
  type DataTableCellInt,
  type DataTableCellNumeric,
  type DataTableCellPercentage,
  isDataTableCellBlank,
  isDataTableCellDate,
  isDataTableCellDateTime,
  isDataTableCellDelta,
  isDataTableCellExplore,
  isDataTableCellFloat,
  isDataTableCellInt,
  isDataTableCellLink,
  isDataTableCellNumeric,
  isDataTableCellPercentage,
  isDataTableCellProgressBar,
  isDataTableCellString,
} from "@plandek/pkg-data-table";
import { kebabCase } from "es-toolkit";
import type { FC, PropsWithChildren } from "react";
import { v4 as uuidv4 } from "uuid";
import { DeltaPopover } from "../../popovers/DeltaPopover";
import { TableBodyCell } from "../table-blocks/body/TableBodyCell";
import { TableHeaderCell } from "../table-blocks/header/TableHeaderCell";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableInputContext } from "./DataTableInputContextWrapper";

export const DataTable: FC = () => {
  const { data } = useDataTableContext();
  const { publishEvent } = useDataTableInputContext();
  const { rows } = data;

  return (
    <>
      <div className="mb-6">
        <SearchInput
          className="max-w-sm"
          value={data.search ?? ""}
          onKeyDown={(search) => publishEvent({ type: "SEARCH", payload: { search } })}
          onBlur={(search) => publishEvent({ type: "SEARCH", payload: { search } })}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableHeaderRow>
              <DataTableHeaderCells />
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableBodyRow key={uuidv4()}>
                <DataTableBodyRowCells row={row} />
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

// ************************************************************************************************
// *                                   DATA TABLE HEADER                                          *
// ************************************************************************************************
const DataTableHeaderCells: FC = () => {
  const { data } = useDataTableContext();
  const { columns, sortByColumn, sortOrder } = data;

  const handleSortFn = prepareHandleSortFn();
  const currentSortFor = (column: DataTableColumnFragment) => (column.key === sortByColumn ? sortOrder : column.sort);

  return (
    <>
      <TableHeaderCellForCheckbox />
      {columns.map((column) => {
        const currentSort = currentSortFor(column);
        const sortSymbol = column.key === sortByColumn ? getSortSymbol(currentSort) : null;

        if (!column.visible) return null;

        return (
          <TableHeaderCell key={column.key} onClick={() => handleSortFn(column.key, currentSort)}>
            {column.label} {sortSymbol}
          </TableHeaderCell>
        );
      })}
    </>
  );
};

const TableHeaderCellForCheckbox: FC = () => {
  const { visibility } = useDataTableContext();

  if (!visibility) return null;

  return <TableHeaderCell isCheckboxCell>{visibility.label}</TableHeaderCell>;
};

const prepareHandleSortFn = () => {
  const { publishEvent } = useDataTableInputContext();

  return (columnKey: string, sort: DataTableSort) => {
    if (sort === "ASC") {
      publishEvent({ type: "SORT", payload: { columnKey, order: "DESC" } });
      return;
    }

    if (sort === "DESC") {
      publishEvent({ type: "SORT", payload: { columnKey, order: "ASC" } });
      return;
    }

    publishEvent({ type: "SORT", payload: { columnKey, order: "ASC" } });
  };
};

const getSortSymbol = (sort: DataTableSort) => {
  if (sort === "ASC") return "▲";
  if (sort === "DESC") return "▼";
  return "";
};

// ************************************************************************************************
// *                                   DATA TABLE ROWS                                            *
// ************************************************************************************************
const DataTableBodyRowCells: FC<{ row: DataTableRowFragment }> = ({ row }) => {
  const { data } = useDataTableContext();

  return (
    <>
      <TableBodyCellForCheckbox rowKey={row.key} />
      {data.columns.map((column, index) =>
        column.visible ? (
          <TableBodyCell key={`${kebabCase(row.key)}-${kebabCase(String(column.key))}`}>
            <EvaluateDataTableCell
              rowKey={row.key}
              column={column}
              cell={strictGet(row.cells, index)}
              isLeadingCell={index === 0}
            />
          </TableBodyCell>
        ) : null,
      )}
    </>
  );
};

const NoDataTableCell: FC = () => {
  return (
    <TableBodyCell>
      <IconShape icon="MinusIcon" color="white" ariaLabel="NoData" />
    </TableBodyCell>
  );
};

const TableBodyCellForCheckbox: FC<{ rowKey: string }> = ({ rowKey }) => {
  const { visibility } = useDataTableContext();
  if (!visibility) return null;

  const handleCheck = () => visibility.toggleCheck(rowKey);
  const checked = visibility.checkedKeySet.includes(rowKey);

  return (
    <TableBodyCell>
      <Checkbox id={rowKey} checked={checked} onCheckedChange={handleCheck} />
    </TableBodyCell>
  );
};

type EvaluateDataTableCellProps = {
  rowKey: string;
  column: DataTableColumn;
  cell: DataTableCellFragment;
  isLeadingCell?: boolean;
};

const EvaluateDataTableCell: FC<EvaluateDataTableCellProps> = ({ rowKey, column, cell, isLeadingCell }) => {
  const { onCellExploreClick, onCellDrilldownClick } = useDataTableContext();

  const CellTypography: FC<PropsWithChildren<{ onClick?: VoidFunction; className?: string }>> = ({
    children,
    onClick,
    className,
  }) => {
    return (
      <Typography.Caption
        className={className}
        dataAnalyticsId="data-table__cell"
        color={isLeadingCell ? "primary" : "secondary"}
        onClick={onClick}
      >
        {children}
      </Typography.Caption>
    );
  };

  if (isDataTableCellBlank(cell)) {
    return <NoDataTableCell />;
  }

  if (isDataTableCellString(cell)) {
    if (cell.value) return <CellTypography>{cell.value}</CellTypography>;
    return <NoDataTableCell />;
  }

  if (isDataTableCellProgressBar(cell)) {
    return <>MISSING PROGRESS BAR CELL IMPLEMENTATION</>;
  }

  if (isDataTableCellLink(cell)) {
    if (cell.label)
      return (
        <Link dataAnalyticsId={`data-table__${cell.label}-cell`} link={{ to: cell.href, target: "_blank" }}>
          {cell.label}
        </Link>
      );
    return <NoDataTableCell />;
  }

  if (
    isDataTableCellFloat(cell) ||
    isDataTableCellNumeric(cell) ||
    isDataTableCellInt(cell) ||
    isDataTableCellPercentage(cell)
  ) {
    const value = getNumberFromCellFormatted(cell);
    const drilldownInput = cell.drilldownInput;

    if (drilldownInput && onCellDrilldownClick) {
      return (
        <CellTypography onClick={() => onCellDrilldownClick({ rowKey, column, drilldownInput })}>
          {value}
        </CellTypography>
      );
    }

    return <CellTypography>{getNumberFromCellFormatted(cell)}</CellTypography>;
  }

  if (isDataTableCellDate(cell)) {
    if (cell.valueDate) {
      return <CellTypography>{formatDate(parseDayjsOrError(cell.valueDate))}</CellTypography>;
    }
    return <NoDataTableCell />;
  }

  if (isDataTableCellDateTime(cell)) {
    if (cell.valueDateTime) {
      return <CellTypography>{formatDateTime(parseDayjsOrError(cell.valueDateTime))}</CellTypography>;
    }
    return <NoDataTableCell />;
  }

  if (isDataTableCellDelta(cell)) {
    if (cell.valueDelta) {
      return <DeltaPopover delta={cell.valueDelta} isTableDelta />;
    }
    return <NoDataTableCell />;
  }

  if (isDataTableCellExplore(cell)) {
    const { drilldownInputForExplore, label } = cell;
    return (
      <Typography.CaptionMedium
        color="brand"
        dataAnalyticsId={`data__table__${label}__cell`}
        onClick={() => onCellExploreClick({ rowKey, column, drilldownInput: drilldownInputForExplore })}
      >
        Explore Stages
      </Typography.CaptionMedium>
    );
  }

  const _never: never = cell;
  throw new Error(`Unsupported cell type ${_never}`);
};

function getNumberFromCellFormatted(
  cell: DataTableCellFloat | DataTableCellNumeric | DataTableCellInt | DataTableCellPercentage,
) {
  if (isDataTableCellFloat(cell)) return numberFormatDecimalForced(cell.valueFloat);
  if (isDataTableCellPercentage(cell)) return numberFormatDecimal(cell.valuePercentage);
  if (isDataTableCellInt(cell)) return numberFormatInt(cell.valueInt);
  if (isDataTableCellNumeric(cell)) return cell.valueNumeric; // show without formatting.
  const _never: never = cell;
  throw new Error(`Unsupported cell type ${_never}`);
}
