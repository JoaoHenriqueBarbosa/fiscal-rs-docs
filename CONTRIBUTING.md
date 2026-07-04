# Contributing to fiscal-rs-docs

Thanks for your interest in improving the documentation! This repository is the **Next.js + Fumadocs website** that renders the docs for the `fiscal-rs` Rust library. Contributions here are almost always about the **content** (`content/docs/*.mdx`) or the **site** (`src/`).

> Changes to the Rust library itself belong in the separate repo: <https://github.com/JoaoHenriqueBarbosa/fiscal-rs>.

## Prerequisites

- **Node.js** 20 or newer.
- **[Bun](https://bun.sh)** — the lockfile is `bun.lock`.

## Local setup

```bash
# 1. fork on GitHub, then clone your fork
git clone https://github.com/<your-username>/fiscal-rs-docs.git
cd fiscal-rs-docs

# 2. install dependencies (postinstall runs `fumadocs-mdx` to generate .source/)
bun install

# 3. run the dev server
bun run dev
# open http://localhost:3000
```

## Repository layout

| Path | What lives there |
| --- | --- |
| `content/docs/*.mdx` | The documentation pages (frontmatter + MDX). |
| `content/docs/meta.json` | Sidebar order and section dividers. |
| `src/app/` | Next.js App Router (home, docs, search, llms endpoints, OG images). |
| `src/components/` | Custom MDX components (`Mermaid`, benchmark chart/results). |
| `src/lib/` | Fumadocs source loader, shared layout config, helpers. |
| `public/` | Logo, OG image, favicons. |

## Making a change

### Editing or adding a docs page

1. Create or edit a `.mdx` file in `content/docs/`.
2. Include frontmatter at the top:
   ```mdx
   ---
   title: Page title
   description: One-line summary shown in search and OG images.
   ---
   ```
3. If you added a new page, register it in `content/docs/meta.json` so it appears in the sidebar.
4. Use the provided components where helpful — e.g. `<Mermaid chart={"graph TD; A-->B"} />` for diagrams.

### Editing the site

Site code is TypeScript/TSX under `src/`. Keep components small and typed; the project uses TypeScript in `strict` mode.

## Before you open a pull request

Run the type check and make sure a production build succeeds:

```bash
bun run types:check   # regenerates MDX types, then tsc --noEmit
bun run build         # next build
```

For any change that affects layout or rendering, please open the affected page(s) in the dev server and confirm they look right (and attach a screenshot to the PR when practical).

## Pull request flow

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b docs/improve-getting-started
   ```
2. Make your change and verify it locally (`types:check` + `build`).
3. Commit using **[Conventional Commits](https://www.conventionalcommits.org/)** (see the table below).
4. Push and open a pull request against `main`. Fill in the PR template.
5. Address review feedback with additional commits; we squash-merge.

## Conventional commit types

| Type | Use for |
| --- | --- |
| `feat` | A new page, component, or user-facing site capability. |
| `fix` | Correcting an error in the docs or a bug in the site. |
| `docs` | Content-only edits (wording, typos, clarifications). |
| `style` | Formatting/whitespace with no meaning change. |
| `refactor` | Restructuring site code without changing behavior. |
| `perf` | Performance improvements to the site. |
| `build` | Build system, dependencies, or tooling changes. |
| `ci` | CI configuration and workflows. |
| `chore` | Maintenance that doesn't fit the above. |

A scope is encouraged, e.g. `docs(getting-started): fix the cargo add command`.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Reporting security issues

Please do not file security problems as public issues — follow [SECURITY.md](./SECURITY.md).
