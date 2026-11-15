import { ArticleCardSkeleton } from './article-card-skeleton';

function ArticleListSkeleton() {
  return (
    <ul className="divide-y">
      {Array.from({ length: 7 }, (_, index) => (
        <li key={index}>
          <ArticleCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export { ArticleListSkeleton };
