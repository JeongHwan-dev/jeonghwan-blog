import Link from 'next/link';

import type { ArticleTagFilterItem } from '@/services';

import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { cn } from '@/lib/utils';

interface TagFilterCardProps {
  selectedTag?: string;
  tagFilterList: ArticleTagFilterItem[];
}

function TagFilterCard({ selectedTag, tagFilterList }: TagFilterCardProps) {
  return (
    <Card className="gap-4 px-2 shadow-none">
      <CardHeader className="flex px-3 py-2">
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <nav className="flex flex-col gap-3">
          {tagFilterList.map(({ count, id, name }) => (
            <Link
              href={{
                query: {
                  tag: name,
                },
              }}
              key={id}
            >
              <div
                className={cn(
                  'hover:bg-muted-foreground/10 active:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 px-3 py-2 text-sm transition-colors',
                  selectedTag === name && 'bg-primary-foreground text-primary font-medium',
                )}
              >
                <span>{name}</span>
                <span>{count}</span>
              </div>
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

export { TagFilterCard };
