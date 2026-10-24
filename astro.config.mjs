import { defineConfig } from "astro/config";

/**
 * GitHub Pages 的部署路径。
 *
 * - 仓库页（username.github.io/repo/）自动使用 `/<repo>/`。
 * - 用户页（username.github.io）使用 `/`。
 * - 本地开发和预览默认使用 `/`。
 * - 自定义域名或特殊部署可以设置 BASE_PATH 覆盖。
 */
const repository = process.env.GITHUB_REPOSITORY || "";
const [owner, repo] = repository.split("/");
const isUserSite = Boolean(owner && repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`);
const defaultBase = repo ? (isUserSite ? "/" : `/${repo}`) : "/";

function normalizeBase(value) {
  const trimmed = value.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

const base = normalizeBase(process.env.BASE_PATH || defaultBase);
const site = process.env.SITE_URL || (owner ? `https://${owner}.github.io` : "https://oldwooood.github.io");

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: {
    format: "directory"
  }
});
