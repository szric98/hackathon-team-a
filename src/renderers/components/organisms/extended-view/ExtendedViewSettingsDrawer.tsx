import type { FC, PropsWithChildren } from "react";
import { Card } from "../../atoms/card/Card";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";

type MetricSettingsDrawerProps = { open?: boolean; onClickClose: () => void };
export const ExtendedViewSettingsDrawer: FC<PropsWithChildren<MetricSettingsDrawerProps>> = ({
  children,
  open,
  onClickClose,
}) => {
  return (
    <Card
      size="lg"
      className={`flex flex-col shadow-lg transition-all duration-300 ease-in-out ${open ? "ml-6 w-80 min-w-80" : "ml-0 w-0 min-w-0 p-0"} overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <Typography.Heading3 color="secondary" className="whitespace-nowrap">
          Metric settings
        </Typography.Heading3>
        <Icon
          icon="XOutlineIcon"
          className="size-3 shrink-0 cursor-pointer fill-gray-500"
          dataAnalyticsId="ev-page__metric-settings-drawer__close-button"
          onClick={onClickClose}
        />
      </div>
      {children}
    </Card>
  );
};
