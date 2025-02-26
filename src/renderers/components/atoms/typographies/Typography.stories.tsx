import { disableStoryArgs } from "@/utils/disable-story-args";
import { strictGet } from "@/utils/strict-utils";
import type { Meta, StoryObj } from "@storybook/react";
import type { TypographyProps } from "./Typography";
import { Typography } from "./Typography";
import { COLOR_VALUES, type Variant } from "./config";

const meta = {
  title: "atoms/Typography",
} satisfies Meta<TypographyProps>;

type Story = StoryObj<TypographyProps & { variant: Variant }>;

function createStory(variant: Variant): Story {
  return {
    args: { color: "primary" },
    argTypes: {
      ...disableStoryArgs("variant"),
      color: {
        control: "select",
        options: COLOR_VALUES,
      },
    },
    render: ({ color }) => {
      const TypographyVariant = strictGet(Typography, variant);

      return (
        <TypographyVariant color={color}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TypographyVariant>
      );
    },
  };
}

export const Heading1 = createStory("Heading1");
export const Heading2 = createStory("Heading2");
export const Heading3 = createStory("Heading3");
export const Body = createStory("Body");
export const BodyMedium = createStory("BodyMedium");
export const BodyBold = createStory("BodyBold");
export const Caption = createStory("Caption");
export const CaptionMedium = createStory("CaptionMedium");
export const CaptionBold = createStory("CaptionBold");
export const SubCaption = createStory("SubCaption");
export const SubCaptionMedium = createStory("SubCaptionMedium");
export const SubCaptionBold = createStory("SubCaptionBold");

export default meta;
