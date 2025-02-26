import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { theme } from "flowbite-react";
import { SIZES, Spinner, type SpinnerProps } from "./Spinner";

const meta = {
  component: Spinner,
  title: "atoms/Spinner",
} satisfies Meta<SpinnerProps>;

type Story = StoryObj<SpinnerProps>;

const colors = ["default", ...Object.keys(theme.spinner.color)];

export const Base: Story = {
  argTypes: disableStoryArgs("size", "color"),
  render: () => {
    return (
      <>
        {SIZES.map((size) => (
          <div key={size} className="flex">
            {colors.map((color) => {
              return <Spinner key={color} size={size} color={color} />;
            })}
          </div>
        ))}
      </>
    );
  },
};

export default meta;
