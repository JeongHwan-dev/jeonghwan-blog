import Link from 'next/link';

import { ArticleCard } from '@/components';
import { type ArticleSort, getArticleTagFilterList, getPublishedArticleList } from '@/services';

import { SortSelect, TagFilterCard } from './_components';

interface HomePageProps {
  searchParams: Promise<{ sort?: ArticleSort; tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { sort = 'latest', tag = '전체' } = await searchParams;

  const [articleList, tagFilterList] = await Promise.all([
    getPublishedArticleList(tag, sort),
    getArticleTagFilterList(),
  ]);

  return (
    <div className="grid grid-cols-[200px_1fr] gap-6 py-8">
      <aside>
        <TagFilterCard selectedTag={tag} tagFilterList={tagFilterList} />
      </aside>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {tag === '전체' ? '전체 글' : `${tag} 관련 글`}
          </h2>
          <SortSelect />
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articleList.map((article, index) => (
            <li key={article.id}>
              <Link className="flex h-full w-full" href={`/articles/${article.slug}`}>
                <ArticleCard
                  author={article.author}
                  date={article.date}
                  description={article.description}
                  slug={article.slug}
                  tagList={article.tagList}
                  thumbnailImagePriority={index < 4}
                  thumbnailImageUrl={article.thumbnailImageUrl}
                  title={article.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
