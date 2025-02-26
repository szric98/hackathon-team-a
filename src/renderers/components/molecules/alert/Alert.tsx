import { type CustomFlowbiteTheme, Alert as FlowAlert, type AlertProps as FlowAlertProps, theme } from "flowbite-react";
import type { FC } from "react";

export type AlertProps = Pick<FlowAlertProps, "color" | "additionalContent" | "icon" | "children" | "onDismiss">;
export const Alert: FC<AlertProps> = ({ color = "brand", additionalContent, icon, children, onDismiss }) => (
  <FlowAlert theme={alertTheme} color={color} additionalContent={additionalContent} icon={icon} onDismiss={onDismiss}>
    {children}
  </FlowAlert>
);

export const alertTheme: CustomFlowbiteTheme["alert"] = /*tw:*/ {
  base: `${theme.alert.base} gap-1.5`,
  color: {
    brand: "border-brand-400 bg-brand-50 text-brand-800 dark:bg-gray-800 dark:text-brand-400",
    ...theme.alert.color,
    gray: `${theme.alert.color.gray} bg-gray-50`,
  },
};
