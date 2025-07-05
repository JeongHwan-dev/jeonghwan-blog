import { type MDXComponents, MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

interface CustomMDXProps extends MDXRemoteProps {}

const customComponents: MDXComponents = {
  a: ({ children, className, ...props }) => (
    <Link
      {...props}
      className={cn('break-all', className)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  ),
  img: ({ className, ...props }) => <img {...props} className={cn('rounded-md', className)} />,
};

function CustomMDX({ components, options, ...rest }: CustomMDXProps) {
  return (
    <MDXRemote
      components={{
        ...customComponents,
        ...components,
      }}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
          remarkPlugins: [remarkGfm],
        },
        ...options,
      }}
      {...rest}
    />
  );
}

export { CustomMDX };
