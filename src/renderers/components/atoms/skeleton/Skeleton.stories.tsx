import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, type SkeletonProps } from "./Skeleton";

const meta = {
  component: Skeleton,
  title: "atoms/Skeleton",
  decorators: StorybookCenteredLayout,
} satisfies Meta<SkeletonProps>;

type Story = StoryObj<SkeletonProps>;

export const Base: Story = {
  argTypes: disableStoryArgs("className"),
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton />
      <Skeleton className="h-5 w-60" />
      <Skeleton className="h-10 w-96 rounded-md" />
    </div>
  ),
};

export default meta;
