import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const gitConfig = {
  user: 'JoaoHenriqueBarbosa',
  repo: 'fiscal-rs',
  branch: 'master',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo.png" alt="fiscal-rs" width={24} height={24} />
          fiscal-rs
        </>
      ),
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
