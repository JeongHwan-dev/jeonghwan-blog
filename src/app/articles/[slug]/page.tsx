import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { compile } from '@mdx-js/mdx';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

import {
  ArticleTagBadge,
  ArticleThumbnail,
  CustomMDX,
  GiscusComments,
  TableOfContents,
} from '@/domains/article/components';
import { getArticleBySlug, getPublishedArticleList } from '@/domains/article/services';
import { ProfileCard } from '@/domains/author/components';
import { AuthorAvatar } from '@/shared/components';
import { PROFILE } from '@/shared/constants';
import { formatDate } from '@/shared/utils';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
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

  if (article === null) {
    notFound();
  }

  const { data } = await compile(markdown, {
    rehypePlugins: [
      rehypeSlug,
      withToc,
      withTocExport,
      [
        rehypeSanitize,
        {
          ...defaultSchema,
          tagNames: [...(defaultSchema.tagNames || []), 'YouTubePlayer'],
          attributes: {
            ...defaultSchema.attributes,
            YouTubePlayer: ['videoId'],
          },
        },
      ],
    ],
  });

  return (
    <div className="tossface">
      <div className="max-w-article mx-auto w-full">
        <article>
          {article.thumbnailImageUrl && (
            <ArticleThumbnail
              src={article.thumbnailImageUrl}
              alt={article.title}
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="motion-safe:animate-fade-in mb-8 rounded-xl"
            />
          )}
          <div className="motion-safe:animate-fade-in mb-10 flex flex-col gap-5">
            <h1 className="text-4xl leading-tight font-bold tracking-tight break-keep md:text-5xl">
              {article.title}
            </h1>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <AuthorAvatar size="sm" aria-hidden="true" className="bg-muted rounded-full" />
              <span className="text-foreground font-medium">{PROFILE.koreanName}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <nav aria-label="태그 목록" className="flex flex-wrap gap-2">
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
                    className="hover:bg-border active:bg-border transition-colors"
                  />
                </Link>
              ))}
            </nav>
          </div>
          <div className="prose prose-headings:scroll-mt-[var(--header-height)] prose-headings:font-bold prose-headings:tracking-tight max-w-none">
            <CustomMDX source={markdown} />
          </div>
        </article>

        <div className="my-16 border-y py-8">
          <ProfileCard />
        </div>
        <GiscusComments />
      </div>

      {data?.toc !== undefined && <TableOfContents itemList={data.toc} />}
    </div>
  );
}
