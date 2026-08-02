import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const rootPath = decodeURIComponent(root.pathname).replace(/^\/(?:([A-Za-z]):)/, '$1:');

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const htmlFiles = walk(rootPath).filter((path) => path.endsWith('.html'));
const pages = new Map();
const errors = [];

const routeForFile = (file) => {
  const local = relative(rootPath, file).split(sep).join('/');
  if (local === 'index.html') return '/';
  return `/${local.replace(/index\.html$/, '')}`;
};

const targetForPathname = (pathname) => {
  const local = pathname.replace(/^\//, '');
  if (!local) return join(rootPath, 'index.html');
  if (pathname.endsWith('/')) return join(rootPath, local, 'index.html');
  return join(rootPath, local);
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  pages.set(route, { file, html, ids });
}

for (const [route, page] of pages) {
  const { html } = page;
  const markup = html.replace(/<script\b[\s\S]*?<\/script>/g, '');
  const count = (pattern) => [...markup.matchAll(pattern)].length;
  const content = (pattern) => markup.match(pattern)?.[1];

  if (count(/<h1\b/g) !== 1) errors.push(`${route}: expected exactly one h1`);
  if (count(/<main\b/g) !== 1) errors.push(`${route}: expected exactly one main landmark`);
  if (!content(/<title>([^<]+)<\/title>/)) errors.push(`${route}: missing title`);
  if (!content(/<meta name="description" content="([^"]+)"/)) errors.push(`${route}: missing meta description`);

  const canonical = content(/<link rel="canonical" href="([^"]+)"/);
  const ogUrl = content(/<meta property="og:url" content="([^"]+)"/);
  for (const [name, value] of [
    ['canonical', canonical],
    ['og:url', ogUrl],
    ['og:image', content(/<meta property="og:image" content="([^"]+)"/)],
    ['twitter:image', content(/<meta name="twitter:image" content="([^"]+)"/)],
  ]) {
    if (!value || !value.startsWith('https://')) errors.push(`${route}: missing absolute HTTPS ${name}`);
  }
  if (canonical && ogUrl !== canonical) errors.push(`${route}: og:url does not match canonical URL`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      errors.push(`${route}: invalid JSON-LD`);
    }
  }

  for (const match of markup.matchAll(/<img\b([^>]*)>/g)) {
    const attributes = match[1];
    if (/\ssrc="[^"]+"/.test(attributes) && (!/\swidth="\d+"/.test(attributes) || !/\sheight="\d+"/.test(attributes))) {
      errors.push(`${route}: image is missing explicit dimensions`);
    }
  }

  for (const match of markup.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;

    const resolved = new URL(href, `https://audit.invalid${route}`);
    const targetFile = targetForPathname(decodeURIComponent(resolved.pathname));
    if (!existsSync(targetFile)) {
      errors.push(`${route}: broken internal link ${href}`);
      continue;
    }

    if (resolved.hash && targetFile.endsWith('.html')) {
      const targetRoute = routeForFile(targetFile);
      const targetPage = pages.get(targetRoute);
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (targetPage && !targetPage.ids.has(id)) errors.push(`${route}: missing fragment target ${href}`);
    }
  }
}

if (!existsSync(join(rootPath, 'robots.txt'))) errors.push('Missing robots.txt');
if (!existsSync(join(rootPath, 'sitemap-index.xml'))) errors.push('Missing sitemap-index.xml');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Audited ${pages.size} HTML pages: metadata, JSON-LD, images, internal links, fragments, robots, and sitemap all passed.`);
}
