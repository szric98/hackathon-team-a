import type { FC, ReactNode } from "react";
import { Dropdown } from "../../molecules/dropdown/Dropdown";
import { useSaveHtmlTreeContext } from "./SaveHtmlTreeContext";

type SaveHtmlTreeButtonProps = {
  renderer: ReactNode;
};
export const SaveHtmlTreeButton: FC<SaveHtmlTreeButtonProps> = ({ renderer }) => {
  const { copy, download } = useSaveHtmlTreeContext();

  return (
    <Dropdown
      key="download-button"
      ariaLabel="Dashboard Card"
      dataAnalyticsId="dashboard-card__download"
      Trigger={renderer}
      menuItems={[
        {
          key: "copy-to-clipboard",
          label: "Copy to clipboard",
          icon: "ClipboardIcon",
          iconClassName: "stroke-gray-500",
          onClick: copy,
          dataAnalyticsId: "copy-to-clipboard",
        },
        {
          key: "download-png",
          label: "Download PNG",
          icon: "ImageIcon",
          onClick: download,
          dataAnalyticsId: "download-png",
        },
      ]}
    />
  );
};
