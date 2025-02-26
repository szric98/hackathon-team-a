import type { FC } from "react";

import { Card } from "@/renderers/components/atoms/card/Card";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { IconShape } from "@/renderers/components/molecules/icon-shape/IconShape";

export type DataErrorCardProps = {
  title: string;
  description: string;
};
export const DataErrorCard: FC<DataErrorCardProps> = ({ title, description }) => {
  return (
    <Card size="sm" className="max-h-min max-w-sm items-center gap-0 border border-gray-200 p-4 text-center shadow-md">
      <IconShape className="mb-4" color="red" icon="ExclamationIcon" ariaLabel="Metric error icon" />

      <Typography.BodyMedium color="primary" className="mb-3.5">
        {title}
      </Typography.BodyMedium>
      <Typography.Body color="secondary">{description}</Typography.Body>
    </Card>
  );
};
