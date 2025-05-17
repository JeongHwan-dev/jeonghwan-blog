'use client';

import Giscus from '@giscus/react';

function GiscusComments() {
  return (
    <Giscus
      category="Announcements"
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string}
      emitMetadata="0"
      inputPosition="bottom"
      lang="ko"
      loading="lazy"
      mapping="pathname"
      reactionsEnabled="1"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPOSITORY as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID as string}
      strict="0"
      theme="light"
    />
  );
}

export { GiscusComments };
