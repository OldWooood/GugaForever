# 咕嘎永远 / Guga Forever

一个非官方的 B站咕嘎停更纪念档案。只收已经确认停更的咕嘎，留下它们的特点、原地、毕业时间和最后出现的影片。

线上地址：[https://oldwooood.github.io/GugaForever/](https://oldwooood.github.io/GugaForever/)

GitHub 仓库：[https://github.com/OldWooood/GugaForever](https://github.com/OldWooood/GugaForever)

站点使用 Astro 构建为纯静态页面。首页支持按名字、UP主和特点搜索，按状态筛选，并且每页 8 只分页；每只咕嘎都有独立的预渲染详情页。

## 技术栈

- [Astro](https://astro.build/) 7，静态输出，没有客户端框架。
- 档案数据在 `src/data/guga.ts`，使用 TypeScript 类型管理。
- 首页卡片由 Astro 在构建时渲染，搜索、筛选和分页由一小段原生 TypeScript 在浏览器里完成。
- 详情页在 `src/pages/guga/[id].astro`，构建时按数据生成 `/guga/<id>/`。
- 图片放在 `src/assets/images/`，由 Astro 自动生成响应式 WebP 和尺寸变体。
- 字体是小赖字体的 WOFF2 子集，图标是内联 SVG sprite。
- 部署方式是 GitHub Actions 加 GitHub Pages。

## 本地开发

需要 Node.js 24（最低 22.23.4）。

```bash
npm install
npm run dev
```

打开终端里给出的本地地址，默认是 `http://localhost:4321/`。

其他命令：

```bash
npm run check     # Astro + TypeScript 检查
npm run build     # 生成静态站点到 dist/
npm run preview   # 预览 dist/ 里的构建结果
```

## 页面与目录

- `src/pages/index.astro`：首页、搜索、筛选、分页和关于这里
- `src/pages/guga/[id].astro`：每只咕嘎的详情页，地址是 `/guga/<id>/`
- `src/pages/404.astro`：404 页面
- `src/pages/robots.txt.ts`、`src/pages/sitemap.xml.ts`：搜索引擎文件和站点地图
- `src/components/`：页头、页脚、卡片、首屏、档案列表等组件
- `src/data/guga.ts`：所有档案数据
- `src/styles/global.css`：样式、浅色和深色主题
- `src/assets/images/`：构建时交给 Astro 优化的封面和画面
- `src/assets/fonts/xiaolai.woff2`：小赖字体子集
- `src/icons/sprite.svg`：导航和界面图标
- `public/`：favicon、分享封面、字体许可证等原样复制的文件
- `public/guga.html`：旧链接 `guga.html?id=...` 的兼容跳转页

## 当前收录

| 档案名 | 原地 | 状态 | 毕业时间 | 最后的身影 |
| --- | --- | --- | --- | --- |
| 奶瓶小咕嘎 | [我的猫叫缘缘](https://space.bilibili.com/2061750064) | 停更 | 2026.09.04 | [BV1y5ti62EVh](https://www.bilibili.com/video/BV1y5ti62EVh/) |
| 小蓝嘎 | [布鲁小嘎嘎](https://space.bilibili.com/558382170) | 停更 | 2026.10.20 | [BV1gcnF6NEAC](https://www.bilibili.com/video/BV1gcnF6NEAC/) |
| 咕嘎师傅 | [StaySafeForever](https://space.bilibili.com/485520855) | 停更 | 2026.10.23 | [BV1dSny6uExs](https://www.bilibili.com/video/BV1dSny6uExs/) |

这里的「毕业」主要指账号停更，不涉及 UP 主的个人状况。毕业时间以告别作品的发布日为准。如果其中一只复更，会从这里移出。

## 添加或修改一只咕嘎

1. 把图片放进 `src/assets/images/`，建议先压到 1200px 宽的 WebP；详情图建议 1800px 宽。
2. 在 `src/data/guga.ts` 顶部导入图片。
3. 在 `gugas` 数组里复制一份对象，修改字段。

```ts
import newGugaImage from "../assets/images/new-guga-1200.webp";
import newGugaDetail from "../assets/images/new-guga-1800.webp";

{
  id: "new-guga",              // 用于 /guga/new-guga/，不能重复
  name: "档案名",
  handle: "B站昵称",            // 不要带 @
  uid: "123456789",            // B站 UID
  spaceUrl: "https://space.bilibili.com/123456789",
  statusKey: "stopped",        // stopped / finished / away
  statusLabel: "停更",          // 卡片上显示的状态
  date: "2026-10-24",          // 机器可读日期
  dateLabel: "2026.10.24",     // 卡片上的日期
  dateHuman: "2026 年 10 月 24 日",
  traits: ["特点一", "特点二", "特点三"],
  description: "档案描述。",
  image: newGugaImage,         // 卡片图，导入的图片对象
  imageLarge: newGugaDetail,   // 详情图，导入的图片对象
  imageAlt: "图片替代文字",
  detailAlt: "详情页图片替代文字", // 可选
  imagePosition: "50% 48%",    // object-position
  credit: "视频封面来自 B站 @昵称",
  farewellTitle: "告别作品标题",
  farewellUrl: "https://www.bilibili.com/video/BV.../",
  bvid: "BV...",
  quote: "",                   // 没有就留空
  quoteSource: "",
  note: "一句档案注脚。",
  statusNote: "一句状态说明。"
}
```

状态筛选对应关系：

- `stopped`：停更或正式告别，筛选按钮显示为「停更」
- `finished`：系列或某一季完结
- `away`：暂别，并留下会回来的约定

首页每页显示 8 只，数量在 `src/config.ts` 的 `PAGE_SIZE` 里调整。

图片是本地导入的 `ImageMetadata`，不要写成字符串路径。Astro 会根据 `widths` 和 `sizes` 自动生成不同尺寸和 `srcset`，不需要再手动准备多份图片。

## 字体

本站全站使用 [小赖字体 / Xiaolai Font](https://github.com/lxgw/kose-font)，作者 LXGW，基于濑户字体，采用 SIL Open Font License 1.1。字体许可证在 `public/assets/fonts/OFL.txt`。

为了避免加载 20MB 的完整字体，仓库里放的是按当前页面文字生成的子集 `src/assets/fonts/xiaolai.woff2`。新增文案里如果出现子集没有的字，浏览器会回退到系统字体。需要重建子集时：

1. 安装 `fonttools` 和 `brotli`。
2. 从 [kose-font Releases](https://github.com/lxgw/kose-font/releases) 下载 `Xiaolai-Regular.ttf`。
3. 运行：

```bash
python3 tools/subset-font.py /path/to/Xiaolai-Regular.ttf
```

脚本会扫描 `src/` 和 `public/*.html` 中的文字，重新生成 `src/assets/fonts/xiaolai.woff2`。

## 图标与图片

- 导航和界面图标：[Tabler Icons](https://tabler.io/icons)，MIT。
- 企鹅标志和 favicon：本站自绘的简单企鹅图形。
- B站图标：[Simple Icons](https://simpleicons.org/)，CC0。
- 分享封面：`public/assets/images/og-cover.jpg`。
- 页面图片：`src/assets/images/`，由 Astro 在构建时优化。

## 部署到 GitHub Pages

仓库里已经包含 `.github/workflows/pages.yml` 和 `public/.nojekyll`。工作流会在推送到 `main` 时安装依赖、跑检查、构建并发布 `dist/`。

第一次部署：

1. 把项目推到 GitHub 仓库的 `main` 分支。
2. 打开仓库的 **Settings > Pages**。
3. 在 **Build and deployment** 里把 **Source** 设为 **GitHub Actions**。
4. 推送到 `main` 后，工作流会自动发布。

### 部署路径

构建时会根据 `GITHUB_REPOSITORY` 自动推断 GitHub Pages 的子路径：

- 仓库页 `https://<username>.github.io/<repo>/`：base 为 `/<repo>/`
- 用户页 `https://<username>.github.io/`：base 为 `/`
- 本地开发：base 为 `/`

如果要使用自定义域名，在仓库的 **Settings > Secrets and variables > Actions > Variables** 里设置：

- `SITE_URL`：站点源地址，例如 `https://guga.example.com`（不要带子路径）
- `BASE_PATH`：`/`

也可以只在本地验证某个子路径：

```bash
BASE_PATH=/GugaForever npm run build
```

旧链接 `guga.html?id=milk` 会由 `public/guga.html` 自动跳转到新的 `/guga/milk/`。

## 参与贡献

欢迎补档、校对和纠错。提交 PR 前请先读 [CONTRIBUTING.md](CONTRIBUTING.md)，并填写 `.github/PULL_REQUEST_TEMPLATE.md` 里的检查项。

只收已经确认停更的 B站账号。仍在更新的账号不要放进档案。如果只是更正资料、撤下图片或报告问题，直接提 Issue 就可以，不需要写 PR。

## 版权与更正

- 本站是非官方粉丝档案，不作商用。
- 图片来自 B站公开视频的封面或画面，版权归原 UP 主所有。
- 视频链接指向 B站原视频，不搬运、不下载影片。
- 如需更正资料或撤下图片，请在仓库提 Issue，或联系站点维护者。
- 如果你要把它发布到公开域名，请先确认图片使用方式符合原作者的意愿。
