import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = (process.env.SITE_URL || '').trim().replace(/\/+$/, '');
const distDir = resolve('dist');

await mkdir(distDir, { recursive: true });

const robots = `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`;
await writeFile(resolve(distDir, 'robots.txt'), robots, 'utf8');

if (siteUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`;
  await writeFile(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8');
}
