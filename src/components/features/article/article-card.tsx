import type { ComponentProps } from 'react';

import { Calendar } from 'lucide-react';
import Image from 'next/image';

import type { Article } from '@/services';

import { ArticleTagBadge, Card, CardContent } from '@/components';
import { cn, formatDate } from '@/lib/utils';

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
        'group bg-card/50 border-border hover:border-primary/20 w-full cursor-pointer gap-0 overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300',
        className,
      )}
      {...rest}
    >
      {thumbnailImageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            alt={`${title} 글의 썸네일 이미지`}
            className="bg-accent object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            priority={thumbnailImagePriority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={thumbnailImageUrl}
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
          <h2 className="group-hover:text-primary mb-2 text-lg font-bold tracking-tight transition-colors md:text-xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed md:text-base">
              {description}
            </p>
          )}
        </div>
        <div className="text-muted-foreground mt-3 flex items-center gap-x-4 text-sm md:mt-4">
          {date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(date)}</time>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { ArticleCard };
