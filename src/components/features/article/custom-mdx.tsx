import type { ComponentProps } from 'react';

import { type MDXComponents, MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { cn, isInternalLink } from '@/lib/utils';

interface CustomMDXProps extends MDXRemoteProps {}

function CustomLink({ className, href, ...rest }: ComponentProps<'a'>) {
  if (href === null || href === undefined) {
    return <span className={cn('text-muted-foreground', className)} {...rest} />;
  }

  const isInternal = isInternalLink(href);
  const linkClassName = cn(
    'hover:text-primary text-muted-foreground break-all transition-colors',
    className,
  );

  if (isInternal) {
    return <Link className={linkClassName} href={href} {...rest} />;
  }

  return (
    <a className={linkClassName} href={href} rel="noopener noreferrer" target="_blank" {...rest} />
  );
}

const CustomBlockquote = ({ className, ...rest }: ComponentProps<'blockquote'>) => (
  <blockquote className={cn('custom-mdx-blockquote', className)} {...rest} />
);

function CustomCode({ className, ...rest }: ComponentProps<'code'>) {
  return <code className={cn('custom-mdx-code', className)} {...rest} />;
}

function CustomImage({ alt, className, ...rest }: ComponentProps<'img'>) {
  return <img alt={alt} className={cn('rounded-md', className)} {...rest} />;
}

const customComponents: MDXComponents = {
  a: CustomLink,
  blockquote: CustomBlockquote,
  code: CustomCode,
  img: CustomImage,
} as const;

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
