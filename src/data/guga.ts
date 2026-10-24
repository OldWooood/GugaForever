import type { ImageMetadata } from "astro";

import blueDogCard from "../assets/images/blue-dog-card.webp";
import blueDogPortrait from "../assets/images/blue-dog-portrait.webp";
import milk1200 from "../assets/images/milk-1200.webp";
import milk1800 from "../assets/images/milk-1800.webp";
import staysafeCard from "../assets/images/staysafe-card-1200.webp";
import staysafeDetail from "../assets/images/staysafe-detail-1800.webp";

/**
 * 咕嘎毕业档案
 * 想加一只新的咕嘎，复制一份对象，改掉字段即可。
 *
 * 校对规则：只收入已确认停更的 B站咕嘎。
 * 仍在更新的账号不放进档案，等真正停更后再补。
 */
export type StatusKey = "stopped" | "finished" | "away";

export interface Guga {
  /** 用于 /guga/<id>/，不能重复 */
  id: string;
  name: string;
  handle: string;
  uid: string;
  spaceUrl: string;
  statusKey: StatusKey;
  statusLabel: string;
  date: string;
  dateLabel: string;
  dateHuman: string;
  traits: string[];
  description: string;
  image: ImageMetadata;
  imageLarge: ImageMetadata;
  imageAlt: string;
  detailAlt?: string;
  imagePosition?: string;
  credit: string;
  farewellTitle: string;
  farewellUrl: string;
  bvid: string;
  quote?: string;
  quoteSource?: string;
  note: string;
  statusNote: string;
}

export const gugas: Guga[] = [
  {
    id: "milk",
    name: "奶瓶小咕嘎",
    handle: "我的猫叫缘缘",
    uid: "2061750064",
    spaceUrl: "https://space.bilibili.com/2061750064",
    statusKey: "stopped",
    statusLabel: "停更",
    date: "2026-09-04",
    dateLabel: "2026.09.04",
    dateHuman: "2026 年 9 月 4 日",
    traits: ["奶瓶不离手", "眯眼笑", "养成系"],
    description:
      "从《养成系小咕嘎》开始被镜头看着长大的一只。最常出现的动作是抱着奶瓶，喝到开心时会眯起眼睛。停更通知没有配长文，只有一段安安静静的日常回放。",
    image: milk1200,
    imageLarge: milk1800,
    imageAlt: "奶瓶小咕嘎抱着奶瓶喝奶的近景",
    imagePosition: "50% 48%",
    credit: "视频封面来自 B站 @我的猫叫缘缘",
    farewellTitle: "由于个人原因，咕嘎要跟大家说再见了（停更）",
    farewellUrl: "https://www.bilibili.com/video/BV1y5ti62EVh/",
    bvid: "BV1y5ti62EVh",
    note: "停更说明发布在 2026 年 9 月 4 日。",
    statusNote: "UP主以一条停更说明告别，没有说明复更时间。"
  },
  {
    id: "blue",
    name: "小蓝嘎",
    handle: "布鲁小嘎嘎",
    uid: "558382170",
    spaceUrl: "https://space.bilibili.com/558382170",
    statusKey: "stopped",
    statusLabel: "停更",
    date: "2026-10-20",
    dateLabel: "2026.10.20",
    dateHuman: "2026 年 10 月 20 日",
    traits: ["蓝色企鹅服", "狗狗搭子", "会回来"],
    description:
      "穿蓝色企鹅服的小嘎，和一只黄狗一起住在有院子的家里。Ta会趴在狗狗背上，也会认真吃饭。视频最后，Ta说如果大家还愿意等，Ta一定会回来。这一页先记下Ta的停更，等Ta真的回来再改。",
    image: blueDogCard,
    imageLarge: blueDogPortrait,
    imageAlt: "蓝色企鹅服的小蓝嘎趴在狗狗背上",
    imagePosition: "50% 45%",
    credit: "视频画面来自 B站 @布鲁小嘎嘎",
    farewellTitle: "也许这一次，是真的告别了",
    farewellUrl: "https://www.bilibili.com/video/BV1gcnF6NEAC/",
    bvid: "BV1gcnF6NEAC",
    quote: "倘若今后你们还愿意陪伴，我便一定会回来。",
    quoteSource: "UP主在告别视频里写",
    note: "等Ta回来，这一页再改。",
    statusNote: "UP主已发布告别作品，账号目前停更。"
  },
  {
    id: "staysafe",
    name: "咕嘎师傅",
    handle: "StaySafeForever",
    uid: "485520855",
    spaceUrl: "https://space.bilibili.com/485520855",
    statusKey: "stopped",
    statusLabel: "停更",
    date: "2026-10-23",
    dateLabel: "2026.10.23",
    dateHuman: "2026 年 10 月 23 日",
    traits: ["掌心大小", "咕嘎师傅", "星星告别"],
    description:
      "掌心大小的一只咕嘎师傅，戴着小企鹅帽子和黄围巾，被好好捧在手里。Ta和宝宝一起出现，最后一条更新里，两只小企鹅牵着手，走上了一条发光的星梯。UP主在简介里说，从咕咕嘎嘎创作毕业了。",
    image: staysafeCard,
    imageLarge: staysafeDetail,
    imageAlt: "掌心大小的咕嘎师傅戴着企鹅帽子和黄围巾",
    detailAlt: "两只小企鹅牵着手，走上发光的星梯",
    imagePosition: "50% 50%",
    credit: "视频封面来自 B站 @StaySafeForever",
    farewellTitle: "永别啦！再也不见啦咕咕嘎嘎！",
    farewellUrl: "https://www.bilibili.com/video/BV1dSny6uExs/",
    bvid: "BV1dSny6uExs",
    quote: "从咕咕嘎嘎创作毕业了！",
    quoteSource: "UP主在告别视频简介里写",
    note: "这次是真的毕业了。",
    statusNote: "UP主在告别视频里明确表示不再创作咕咕嘎嘎视频，账号目前停更。"
  }
];

export function getGuga(id: string): Guga | undefined {
  return gugas.find((guga) => guga.id === id);
}

export function getGugaNeighbors(id: string): { prev: Guga; next: Guga } | undefined {
  const index = gugas.findIndex((guga) => guga.id === id);

  if (index === -1) {
    return undefined;
  }

  return {
    prev: gugas[(index - 1 + gugas.length) % gugas.length],
    next: gugas[(index + 1) % gugas.length]
  };
}
