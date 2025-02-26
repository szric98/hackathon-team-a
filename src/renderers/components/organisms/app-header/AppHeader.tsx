import type { FC } from "react";
import { Typography } from "../../atoms/typographies/Typography";
import { Button } from "../../molecules/button/Button";
import { Link } from "../../molecules/link/Link";

export type AppHeaderProps = {
  dataSetName: string;
  viewAllHref?: string;
  onClickDataSetSettings?: () => void;
};
export const AppHeader: FC<AppHeaderProps> = (props) => {
  const { dataSetName, viewAllHref, onClickDataSetSettings } = props;

  return (
    <div className="flex max-w-xl items-center gap-2 rounded-lg border border-gray-300 bg-white px-2.5 py-2 dark:bg-gray-800">
      <Button.Icon
        icon="CogIcon"
        color="alternative"
        dataAnalyticsId="workspace-selector__settings-icon"
        ariaLabel="Workspace Settings"
        // TODO: Focus will need to be forced only when we are on the settings page
        // forceFocus={!!viewAllHref}
        onClick={onClickDataSetSettings}
      />
      <div className="flex w-full flex-col">
        <Typography.SubCaption color="secondary">Workspace</Typography.SubCaption>
        <div className="flex w-full justify-between">
          <Typography.Caption className="truncate">{dataSetName}</Typography.Caption>
          {viewAllHref ? (
            <Link
              link={{ to: viewAllHref }}
              typography={{ variant: "CaptionMedium" }}
              dataAnalyticsId="workspace-selector__view-all-link"
            >
              View All
            </Link>
          ) : (
            <Typography.CaptionMedium color="disabled">View All</Typography.CaptionMedium>
          )}
        </div>
      </div>
    </div>
  );
};
