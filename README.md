# fiscal-rs-docs

> Documentation site for [**fiscal-rs**](https://github.com/JoaoHenriqueBarbosa/fiscal-rs) — a Rust library for Brazilian electronic fiscal documents (NF-e / NFC-e). Built with Next.js 16 and Fumadocs.

[![Docs pages](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/JoaoHenriqueBarbosa/fiscal-rs-docs/main/.github/badges/docs-pages.json)](https://github.com/JoaoHenriqueBarbosa/fiscal-rs-docs/tree/main/content/docs)
[![Content lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/JoaoHenriqueBarbosa/fiscal-rs-docs/main/.github/badges/content-loc.json)](https://github.com/JoaoHenriqueBarbosa/fiscal-rs-docs/tree/main/content/docs)
[![Diagrams](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/JoaoHenriqueBarbosa/fiscal-rs-docs/main/.github/badges/diagrams.json)](https://github.com/JoaoHenriqueBarbosa/fiscal-rs-docs/tree/main/content/docs)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![Fumadocs](https://img.shields.io/badge/Fumadocs-16-blueviolet)](https://fumadocs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## What this is

`fiscal-rs-docs` is the **documentation website** for the `fiscal-rs` Rust library — not the library itself. The Rust source, its crates, tests, and benchmarks live in a **separate repository** ([`JoaoHenriqueBarbosa/fiscal-rs`](https://github.com/JoaoHenriqueBarbosa/fiscal-rs)). This repo contains only the MDX content and the Next.js app that renders it.

The documented product, `fiscal-rs`, is described as a Rust port of the PHP [`sped-nfe`](https://github.com/nfephp-org/sped-nfe) library for Brazilian electronic invoices (NF-e model 55 / NFC-e model 65): XML generation, A1 digital signing (PFX/PKCS#12, XML-DSig), SEFAZ web-service communication (SOAP over mTLS), contingency (SVC-AN / SVC-RS), NFC-e QR Code, TXT→XML conversion, and validation of fiscal identifiers (GTIN, CPF/CNPJ, NCM, CFOP).

> [!NOTE]
> Because the Rust code is not part of this repository, none of the technical claims about the library (types, test counts, benchmark figures) can be verified from this checkout. This site presents what the documentation *states*; treat those figures as documented, not as measured here. See [A note on honesty](#a-note-on-honesty).

## Highlights

- **Comprehensive MDX documentation** — 29 pages (~7,300 lines) covering getting started, the invoice builder, workflow, certificate signing, SEFAZ communication, contingency, the typestate pattern, newtypes, architecture, and more.
- **47 Mermaid diagrams** across 20 pages, rendered by a custom component with zoom, pan, and JPG export.
- **LLM-friendly endpoints** — `/llms.txt`, `/llms-full.txt`, and a rewrite that serves raw Markdown for any docs page at `/docs/<path>.mdx`, so models can consume the docs directly.
- **Per-page Open Graph images** generated dynamically with [`@takumi-rs/image-response`](https://github.com/takumi-rs).
- **Client-side search** powered by Orama via `fumadocs-core`.
- **Benchmark visualizations** — Recharts-based comparison charts on the landing page (data is static; see the honesty note).
- Modern stack: **Next.js 16, React 19, Fumadocs 16, Tailwind v4**.

## Requirements

- **Node.js** 20 or newer (Next.js 16).
- **[Bun](https://bun.sh)** — the repository is pinned with `bun.lock`. You can substitute another package manager, but Bun is the supported path.

## Getting started

```bash
# install dependencies (runs `fumadocs-mdx` via postinstall to generate .source/)
bun install

# start the dev server on http://localhost:3000
bun run dev
```

### Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Next.js dev server (`http://localhost:3000`). |
| `bun run build` | Production build (`next build`). |
| `bun run start` | Serve the production build. |
| `bun run types:check` | Regenerate the MDX/Fumadocs types and type-check with `tsc --noEmit`. |

There is no automated test suite in this repository (it is a content/presentation site). Correctness of the site is checked via `types:check`; correctness of the documented *library* is tracked in the `fiscal-rs` repo.

## Editing the documentation

Docs are plain MDX files in `content/docs/`. Each file has YAML frontmatter (`title`, `description`); the sidebar order and section dividers are defined in `content/docs/meta.json`.

Custom MDX components available in pages (registered in `src/components/mdx.tsx`):

- `<Mermaid chart="..." />` — a diagram with zoom / pan / export.
- `<BenchmarkChart />` and `<BenchmarkResults />` — benchmark tables and charts (data lives in `src/components/benchmark-results.tsx`).

## About the documented library

The pages describe a Cargo workspace of four crates — `fiscal-core`, `fiscal-crypto`, `fiscal-sefaz`, and a `fiscal` facade — and lean on a few notable design choices:

- **Typestate builder** (`Draft → Built → Signed`) so an unsigned invoice cannot be transmitted — the mistake is a compile error, not a runtime one.
- **Parse-don't-validate newtypes** (`TaxId`, `Gtin`, `Ncm`, `Cfop`, `AccessKey`, …) that reject invalid input at construction.
- **Money as integer cents** (`Cents`, an `i64`) to avoid floating-point drift in fiscal totals.
- **Functional Core / Imperative Shell** — pure `fiscal-core` kept separate from the I/O-bearing crypto and SEFAZ layers.

The representative usage example from the docs (typestate builder):

```rust
use fiscal::types::*;
use fiscal::xml_builder::InvoiceBuilder;

let issuer = IssuerData::new(
    "25028332000105", "140950881119", "Minha Empresa", TaxRegime::Normal,
    "35", "3550308", "Rua Principal", "100", "Centro", "SAO PAULO", "01000000",
);
let item = InvoiceItemData::new(
    "001", "Produto Teste", "18069000", "5102", "UN",
    1000, 10000, 10000, "00", 1800, 10000, "01", "01",
);

let invoice = InvoiceBuilder::new(issuer, SefazEnvironment::Homologation, InvoiceModel::NFe)
    .series(1)
    .invoice_number(1)
    .operation_nature("VENDA")
    .add_item(item)
    .payments(vec![PaymentData::new("01", 10000)])
    .build()
    .expect("failed to build invoice");

println!("{}", invoice.access_key());
println!("{}", invoice.xml());
```

> [!IMPORTANT]
> The snippet above is copied from the documentation and targets the `fiscal-rs` crate. It is **not** runnable from this repository — this repo has no Rust code. To try the library, see the [`fiscal-rs`](https://github.com/JoaoHenriqueBarbosa/fiscal-rs) repository.

## Project structure

```
fiscal-rs-docs/
├── content/docs/          # 29 MDX pages + meta.json (sidebar)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (home)/        # landing page
│   │   ├── docs/          # docs layout + [[...slug]] renderer
│   │   ├── api/search/    # Orama search route
│   │   ├── llms.txt/      # LLM-oriented plaintext endpoints
│   │   ├── llms-full.txt/
│   │   └── og/            # dynamic Open Graph images
│   ├── components/        # Mermaid, benchmark chart/results, MDX registry
│   └── lib/               # Fumadocs source loader, shared layout, cn()
├── public/                # logo, OG image, favicons
├── source.config.ts       # Fumadocs MDX config
└── next.config.mjs
```

## A note on honesty

This site was scaffolded and filled in a single day, and it documents a library whose source is not in this repository. A few claims on the site deserve a caveat:

- **Test counts are inconsistent and unverifiable here.** The material shows conflicting figures (`640+`, `739+`, and category sums around `667`). With no code in this repo, none can be confirmed. Where possible this README avoids hardcoding such numbers and points to badges generated by CI instead.
- **Benchmark numbers are static.** The figures on the landing page are hardcoded in `src/components/benchmark-results.tsx` — they are illustrative, not the output of a reproducible run in this repo.
- **FFI bindings are a roadmap item.** The `ffi-bindings` page states the bindings are *planned*. Despite some "use it from any runtime" phrasing on the landing page, `fiscal-rs` is a Rust library today; multi-language bindings are aspirational.
- **License.** The site footer displays "fiscal-rs — MIT License". This documentation repository is released under MIT (see below); the licensing of the separate `fiscal-rs` crate should be confirmed in its own repository.

## Contributing

Contributions to the documentation are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md). Please also read our [Code of Conduct](./CODE_OF_CONDUCT.md). Security reports go to the process in [SECURITY.md](./SECURITY.md).

## License

Released under the [MIT License](./LICENSE).
