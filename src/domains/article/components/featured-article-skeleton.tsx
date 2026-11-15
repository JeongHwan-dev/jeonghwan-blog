import { Skeleton, SkeletonText } from '@/shared/components';
import { FeaturedArticleLayout } from './featured-article-layout';

function FeaturedArticleSkeleton() {
  return (
    <FeaturedArticleLayout thumbnail={<Skeleton className="aspect-video rounded-xl" />}>
      <div className="flex gap-1.5">
        <Skeleton className="h-5.5 w-11 rounded-sm" />
        <Skeleton className="h-5.5 w-14 rounded-sm" />
      </div>
      <div className="text-3xl leading-snug md:text-4xl">
        <SkeletonText />
        <SkeletonText className="md:w-3/5" />
        <SkeletonText className="w-3/5 md:hidden" />
      </div>
      <div className="leading-relaxed md:text-lg">
        <SkeletonText />
        <SkeletonText className="w-1/3" />
      </div>
      <SkeletonText className="w-40 text-sm" />
    </FeaturedArticleLayout>
  );
}

export { FeaturedArticleSkeleton };
