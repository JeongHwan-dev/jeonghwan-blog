import Link from 'next/link';
import type { ComponentProps } from 'react';

import { type MDXComponents, MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { cn, isInternalLink } from '@/shared/utils';
import { CodeCopyButton } from './code-copy-button';
import { YouTubePlayer } from './youtube-player';

type CustomMDXProps = MDXRemoteProps;

function CustomLink({ className, href, ...rest }: ComponentProps<'a'>) {
  if (href === null || href === undefined) {
    return <span className={cn('text-muted-foreground', className)} {...rest} />;
  }

  const isInternal = isInternalLink(href);
  const linkClassName = cn('text-link break-all underline underline-offset-4', className);

  if (isInternal) {
    return <Link href={href} className={linkClassName} {...rest} />;
  }

  return (
    // oxlint-disable-next-line jsx-a11y/anchor-has-content -- MDX가 children을 rest로 전달합니다.
    <a href={href} rel="noopener noreferrer" target="_blank" className={linkClassName} {...rest} />
  );
}

function CustomBlockquote({ className, ...rest }: ComponentProps<'blockquote'>) {
  return <blockquote className={cn('custom-mdx-blockquote', className)} {...rest} />;
}

function CustomCode({ className, ...rest }: ComponentProps<'code'>) {
  return <code className={cn('custom-mdx-code', className)} {...rest} />;
}

function CustomFigure({ children, className, ...rest }: ComponentProps<'figure'>) {
  const isCodeFigure = 'data-rehype-pretty-code-figure' in rest;

  return (
    <figure className={cn('relative', className)} {...rest}>
      {children}
      {isCodeFigure && <CodeCopyButton />}
    </figure>
  );
}

function CustomImage({ alt, className, ...rest }: ComponentProps<'img'>) {
  // oxlint-disable-next-line nextjs/no-img-element -- next/image is not supported in the server component
  return <img alt={alt} className={cn('rounded-lg', className)} {...rest} />;
}

const customComponents: MDXComponents = {
  a: CustomLink,
  blockquote: CustomBlockquote,
  code: CustomCode,
  figure: CustomFigure,
  img: CustomImage,
  YouTubePlayer: YouTubePlayer,
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
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                defaultLang: {
                  block: 'plaintext',
                },
                keepBackground: false,
                theme: {
                  dark: 'github-dark-dimmed',
                  light: 'github-light',
                },
              },
            ],
          ],
          remarkPlugins: [remarkGfm],
        },
        ...options,
      }}
      {...rest}
    />
  );
}

export { CustomMDX };
