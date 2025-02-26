import { Typography } from "../../atoms/typographies/Typography";
import type { Step } from "./Stepper";

export const MOCK_STEPS: Step[] = [
  {
    title: "1. We do something",
    description: "This is the first step",
    icon: {
      name: "AdminIcon",
      iconAriaLabel: "Admin icon",
      color: "green",
    },
  },
  {
    title: "2. We do something else",
    description: "This is the second step",
    icon: {
      name: "ChartIcon",
      iconAriaLabel: "Admin icon",
    },
  },
  {
    title: "3. We do something more",
    description: (
      <>
        <Typography.Body color="secondary">This is the third step</Typography.Body>
        <Typography.Caption color="disabled">Here is a more customized step description</Typography.Caption>
      </>
    ),
    icon: {
      name: "EpicsIcon",
      iconAriaLabel: "Admin icon",
      color: "red",
    },
  },
  {
    title: "4. We do something even more",
    description: "This is the fourth step",
    icon: {
      name: "UserIcon",
      iconAriaLabel: "Admin icon",
    },
  },
];
