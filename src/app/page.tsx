import { getArticleTagFilterList } from '@/services';

import { TagFilterCard } from './_components';

interface HomePageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { tag = '전체' } = await searchParams;

  const tagFilterList = await getArticleTagFilterList();

  return (
    <div className="grid grid-cols-[200px_1fr_220px] gap-6 py-8">
      <aside>
        <TagFilterCard tagFilterList={tagFilterList} />
      </aside>
      home
    </div>
  );
}
