import { type NextRequest, NextResponse } from 'next/server';

import { getPublishedArticleList } from '@/domains/article/services';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get('tag') || undefined;
  const sort = searchParams.get('sort') || undefined;
  const startCursor = searchParams.get('startCursor') || undefined;
  const pageSize = Number(searchParams.get('pageSize')) || undefined;
  const excludeFeatured = searchParams.get('excludeFeatured') === 'true';

  const response = await getPublishedArticleList({
    excludeFeatured,
    pageSize,
    sort,
    startCursor,
    tag,
  });

  return NextResponse.json(response);
}
