import Link from 'next/link';

import {
  ArticleCard,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { getArticleTagFilterList, getPublishedArticleList } from '@/services';

import { TagFilterCard } from './_components';

interface HomePageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { tag = '전체' } = await searchParams;

  const [articleList, tagFilterList] = await Promise.all([
    getPublishedArticleList(tag),
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
          <Select defaultValue="latest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬 방식 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articleList.map((article) => (
            <li key={article.id}>
              <Link className="flex h-full w-full" href={`/articles/${article.slug}`}>
                <ArticleCard
                  author={article.author}
                  date={article.date}
                  description={article.description}
                  slug={article.slug}
                  tagList={article.tagList}
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
