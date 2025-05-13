import { compile } from '@mdx-js/mdx';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { CalendarDays } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import Image from 'next/image';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { ArticleTagBadge, AspectRatio, Separator } from '@/components';
import { formatDate } from '@/lib/utils';
import { getArticleBySlug } from '@/services';

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

  return (
    <div className="container-padding tossface py-8">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <section>
          {article.thumbnailImageUrl !== undefined && (
            <AspectRatio className="bg-muted mb-6 rounded-md" ratio={16 / 9}>
              <Image
                alt={article.title}
                className="h-full w-full rounded-md object-cover"
                fill
                src={article.thumbnailImageUrl}
              />
            </AspectRatio>
          )}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <div className="flex gap-2">
              {article.tagList?.map((tag) => (
                <Link
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
          <Separator className="my-8" />
          <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
            <MDXRemote
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
                  remarkPlugins: [remarkGfm],
                },
              }}
              source={markdown}
            />
          </div>
        </section>

        {data?.toc !== undefined && (
          <aside className="relative">
            <TableOfContentsCard className="sticky top-[var(--sticky-top)]" itemList={data.toc} />
          </aside>
        )}
      </div>
    </div>
  );
}
