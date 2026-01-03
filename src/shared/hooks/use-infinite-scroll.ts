import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  /**
   * 다음 페이지를 가져오는 함수
   */
  fetchNextPage: () => Promise<unknown>;
  /**
   * 다음 페이지가 있는지 여부
   */
  hasNextPage: boolean;
  /**
   * 요소가 뷰포트에 보이는지 여부
   */
  inView: boolean;
  /**
   * 현재 다음 페이지를 가져오는 중인지 여부
   */
  isFetchingNextPage: boolean;
}

/**
 * 무한 스크롤을 위한 커스텀 훅
 *
 * 요소가 뷰포트에 보이고, 다음 페이지가 있으며, 현재 로딩 중이 아닐 때
 * 자동으로 다음 페이지를 가져옵니다.
 *
 * @param props - UseInfiniteScrollProps
 * @param props.inView - 요소가 뷰포트에 보이는지 여부
 * @param props.hasNextPage - 다음 페이지가 있는지 여부
 * @param props.isFetchingNextPage - 현재 다음 페이지를 가져오는 중인지 여부
 * @param props.fetchNextPage - 다음 페이지를 가져오는 함수
 */
function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  inView,
  isFetchingNextPage,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const shouldFetchNextPage = inView && hasNextPage && !isFetchingNextPage;

    if (shouldFetchNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);
}

export { useInfiniteScroll };
