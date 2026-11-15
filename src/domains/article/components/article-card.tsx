import type { ComponentProps } from 'react';

import type { Article } from '@/domains/article/services';
import { cn, formatDate } from '@/shared/utils';
import { ArticleCardLayout } from './article-card-layout';
import { ArticleTagBadge } from './article-tag-badge';
import { ArticleThumbnail } from './article-thumbnail';

interface ArticleCardProps
  extends Omit<ComponentProps<'div'>, 'title'>, Omit<Article, 'id' | 'slug'> {
  thumbnailImagePriority?: boolean;
}

const EMPTY_TAG_LIST: NonNullable<Article['tagList']> = [];

function ArticleCard({
  className,
  date,
  description,
  tagList = EMPTY_TAG_LIST,
  thumbnailImagePriority = false,
  thumbnailImageUrl,
  title,
  ...rest
}: ArticleCardProps) {
  return (
    <ArticleCardLayout
      className={cn('group', className)}
      thumbnail={
        thumbnailImageUrl ? (
          <ArticleThumbnail
            src={thumbnailImageUrl}
            priority={thumbnailImagePriority}
            sizes="(max-width: 768px) 100vw, 217px"
            className="rounded-lg"
          />
        ) : undefined
      }
      {...rest}
    >
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tagList.map((tag) => (
            <ArticleTagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
      <h2 className="group-hover:text-link text-xl font-bold tracking-tight break-keep transition-colors md:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
      )}
      {date && (
        <time dateTime={date} className="text-muted-foreground block text-sm">
          {formatDate(date)}
        </time>
      )}
    </ArticleCardLayout>
  );
}

export { ArticleCard };
