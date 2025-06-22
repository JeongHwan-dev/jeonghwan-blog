import type { MDXComponents } from 'mdx/types';

function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

export { useMDXComponents };
