import Link from 'next/link';

import type { ArticleTagFilterItem } from '@/services';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TagFilterCardProps {
  tagFilterList: ArticleTagFilterItem[];
}

function TagFilterCard({ tagFilterList }: TagFilterCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col gap-3">
          {tagFilterList.map(({ count, id, name }) => (
            <Link
              href={{
                pathname: '/',
                query: {
                  tag: name,
                },
              }}
              key={id}
            >
              <div className="hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors">
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
