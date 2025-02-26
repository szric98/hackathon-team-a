import plandekLogoPath from "@/assets/PlandekLogo.svg";

import { IconRenderFn } from "../../atoms/icons/IconRenderFn";
import type { SidebarType } from "./schema";

export const SIDEBAR_CONFIG: SidebarType = {
  logo: {
    imgAlt: "PlandekLogo",
    img: plandekLogoPath,
    href: "#",
    dataAnalyticsId: "sidebar__logo",
  },
  cta: {
    title: "Beta",
    action: { onClick: () => null, label: "Explore" },
    description: "We added epic due dates to our SmartView for epics. Go check it out!",
    dataAnalyticsIdForButton: "sidebar__cta__close-button",
    dataAnalyticsIdForLink: "sidebar__cta__explore-link",
  },
  items: [
    {
      Icon: IconRenderFn("SprintsIcon"),
      onClick: () => null,
      label: "Deliver sprints",
      groupKey: "1",
      active: true,
      dataAnalyticsId: "sidebar__sprints-menu-item",
    },
    {
      Icon: IconRenderFn("EpicsIcon"),
      label: "Deliver epics",
      groupKey: "1",
      dataAnalyticsId: "sidebar__epics-menu-item",
    },
    {
      Icon: IconRenderFn("FeaturesIcon"),
      onClick: () => null,
      label: "Deliver features",
      groupKey: "1",
      dataAnalyticsId: "sidebar__features-menu-item",
    },
    {
      Icon: IconRenderFn("DashboardsIcon"),
      label: "Dashboards",
      groupKey: "2",
      dataAnalyticsId: "sidebar_dashboards-menu-item",
      children: [
        {
          label: "Manage",
          onClick: () => null,
          extraClasses: "dark:text-brand-700",
          dataAnalyticsId: "sidebar__manage-menu-item",
        },
        {
          label: "Dashboard 1",
          onClick: () => null,
          dataAnalyticsId: "sidebar__dashboards__dashboard-1-menu-item",
        },
        {
          label: "Dashboard 2",
          onClick: () => null,
          dataAnalyticsId: "sidebar__dashboards__dashboard-2-menu-item",
        },
        {
          label: "Dashboard 3",
          onClick: () => null,
          dataAnalyticsId: "sidebar__dashboards__dashboard-3-menu-item",
        },
      ],
    },
    {
      Icon: IconRenderFn("HelpIcon"),
      onClick: () => console.info("REDIRECTING TO https://help.plandek.com/en/"),
      label: "Help",
      groupKey: "3",
      dataAnalyticsId: "sidebar__help-menu-item",
    },
    {
      Icon: IconRenderFn("AdminIcon"),
      onClick: () => null,
      label: "Admin",
      groupKey: "3",
      dataAnalyticsId: "sidebar__admin-menu-item",
    },
    {
      Icon: IconRenderFn("ArrowRightToBracketIcon"),
      onClick: () => console.info("LOGOUT"),
      label: "Logout",
      groupKey: "3",
      dataAnalyticsId: "sidebar__logout-button",
    },
  ],
};
