# thanhhaidev.github.io

Personal site of Hai Nguyen — Mobile Engineer. Built with [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npx astro check  # type-check .astro and .ts files
```

## Editing content

Content lives in data files, not in the components:

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, role, links, skills, education |
| `src/data/experience.yaml` | Jobs, newest first (`order`) |
| `src/data/packages.yaml` | pub.dev packages — the `id` is the package name |
| `src/data/projects.yaml` | The `featured` GitHub repo shown as the large card |

Every file is validated by the schemas in `src/content.config.ts`, so a typo fails the build
instead of shipping a broken page.

## Live numbers

Package versions, likes, pub points and downloads come from the pub.dev API; the featured
project's language breakdown and the contribution calendar come from GitHub. All of it is
fetched at build time (`src/lib/remote.ts`). If an API is unreachable the build still succeeds and the affected
numbers are hidden.

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `master`, and again daily
at 01:00 UTC so the numbers stay fresh. In the repository settings, **Pages → Source** must be
set to **GitHub Actions**.
