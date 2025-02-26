import type { DropdownMenuItem } from "./Dropdown";

const categories = ["Category 1", "Category 2", "Category 3"];

export function generateMenuItems(options: {
  count: number;
  generateRandomCategory?: boolean;
  withIcon?: boolean;
}): DropdownMenuItem[] {
  return Array.from({ length: options.count }, (_, index) => ({
    key: `key-${index + 1}`,
    icon: options.withIcon ? "UserIcon" : undefined,
    label: `Workspace ${index + 1}`,
    dataAnalyticsId: `action-${index + 1}`,
    onClick: () => console.info(`Action ${index + 1}`),
    category: options.generateRandomCategory ? categories[Math.floor(Math.random() * categories.length)] : undefined,
  }));
}
