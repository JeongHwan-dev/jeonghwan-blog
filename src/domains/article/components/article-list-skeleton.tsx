import { ArticleCardSkeleton } from './article-card-skeleton';

function ArticleListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index}>
          <ArticleCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export { ArticleListSkeleton };
