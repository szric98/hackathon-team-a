import type { FC } from "react";

import { Card } from "../../components/atoms/card/Card";
import { Spinner } from "../../components/atoms/spinner/Spinner";
import { Typography } from "../../components/atoms/typographies/Typography";
import { CenteredContent } from "../../templates/common";

export const LoadingFallbackPage: FC = () => {
  return (
    <CenteredContent>
      <Card highlight size="lg" className="z-10 flex h-48 w-60 justify-center text-center">
        <Spinner size="lg" />
        <Typography.Heading1>Loading...</Typography.Heading1>
      </Card>
    </CenteredContent>
  );
};
