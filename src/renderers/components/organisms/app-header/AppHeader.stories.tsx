import { getByAnalyticsId } from "@/__tests__/test-utils";

import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { AppHeader, type AppHeaderProps } from "./AppHeader";

const meta = {
  component: AppHeader,
  title: "organisms/AppHeader",
} satisfies Meta<AppHeaderProps>;

type Story = StoryObj<AppHeaderProps>;

export const WorkspaceHeader: Story = {
  args: {
    dataSetName: "Acme Corp",
    viewAllHref: "#",
    onClickDataSetSettings: fn(),
  },
  argTypes: disableStoryArgs("onClickSettings"),
  render: (props) => (
    <div className="max-w-xl">
      <AppHeader {...props} />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Check that the settings button was clicked", async () => {
      await userEvent.click(getByAnalyticsId(canvasElement, "workspace-selector__settings-icon"));
      await waitFor(() => expect(args.onClickDataSetSettings).toHaveBeenCalled());
    });

    await step("Check that the workspace name is displayed", async () => {
      await expect(canvas.getByText(args.dataSetName)).toBeInTheDocument();
    });
  },
};

export default meta;
