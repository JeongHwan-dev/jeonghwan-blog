import type { ComponentProps } from 'react';

import type { Article } from '@/domains/article/services';
import { cn, formatDate } from '@/shared/utils';
import { ArticleCardLayout } from './article-card-layout';
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
            sizes="(max-width: 768px) 100vw, 192px"
            className="rounded-lg"
          />
        ) : undefined
      }
      {...rest}
    >
      <h2 className="group-hover:text-link text-xl font-bold tracking-tight break-keep transition-colors md:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
      )}
      <div className="text-muted-foreground flex flex-wrap gap-x-2 text-sm">
        {date && <time dateTime={date}>{formatDate(date)}</time>}
        {tagList.map((tag) => (
          <span key={tag} className="before:mr-2 before:content-['·'] first:before:content-none">
            {tag}
          </span>
        ))}
      </div>
    </ArticleCardLayout>
  );
}

export { ArticleCard };
