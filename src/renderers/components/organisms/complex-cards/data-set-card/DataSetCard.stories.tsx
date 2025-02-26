import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";

import { DATA_SET_CARD_VARIANTS, DataSetCard, type DataSetCardProps } from "./DataSetCard";

const meta = {
  component: DataSetCard,
  title: "organisms/ComplexCard/DataSetCard",
} satisfies Meta<DataSetCardProps>;

type Story = StoryObj<DataSetCardProps>;

function createStory(variant: "workspace" | "board"): Story {
  return {
    args: {
      title: "Plandek",
      variant: "default",
    },
    argTypes: {
      ...disableStoryArgs("menuItems", "secondaryIcon", "actions", "onClick"),
      variant: {
        control: "select",
        options: DATA_SET_CARD_VARIANTS,
      },
    },
    render: (props) => {
      return (
        <div className="flex max-w-sm flex-col gap-3">
          <DataSetCard
            {...props}
            actions={[
              {
                key: "replace-favorite",
                label: "Replace as favorite",
                onClick: () => console.info("Replace as favorite"),
                icon: "StarIcon",
                dataAnalyticsId: "replace-favorite",
              },
              {
                key: "settings",
                label: `${variant[0]?.toUpperCase()}${variant.slice(1)} settings`,
                onClick: () => console.info(`${variant} settings`),
                icon: "CogIcon",
                dataAnalyticsId: `${variant}-settings`,
              },
            ]}
          />
          <DataSetCard
            {...props}
            actions={[
              {
                key: "add-favorite",
                icon: "StarOutlineIcon",
                label: "Add as favorite",
                onClick: () => console.info("Click favorite"),
                dataAnalyticsId: "add-favorite",
              },
            ]}
          />
          <DataSetCard {...props} />
        </div>
      );
    },
  };
}

export const WorkspaceCard = createStory("workspace");
export const BoardCard = createStory("board");

export default meta;
