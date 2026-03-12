import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'JoaoHenriqueBarbosa',
  repo: 'fiscal-rs',
  branch: 'master',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'fiscal-rs',
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'API Reference',
        url: 'https://docs.rs/fiscal',
        external: true,
      },
      {
        text: 'crates.io',
        url: 'https://crates.io/crates/fiscal',
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
