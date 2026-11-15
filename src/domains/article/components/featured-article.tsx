import Link from 'next/link';

import type { Article } from '@/domains/article/services';
import { Badge } from '@/shared/components';
import { formatDate } from '@/shared/utils';
import { ArticleTagBadge } from './article-tag-badge';
import { ArticleThumbnail } from './article-thumbnail';
import { FeaturedArticleLayout } from './featured-article-layout';

interface FeaturedArticleProps {
  articlePromise: Promise<Article | undefined>;
}

async function FeaturedArticle({ articlePromise }: FeaturedArticleProps) {
  const article = await articlePromise;

  if (article === undefined) {
    return null;
  }

  const { date, description, slug, tagList, thumbnailImageUrl, title } = article;

  return (
    <Link
      href={`/articles/${slug}`}
      aria-label={`${title} 글 읽기`}
      className="group ease-out-quint motion-safe:animate-fade-in block transition-transform duration-200 motion-safe:active:scale-(--press-scale)"
    >
      <FeaturedArticleLayout
        thumbnail={
          <ArticleThumbnail
            src={thumbnailImageUrl || undefined}
            priority
            sizes="(max-width: 768px) 100vw, 380px"
            className="rounded-xl"
          />
        }
      >
        <div className="flex flex-wrap gap-1.5">
          <Badge>NEW</Badge>
          {tagList?.map((tag) => (
            <ArticleTagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="group-hover:text-link line-clamp-3 text-3xl leading-snug font-bold tracking-tight break-keep transition-colors md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground line-clamp-3 leading-relaxed md:text-lg">
            {description}
          </p>
        )}
        {date && (
          <time dateTime={date} className="text-muted-foreground block text-sm">
            {formatDate(date)}
          </time>
        )}
      </FeaturedArticleLayout>
    </Link>
  );
}

export { FeaturedArticle };
