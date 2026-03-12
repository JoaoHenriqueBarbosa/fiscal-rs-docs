import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';
import { BenchmarkFastOps, BenchmarkMediumOps, BenchmarkHeavyOps, BenchmarkSpeedup } from './benchmark-results';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Mermaid,
    BenchmarkFastOps,
    BenchmarkMediumOps,
    BenchmarkHeavyOps,
    BenchmarkSpeedup,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
