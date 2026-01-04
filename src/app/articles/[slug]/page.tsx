import type { Metadata } from 'next';

import { compile } from '@mdx-js/mdx';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

import {
  ArticleTagBadge,
  CustomMDX,
  GiscusComments,
  TableOfContentsCard,
} from '@/domains/article/components';
import { getArticleBySlug, getPublishedArticleList } from '@/domains/article/services';
import { AspectRatio, Separator } from '@/shared/components';
import { PROFILE } from '@/shared/constants';
import { formatDate } from '@/shared/utils';

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (article === null) {
    return {
      description: '페이지 주소가 정확한지 확인해 주세요',
      title: '페이지를 찾지 못했어요',
    };
  }

  const { date, description, tagList, thumbnailImageUrl, title } = article;
  const url = `/articles/${slug}`;

  return {
    alternates: {
      canonical: url,
    },
    authors: [
      {
        name: PROFILE.koreanName,
      },
    ],
    description,
    keywords: tagList,
    openGraph: {
      authors: PROFILE.koreanName,
      description,
      images:
        thumbnailImageUrl === undefined
          ? undefined
          : [
              {
                alt: title,
                height: 675,
                url: thumbnailImageUrl,
                width: 1200,
              },
            ],
      publishedTime: date,
      tags: tagList,
      title,
      type: 'article',
      url,
    },
    publisher: PROFILE.koreanName,
    title,
    twitter: {
      card: 'summary_large_image',
      images: thumbnailImageUrl === undefined ? undefined : [thumbnailImageUrl],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { articleList } = await getPublishedArticleList({
    pageSize: 100,
  });

  return articleList.map(({ slug }) => ({ slug }));
}

export const revalidate = 3600;

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
          <AspectRatio ratio={16 / 9} className="bg-muted mb-6 rounded-md">
            <Image
              src={article.thumbnailImageUrl}
              alt={article.title}
              fill
              priority
              className="size-full rounded-md object-cover"
            />
          </AspectRatio>
        )}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold md:text-4xl">{article.title}</h1>
          <div className="flex gap-2">
            {article.tagList?.map((tag) => (
              <Link
                key={tag}
                href={{
                  pathname: '/',
                  query: {
                    tag,
                  },
                }}
                aria-label={`${tag} 태그가 있는 다른 글 보기`}
                className="flex"
              >
                <ArticleTagBadge
                  tag={tag}
                  className="hover:bg-primary/20 active:bg-primary/20 transition-colors"
                />
              </Link>
            ))}
          </div>
          <div className="text-muted-foreground flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="size-4" />
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
          <CustomMDX source={markdown} />
        </div>
        <Separator className="my-16" />
        <GiscusComments />
      </section>

      {data?.toc !== undefined && (
        <aside className="relative hidden md:block">
          <TableOfContentsCard itemList={data.toc} className="sticky top-[var(--sticky-top)]" />
        </aside>
      )}
    </div>
  );
}
