# Security Policy

## Supported Versions

This is the documentation site for `fiscal-rs`. Security fixes are applied to the latest `main` branch, which is what gets deployed.

| Version | Supported |
| ------- | --------- |
| `main` (latest) | ✅ |
| older commits | ❌ |

Vulnerabilities in the `fiscal-rs` **library** itself should be reported in its own repository: <https://github.com/JoaoHenriqueBarbosa/fiscal-rs>.

## Reporting a Vulnerability

Please report security issues privately — **do not** open a public issue.

Email **joaohenriquebarbosa21@gmail.com** with:

- a description of the vulnerability,
- steps to reproduce (or a proof of concept),
- the affected route, component, or dependency,
- any suggested remediation.

You will receive an acknowledgment within **72 hours**.

## Process

1. **Report received** — we confirm receipt within 72 hours.
2. **Triage** — we assess severity and reproduce the issue.
3. **Fix** — we develop and test a fix on a private branch.
4. **Disclosure** — we coordinate a disclosure timeline with you.
5. **Release** — the fix is merged and deployed, and you are credited (unless you prefer to remain anonymous).

## Scope

This project is a static Next.js documentation site. Relevant concerns include:

- Injection or unsafe input handling (e.g. MDX rendering, search input, dynamic OG-image routes).
- Data or credential exposure (e.g. secrets accidentally committed or leaked at build time).
- Dependency vulnerabilities in the npm/Bun dependency tree.

Out of scope: purely cosmetic issues, and vulnerabilities in the documented `fiscal-rs` crate (report those in the crate's repository).
