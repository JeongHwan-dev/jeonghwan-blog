'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const GISCUS_REPOSITORY = process.env.NEXT_PUBLIC_GISCUS_REPOSITORY;

const GISCUS_REPOSITORY_ID = process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID;

const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const isGiscusConfigInvalid =
  GISCUS_REPOSITORY === undefined ||
  GISCUS_REPOSITORY.includes('/') === false ||
  GISCUS_REPOSITORY_ID === undefined ||
  GISCUS_CATEGORY_ID === undefined;

function GiscusComments() {
  const { theme } = useTheme();

  if (isGiscusConfigInvalid) {
    return null;
  }

  return (
    <Giscus
      loading="lazy"
      category="Announcements"
      categoryId={GISCUS_CATEGORY_ID}
      emitMetadata="0"
      inputPosition="bottom"
      lang="ko"
      mapping="pathname"
      reactionsEnabled="1"
      repo={GISCUS_REPOSITORY as `${string}/${string}`}
      repoId={GISCUS_REPOSITORY_ID}
      strict="0"
      theme={theme === 'dark' ? 'dark' : 'light'}
    />
  );
}

export { GiscusComments };
