import { compile } from '@mdx-js/mdx';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { CalendarDays } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { ArticleTagBadge, AspectRatio, GiscusComments, Separator } from '@/components';
import { cn, formatDate } from '@/lib/utils';
import { getArticleBySlug, getPublishedArticleList } from '@/services';

import { TableOfContentsCard } from './_components';

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const { article, markdown } = await getArticleBySlug(slug);

  const { data } = await compile(markdown, {
    rehypePlugins: [rehypeSlug, rehypeSanitize, withToc, withTocExport],
  });

  if (article === null) {
    notFound();
  }

  return (
    <div className="tossface grid grid-cols-1 gap-8 md:grid-cols-[1fr_240px]">
      <section>
        {article.thumbnailImageUrl !== undefined && (
          <AspectRatio className="bg-muted mb-6 rounded-md" ratio={16 / 9}>
            <Image
              alt={article.title}
              className="h-full w-full rounded-md object-cover"
              fill
              priority
              src={article.thumbnailImageUrl}
            />
          </AspectRatio>
        )}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold md:text-4xl">{article.title}</h1>
          <div className="flex gap-2">
            {article.tagList?.map((tag) => (
              <Link
                className="flex"
                href={{
                  pathname: '/',
                  query: {
                    tag,
                  },
                }}
                key={tag}
              >
                <ArticleTagBadge
                  className="hover:bg-primary/20 active:bg-primary/20 transition-colors"
                  tag={tag}
                />
              </Link>
            ))}
          </div>
          <div className="text-muted-foreground flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <time>{formatDate(article.date)}</time>
            </div>
          </div>
        </div>
        <Separator className="my-6 lg:my-8" />
        {data?.toc !== undefined && (
          <div className="mb-6 md:hidden">
            <TableOfContentsCard itemList={data.toc} />
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
          <MDXRemote
            components={{
              img: ({ alt, className, src, ...props }) => (
                <img alt={alt || ''} className={cn('rounded-md', className)} src={src} {...props} />
              ),
            }}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
                remarkPlugins: [remarkGfm],
              },
            }}
            source={markdown}
          />
        </div>
        <Separator className="my-16" />
        <GiscusComments />
      </section>

      {data?.toc !== undefined && (
        <aside className="relative hidden md:block">
          <TableOfContentsCard className="sticky top-[var(--sticky-top)]" itemList={data.toc} />
        </aside>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { articleList } = await getPublishedArticleList({
    pageSize: 100,
    startCursor: undefined,
  });

  return articleList.map(({ slug }) => ({ slug }));
}

export const revalidate = 60;
