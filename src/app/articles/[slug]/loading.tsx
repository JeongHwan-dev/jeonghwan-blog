import { Skeleton, SkeletonText } from '@/shared/components';

const PARAGRAPH_LAST_LINE_WIDTH_LIST = ['w-2/3', 'w-1/2', 'w-4/5'];

export default function ArticleLoadingPage() {
  return (
    <div>
      <div className="max-w-article mx-auto w-full">
        <Skeleton className="mb-8 aspect-video rounded-xl" />
        <div className="mb-10 flex flex-col gap-5">
          <div className="text-4xl leading-tight md:text-5xl">
            <SkeletonText className="w-3/4" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="size-11 rounded-full" />
            <SkeletonText className="w-9" />
            <SkeletonText className="w-26" />
          </div>
        </div>
        <div className="prose max-w-none space-y-[1.25em]">
          {PARAGRAPH_LAST_LINE_WIDTH_LIST.map((lastLineWidth) => (
            <div key={lastLineWidth}>
              <SkeletonText />
              <SkeletonText />
              <SkeletonText className={lastLineWidth} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
