import * as RadixAccordion from "@radix-ui/react-accordion";
import type { FC } from "react";
import type { JSX } from "react/jsx-runtime";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";

type AccordionItem = {
  icon?: AvailableIcons;
  title: string;
  content: JSX.Element | string;
};

export type AccordionProps = {
  items: AccordionItem[];
};

export const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <RadixAccordion.Root
      type="single"
      className="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700"
      collapsible
    >
      {items.map(({ icon, title, content }) => (
        <RadixAccordion.Item key={title} value={title} className="group first:child:rounded-t-lg">
          <RadixAccordion.Trigger className="group flex w-full items-center justify-between p-5 font-medium text-gray-500 group-first:rounded-t-lg data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 data-[state=open]:focus:ring-4 data-[state=open]:focus:ring-gray-200 data-[state=open]:hover:bg-gray-100 dark:text-gray-300 data-[state=open]:dark:bg-gray-800 data-[state=open]:dark:text-white data-[state=open]:dark:focus:ring-gray-800 data-[state=open]:dark:hover:bg-gray-800">
            <div className="flex items-center">
              {icon && <Icon icon={icon} fill="currentColor" className="me-2 size-4 shrink-0" />}
              <p>{title}</p>
            </div>
            <Icon
              icon="ChevronDownIcon"
              aria-hidden="true"
              fill="currentColor"
              className="size-6 shrink-0 group-data-[state=open]:rotate-180"
            />
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className="p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900">
            {content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
