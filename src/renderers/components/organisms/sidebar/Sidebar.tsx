import { cva } from "class-variance-authority";
import { size } from "es-toolkit/compat";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  DarkThemeToggle,
  Sidebar as FlowSidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
  theme,
} from "flowbite-react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { WithTooltip } from "@/renderers/components/molecules/tooltip/WithTooltip";

import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";
import { Link } from "../../molecules/link/Link";
import type { SidebarItemType, SidebarType } from "./schema";
import { isSidebarItemCollapsible, isSidebarItemSimple } from "./schema";

// TODO: This component became in-reversibly messy due to Flowbite shit react implementation...
// We need to create the whole Sidebar from scratch. Ticket: PLAN-8537
export const Sidebar: FC<SidebarType> = ({ hidden, logo, items }) => {
  const groupedItems = groupSidebarItemsByGroupKey(items);

  return (
    <aside hidden={hidden} id="sidenav-container">
      <FlowSidebar theme={sidebarTheme} className="dark z-50">
        {logo && (
          <SidebarLogo href={logo.href} img={logo.img} imgAlt={logo.imgAlt} data-analytics-id={logo.dataAnalyticsId} />
        )}
        <SidebarItems>
          {Object.entries(groupedItems).map(([groupKey, items]) => (
            <SidebarItemGroup
              key={groupKey}
              className={groupKey === "dashboards" ? "min-h-0" : undefined}
              id={groupKey === "dashboards" ? "sidebar-dashboards-collapse" : undefined}
            >
              {items.map((item) => {
                if (isSidebarItemCollapsible(item)) {
                  const isDisabled = size(item.children) === 0;
                  const sidebarCollapseClassName = sidebarItemVariant({
                    disabled: isDisabled,
                    className: item.extraClasses,
                  });

                  return (
                    <SidebarCollapse
                      key={JSON.stringify(item.label + isDisabled)}
                      icon={item.Icon}
                      className={sidebarCollapseClassName}
                      label={item.label}
                      data-analytics-id={item.dataAnalyticsId}
                      disabled={isDisabled}
                    >
                      {item.children.map((child) => {
                        const { label, onClick, Icon, active, extraClasses, dataAnalyticsId } = child;
                        const sidebarItemClassName = sidebarItemVariant({ disabled: !onClick });

                        return (
                          <WithTooltip
                            key={label}
                            Component={SidebarItem}
                            tooltipProps={{ title: label, placement: "right" }}
                            componentProps={{
                              onClick,
                              icon: Icon,
                              active,
                              className: twMerge(sidebarItemClassName, extraClasses, "font-normal"),
                              "data-analytics-id": dataAnalyticsId,
                              children: label,
                            }}
                          />
                        );
                      })}
                    </SidebarCollapse>
                  );
                }

                if (isSidebarItemSimple(item)) {
                  const sidebarItemClassName = sidebarItemVariant({ disabled: !item.onClick });

                  return (
                    <SidebarItem
                      onClick={item.onClick}
                      className={sidebarItemClassName}
                      key={item.label}
                      icon={item.Icon}
                      active={item.active}
                      data-analytics-id={item.dataAnalyticsId}
                    >
                      {item.label}
                    </SidebarItem>
                  );
                }

                const _never = item;
                throw new Error(`Unexpected sidebar item: ${JSON.stringify(_never)}`);
              })}
            </SidebarItemGroup>
          ))}
        </SidebarItems>
        <div className="flex items-center justify-center gap-1.5 pt-6">
          <Icon icon="CopyrightIcon" className="size-4 fill-gray-400" />
          {/* !text-gray-400 is required since the sidebar is in dark mode so it forces the dark text color */}
          <Typography.SubCaption color="secondary" className="!text-gray-400">
            2025 Plandek
          </Typography.SubCaption>
          <div className="h-full w-px bg-gray-600" />
          <Link
            typography={{ variant: "SubCaptionMedium", color: "secondary" }}
            dataAnalyticsId="sidebar__privacy-policy-link"
            link={{
              to: "https://plandek.com/privacy-policy/",
              target: "_blank",
              // !text-gray-400 is required since the sidebar is in dark mode so it forces the dark text color
              className: "underline !text-gray-400",
            }}
          >
            Privacy Policy
          </Link>
        </div>
        {/* TODO: Worry about CTA when there is anything to promo. (Try to use the commented component below)... */}
        {/* {cta && !hideBetaCta && <SidebarCTA {...cta} onClose={() => persistentStore.setItem("hideBetaCta", true)} />} */}
      </FlowSidebar>

      <DarkThemeToggle data-analytics-id="sidebar__dark-theme-toggle" className="absolute top-2 left-52" />
    </aside>
  );
};

const sidebarItemVariant = /*tw:*/ cva("", {
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "cursor-pointer",
    },
  },
});

// ( STAKEHOLDERS DECISION ) => Sidebar will be the only component thats using some kind of hybrid theme of CTA, we can't make this reusable otherwise we breaking rule of design consistency
// I decided to copy paste the source code of badge component (from flowbite, not flowbite-react) and modified it to match with figma design
// const SidebarCTA: FC<SidebarCtaType> = (props) => {
//   const { title, description, action, onClose, dataAnalyticsIdForButton, dataAnalyticsIdForLink } = props;
//   return (
//     <div className="mt-6 rounded-lg bg-gray-100 p-4" role="alert">
//       <div className="mb-3 flex items-center">
//         <span className="me-2 rounded bg-blue-600 px-2.5 py-0.5 font-medium text-blue-200 text-xs">{title}</span>

//         <button
//           aria-label="Close"
//           className="-m-1.5 ml-auto inline-flex size-6 rounded-lg bg-gray-100 p-1 text-brand-700"
//           type="button"
//           onClick={onClose}
//           data-analytics-id={dataAnalyticsIdForButton}
//         >
//           <svg
//             aria-hidden
//             className="size-4"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <title>Close button</title>
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       <div className="mb-3 text-black text-sm">{description}</div>
//       <p
//         className="cursor-pointer text-brand-700 text-sm underline"
//         onClick={action.onClick}
//         data-analytics-id={dataAnalyticsIdForLink}
//       >
//         {action.label}
//       </p>
//     </div>
//   );
// };

function groupSidebarItemsByGroupKey(items: Array<SidebarItemType>) {
  const sidebarItemsObj: Record<string, SidebarItemType[]> = {};
  return items.reduce((sidebarItemsObj, item) => {
    if (isSidebarItemSimple(item) || isSidebarItemCollapsible(item)) {
      const list = sidebarItemsObj[item.groupKey] || [];
      list.push(item);
      sidebarItemsObj[item.groupKey] = list;
    }
    return sidebarItemsObj;
  }, sidebarItemsObj);
}

const sidebarTheme: CustomFlowbiteTheme["sidebar"] = /*tw:*/ {
  root: {
    inner: `${theme.sidebar.root.inner} rounded-tl-none rounded-bl-none bg-gray-800 dark:bg-gray-800 h-screen flex flex-col`,
  },
  items: {
    base: `${theme.sidebar.items.base} flex flex-col flex-1 min-h-0`,
  },
  itemGroup: {
    base: `${theme.sidebar.itemGroup.base} last:mt-auto`,
  },
  collapse: {
    label: {
      base: `${theme.sidebar.collapse.label.base} font-medium`,
      icon: {
        base: `${theme.sidebar.collapse.label.icon.base} dark:fill-gray-400`,
      },
    },
    icon: {
      base: `${theme.sidebar.collapse.icon.base} dark:fill-gray-400 size-5`,
    },
    list: `${theme.sidebar.collapse.list} overflow-auto`,
  },
  logo: {
    collapsed: {
      off: `${theme.sidebar.logo.collapsed.off} dark:text-white`,
    },
  },
  item: {
    base: `${theme.sidebar.item.base} font-medium`,
    active: `${theme.sidebar.item.active} dark:bg-gray-600`,
    content: {
      base: `${theme.sidebar.item.content.base} truncate`,
    },
    icon: {
      base: `${theme.sidebar.item.icon.base} size-5 dark:fill-gray-400`,
      active: `${theme.sidebar.item.icon.active} dark:fill-white`,
    },
  },
};
