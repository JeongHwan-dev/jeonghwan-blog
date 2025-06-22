import { Separator, Skeleton } from '@/components';

export default function ArticleLoadingPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_240px]">
      <section>
        <Skeleton className="mb-6 aspect-[16/9] h-auto w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-full md:h-10" />
          <Skeleton className="h-5.5 w-20" />
          <Skeleton className="h-5 w-30" />
        </div>
        <Separator className="my-6 lg:my-8" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>
      </section>
      <aside className="relative hidden md:block">
        <Skeleton className="sticky top-[var(--sticky-top)] h-80 w-full" />
      </aside>
    </div>
  );
}
