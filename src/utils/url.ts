const base = import.meta.env.BASE_URL;
const site = import.meta.env.SITE;

/** 给站内路径加上部署前缀，兼容 GitHub Pages 子路径。 */
export function url(path = "/"): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) {
    return path;
  }

  const [pathname, hash] = path.split("#");
  const normalized = pathname.replace(/^\/+/, "");
  const result = `${base}${normalized}`;

  return hash ? `${result}#${hash}` : result;
}

/** 站内资源的绝对地址，用于 canonical、OG 图和 sitemap。 */
export function absoluteUrl(path = "/"): string {
  return new URL(url(path), site).href;
}

/**
 * 把 Astro 图片资源转成绝对地址。
 * ImageMetadata.src 在不同构建模式下可能已经带上了 base，这里统一处理。
 */
export function absoluteAsset(assetPath: string): string {
  const prefix = base.replace(/^\/|\/$/g, "");
  let pathname = assetPath.replace(/^\/+/, "");

  if (prefix && pathname.startsWith(`${prefix}/`)) {
    pathname = pathname.slice(prefix.length + 1);
  }

  return new URL(`${base}${pathname}`, site).href;
}
