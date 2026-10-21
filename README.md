# Krishna Jain portfolio

This is an Astro + TypeScript portfolio. The site is static-first, so it can be deployed to GitHub Pages, Netlify, Vercel, or any static host.

## Run locally

```bash
npm install
npm run dev
```

Build for deployment with:

```bash
npm run build
```

## Add content

Create one Markdown file per entry in one of these folders:

- `src/content/projects/`

Example project:

```md
---
title: My project
summary: A short sentence shown on the project card.
year: 2026
tags: [mechanical engineering, python]
featured: true
status: complete
githubUrl: https://github.com/your-name/your-project
---

## What I built

Write the full project description here. Markdown headings, links, images, and code blocks are supported.
```

The filename becomes the URL slug. For example, `robot-arm.md` becomes `/projects/robot-arm/`. The schema in `src/content.config.ts` validates frontmatter during the build, so missing or malformed fields are caught early.

The main reusable pieces live in `src/components/`, the page layouts live in `src/layouts/`, and the global visual system lives in `src/styles/global.css`.
