# 咕嘎永远 / Guga Forever

一个非官方的 B站咕嘎停更纪念档案。只收已经确认停更的咕嘎，留下它们的特点、原地、毕业时间和最后出现的影片。

线上地址：[https://oldwooood.github.io/GugaForever/](https://oldwooood.github.io/GugaForever/)

站点是纯静态页面，不需要构建工具，可以直接部署到 GitHub Pages。

## 本地预览

```bash
python3 -m http.server 4173
```

打开 `http://127.0.0.1:4173/`。

## 页面

- `index.html`：首页、毕业档案、筛选和关于这里
- `guga.html?id=<id>`：每只咕嘎自己的档案页
- `404.html`：GitHub Pages 的 404 页面
- `robots.txt`：允许搜索引擎收录
- `CONTRIBUTING.md`：贡献与 PR 指引
- `.github/PULL_REQUEST_TEMPLATE.md`：PR 检查表
- `assets/js/data.js`：所有档案数据
- `assets/css/style.css`：样式、浅色和深色主题
- `assets/fonts/xiaolai.woff2`：小赖字体子集
- `assets/images/`：压缩后的视频封面和画面

## 当前收录

| 档案名 | 原地 | 状态 | 毕业时间 | 最后的身影 |
| --- | --- | --- | --- | --- |
| 奶瓶小咕嘎 | [我的猫叫缘缘](https://space.bilibili.com/2061750064) | 停更 | 2026.09.04 | [BV1y5ti62EVh](https://www.bilibili.com/video/BV1y5ti62EVh/) |
| 小蓝嘎 | [布鲁小嘎嘎](https://space.bilibili.com/558382170) | 停更 | 2026.10.20 | [BV1gcnF6NEAC](https://www.bilibili.com/video/BV1gcnF6NEAC/) |
| 咕嘎师傅 | [StaySafeForever](https://space.bilibili.com/485520855) | 停更 | 2026.10.23 | [BV1dSny6uExs](https://www.bilibili.com/video/BV1dSny6uExs/) |

这里的「毕业」主要指账号停更，不涉及 UP 主的个人状况。毕业时间以告别作品的发布日为准。如果其中一只复更，会从这里移出。

### 校对记录：仍在更新，暂不收录

以下账号在整理时仍在更新，所以没有放进停更档案：

- [有点小懒耶](https://space.bilibili.com/352457287)
- [业余的小白](https://space.bilibili.com/378501357)
- [咕嘎小卖铺1](https://space.bilibili.com/3461565995026804)
- [EG-瓜比](https://space.bilibili.com/484074483)

等它们真正停更后，再把档案补进来。

## 添加或修改一只咕嘎

打开 `assets/js/data.js`，复制一份对象，修改以下字段：

```js
{
  id: "milk",                 // 用于 guga.html?id=milk，不能重复
  name: "奶瓶小咕嘎",          // 档案名
  handle: "我的猫叫缘缘",       // B站昵称，不要带 @
  uid: "2061750064",          // B站 UID
  spaceUrl: "https://space.bilibili.com/2061750064",
  statusKey: "stopped",       // stopped / finished / away
  statusLabel: "停更",         // 卡片上显示的状态
  date: "2026-09-04",         // 机器可读日期
  dateLabel: "2026.09.04",    // 卡片上的日期
  dateHuman: "2026 年 9 月 4 日",
  traits: ["奶瓶不离手", "眯眼笑", "养成系"],
  description: "档案描述。",
  image: "assets/images/milk-1200.webp",
  imageLarge: "assets/images/milk-1800.webp",
  imageAlt: "图片替代文字",
  detailAlt: "详情页图片替代文字", // 可选
  imagePosition: "50% 48%",    // object-position
  credit: "视频封面来自 B站 @我的猫叫缘缘",
  farewellTitle: "告别作品标题",
  farewellUrl: "https://www.bilibili.com/video/BV.../",
  bvid: "BV...",
  quote: "",                  // 没有就留空
  quoteSource: "",
  note: "一句档案注脚。",
  statusNote: "一句状态说明。"
}
```

状态筛选对应关系（当前只确认了三只停更，完结和暂别筛选会自动隐藏）：

- `stopped`：停更或正式告别，筛选按钮显示为「停更」
- `finished`：系列或某一季完结
- `away`：暂别，并留下会回来的约定

新增图片建议先压到 1200px 宽的 WebP，再放到 `assets/images/`。详情页会使用 `imageLarge`，请保留一份更大的版本。如果卡片和详情页想用不同的画面，可以额外写 `detailAlt`。

## 参与贡献

欢迎补档、校对和纠错。提交 PR 前请先读 [CONTRIBUTING.md](CONTRIBUTING.md)，并填写 `.github/PULL_REQUEST_TEMPLATE.md` 里的检查项。

最简单的流程：

1. Fork 仓库，新建分支。
2. 在 `assets/js/data.js` 里新增或修改一只咕嘎，把图片放进 `assets/images/`。
3. 本地打开首页和详情页，检查桌面、手机和深浅色。
4. 更新 README 的收录表或校对记录。
5. 提交 PR，写清楚资料来源和停更依据。

只收已经确认停更的 B站账号。仍在更新的账号不要放进档案。如果只是更正资料、撤下图片或报告问题，直接提 Issue 就可以，不需要写 PR。

## 字体

本站全站使用 [小赖字体 / Xiaolai Font](https://github.com/lxgw/kose-font)，作者 LXGW，基于濑户字体，采用 SIL Open Font License 1.1。字体许可证在 `assets/fonts/OFL.txt`。

为了避免加载 20MB 的完整字体，仓库里放的是按当前页面文字生成的子集 `assets/fonts/xiaolai.woff2`。如果新增的文案里出现子集没有的字，浏览器会回退到系统字体。需要重建子集时：

1. 安装 `fonttools` 和 `brotli`。
2. 从 [kose-font Releases](https://github.com/lxgw/kose-font/releases) 下载 `Xiaolai-Regular.ttf`。
3. 运行：

```bash
python3 tools/subset-font.py /path/to/Xiaolai-Regular.ttf
```

脚本会扫描 `index.html`、`guga.html`、`404.html`、`assets/js/*.js` 和 `assets/css/*.css` 中的文字，重新生成 `assets/fonts/xiaolai.woff2`。

## 图标

- 导航和界面图标：[Tabler Icons](https://tabler.io/icons)，MIT。
- 企鹅标志和 favicon：本站自绘的简单企鹅图形。
- B站图标：[Simple Icons](https://simpleicons.org/)，CC0。

## 部署到 GitHub Pages

仓库里已经包含 `.github/workflows/pages.yml` 和 `.nojekyll`。如果这是一个新仓库，第一次推送可以执行：

```bash
git init
git add .
git commit -m "Build Guga Forever archive"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

如果 Pages 还没有开启，按下面的方式设置。

### 方式一：GitHub Actions

1. 把项目推到 GitHub 仓库的 `main` 分支。
2. 打开仓库的 **Settings > Pages**。
3. 在 **Build and deployment** 里把 **Source** 设为 **GitHub Actions**。
4. 推送到 `main` 后，工作流会自动发布。

如果你的默认分支叫 `master`，把 `pages.yml` 里的 `branches: ["main"]` 改成 `master`。

### 方式二：直接从分支发布

1. 把项目推到 GitHub 仓库。
2. 打开 **Settings > Pages**。
3. **Source** 选择 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`。

主页面路径都是相对路径，部署在 `https://<username>.github.io/<repo>/` 这样的子路径下也能正常打开。

部署后如果要用社交分享卡片，建议把 `index.html` 和 `guga.html` 里的 `og:image` 换成完整域名地址。

## 版权与更正

- 本站是非官方粉丝档案，不作商用。
- 图片来自 B站公开视频的封面或画面，版权归原 UP 主所有。
- 视频链接指向 B站原视频，不搬运、不下载影片。
- 如需更正资料或撤下图片，请在仓库提 Issue，或联系站点维护者。
- 如果你要把它发布到公开域名，请先确认图片使用方式符合原作者的意愿。
