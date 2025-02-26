import type { IconType } from "react-icons";
import { z } from "zod";

export const sidebarItemCommonSchema = z.object({
  label: z.string(),
  Icon: z.custom<IconType>().optional(),
  onClick: z.function().optional(),
  active: z.boolean().optional(),
  extraClasses: z.string().optional(),
  dataAnalyticsId: z.string(),
});

export const sidebarItemSimpleSchema = sidebarItemCommonSchema.extend({
  groupKey: z.string(),
});
export type SidebarItemSimpleType = z.infer<typeof sidebarItemSimpleSchema>;

export const sidebarItemCollapsibleSchema = sidebarItemSimpleSchema.extend({
  children: z.array(sidebarItemCommonSchema),
});
export type SidebarItemCollapsibleType = z.infer<typeof sidebarItemCollapsibleSchema>;

export const isSidebarItemSimple = (item: unknown): item is z.infer<typeof sidebarItemSimpleSchema> =>
  sidebarItemSimpleSchema.safeParse(item).success;
export const isSidebarItemCollapsible = (item: unknown): item is z.infer<typeof sidebarItemCollapsibleSchema> =>
  sidebarItemCollapsibleSchema.safeParse(item).success;

export const sidebarItemSchema = z.union([sidebarItemSimpleSchema, sidebarItemCollapsibleSchema]);
export type SidebarItemType = z.infer<typeof sidebarItemSchema>;

export const sidebarLogoSchema = z.object({
  href: z.string(),
  img: z.string(),
  imgAlt: z.string(),
  dataAnalyticsId: z.string(),
});
export type SidebarLogoType = z.infer<typeof sidebarLogoSchema>;

export const sidebarCtaSchema = z.object({
  title: z.string(),
  description: z.string(),
  action: z.object({
    label: z.string(),
    onClick: z.function(),
  }),
  onClose: z.function().optional(),
  dataAnalyticsIdForButton: z.string(),
  dataAnalyticsIdForLink: z.string(),
});
export type SidebarCtaType = z.infer<typeof sidebarCtaSchema>;

export const sidebarSchema = z.object({
  hidden: z.boolean().optional(),
  logo: sidebarLogoSchema.optional(),
  cta: sidebarCtaSchema.optional(),
  items: z.array(sidebarItemSchema),
});
export type SidebarType = z.infer<typeof sidebarSchema>;
