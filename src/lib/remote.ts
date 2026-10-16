// Build-time data from pub.dev and GitHub. Every fetch fails soft: a network
// error leaves the value undefined and the UI hides it instead of breaking the build.

import { GITHUB_TOKEN } from 'astro:env/server';

export interface PubStats {
  version: string;
  likes: number;
  points: number;
  downloads: number;
}

export interface LanguageShare {
  name: string;
  percent: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const cache = new Map<string, Promise<unknown>>();

function get<T>(url: string, as: 'json' | 'text', headers: Record<string, string> = {}): Promise<T | undefined> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { headers, signal: AbortSignal.timeout(10_000) })
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          return res[as]();
        })
        .catch((error) => {
          console.warn(`[remote] ${url}: ${error.message}`);
          return undefined;
        }),
    );
  }
  return cache.get(url) as Promise<T | undefined>;
}

const getJson = <T>(url: string, headers?: Record<string, string>) => get<T>(url, 'json', headers);

export async function getPubStats(name: string): Promise<PubStats | undefined> {
  const [score, info] = await Promise.all([
    getJson<{ likeCount: number; grantedPoints: number; downloadCount30Days: number }>(
      `https://pub.dev/api/packages/${name}/score`,
    ),
    getJson<{ latest: { version: string } }>(`https://pub.dev/api/packages/${name}`),
  ]);
  if (!score || !info) return undefined;
  return {
    version: info.latest.version,
    likes: score.likeCount,
    points: score.grantedPoints,
    downloads: score.downloadCount30Days,
  };
}

/** Top `limit` languages of a repo by bytes; the rest is folded into "Other". */
export async function getLanguages(repo: string, limit = 3): Promise<LanguageShare[] | undefined> {
  const token = GITHUB_TOKEN;
  const bytes = await getJson<Record<string, number>>(
    `https://api.github.com/repos/${repo}/languages`,
    token ? { Authorization: `Bearer ${token}` } : {},
  );
  if (!bytes) return undefined;

  const total = Object.values(bytes).reduce((sum, n) => sum + n, 0);
  if (!total) return undefined;

  const sorted = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, limit).map(([name, n]) => ({ name, percent: Math.round((n / total) * 100) }));
  const rest = 100 - top.reduce((sum, l) => sum + l.percent, 0);
  return rest > 0 ? [...top, { name: 'Other', percent: rest }] : top;
}

/**
 * Last year of the public contribution calendar, oldest day first. GitHub has no
 * unauthenticated API for this, so it reads the same HTML fragment the profile page loads.
 */
export async function getContributions(
  user: string,
): Promise<{ total: number; days: ContributionDay[] } | undefined> {
  const html = await get<string>(`https://github.com/users/${user}/contributions`, 'text');
  if (!html) return undefined;

  const counts = new Map<string, number>();
  for (const [, id, label] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = label.match(/^(\d+)/);
    counts.set(id, n ? Number(n[1]) : 0);
  }

  const days: ContributionDay[] = [];
  for (const [cell] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const attr = (name: string) => cell.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
    days.push({ date: attr('data-date'), level: Number(attr('data-level')), count: counts.get(attr('id')) ?? 0 });
  }
  if (!days.length) return undefined;
  days.sort((a, b) => a.date.localeCompare(b.date));

  const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1].replace(/,/g, ''));
  return { total: Number.isFinite(total) ? total : days.reduce((sum, d) => sum + d.count, 0), days };
}

export const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);
