export const PAGE_SIZE = 8;

export const SITE = {
  name: "咕嘎永远",
  nameEn: "GUGA FOREVER",
  title: "咕嘎永远｜B站咕嘎停更纪念档案",
  description: "只收已经确认停更的 B站咕嘎：它们的特点、原地、毕业时间和最后留下的影片。",
  repoUrl: "https://github.com/OldWooood/GugaForever",
  contributingUrl: "https://github.com/OldWooood/GugaForever/blob/main/CONTRIBUTING.md",
  updatedLabel: "2026.10.24"
} as const;

export const STATUS_FILTERS = [
  { key: "all", label: "全部" },
  { key: "stopped", label: "停更" },
  { key: "finished", label: "完结" },
  { key: "away", label: "暂别" }
] as const;

export type StatusFilter = (typeof STATUS_FILTERS)[number]["key"];
