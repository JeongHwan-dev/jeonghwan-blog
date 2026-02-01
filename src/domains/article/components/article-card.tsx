import Image from 'next/image';
import type { ComponentProps } from 'react';

import { Calendar } from 'lucide-react';

import type { Article } from '@/domains/article/services';
import { Card, CardContent } from '@/shared/components';
import { cn, formatDate } from '@/shared/utils';
import { ArticleTagBadge } from './';

interface ArticleCardProps extends Omit<ComponentProps<'div'>, 'title'>, Omit<Article, 'id'> {
  thumbnailImagePriority?: boolean;
}

function ArticleCard({
  className,
  date,
  description,
  tagList = [],
  thumbnailImagePriority = false,
  thumbnailImageUrl,
  title,
  ...rest
}: ArticleCardProps) {
  return (
    <Card
      className={cn(
        'group w-full cursor-pointer gap-0 overflow-hidden border border-border bg-card/50 p-0 shadow-none transition-all duration-300 hover:border-primary/20',
        className,
      )}
      {...rest}
    >
      {thumbnailImageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={thumbnailImageUrl}
            alt=""
            fill
            priority={thumbnailImagePriority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="bg-accent object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="flex flex-grow flex-col justify-between p-4 md:p-5">
        <div>
          {tagList.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 md:mb-4">
              {tagList.map((tag) => (
                <ArticleTagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
          <h2 className="mb-2 font-bold text-lg tracking-tight transition-colors group-hover:text-primary md:text-xl">
            {title}
          </h2>
          {description && (
            <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed md:text-base">
              {description}
            </p>
          )}
        </div>
        <div className="mt-3 flex items-center gap-x-4 text-muted-foreground text-sm md:mt-4">
          {date && (
            <div className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { ArticleCard };
