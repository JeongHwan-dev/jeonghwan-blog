import { Card, Skeleton } from '@/components/ui';

const ARTICLE_CARD_SKELETON_COUNT = 4;

function ArticleListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: ARTICLE_CARD_SKELETON_COUNT }).map((_, index) => (
        <li key={index}>
          <Card className="gap-0 overflow-hidden p-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className="from-background/20 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
              <Skeleton className="h-full w-full" />
            </div>
            <div className="flex flex-grow flex-col justify-between p-5">
              <div>
                <Skeleton className="mb-4 h-5.5 w-18" />
                <Skeleton className="mb-2 h-7 w-full" />
                <Skeleton className="h-6.5 w-full" />
              </div>
              <Skeleton className="mt-4 h-5 w-30" />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export { ArticleListSkeleton };
