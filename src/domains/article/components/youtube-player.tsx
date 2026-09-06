import type { ComponentProps } from 'react';

import { AspectRatio } from '@/shared/components';
import { cn } from '@/shared/utils';

interface YouTubePlayerProps extends ComponentProps<'div'> {
  videoId: string;
}

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed';

function YouTubePlayer({ videoId, className, ...props }: YouTubePlayerProps) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn('my-6 overflow-hidden rounded-md', className)}
      {...props}
    >
      {/* oxlint-disable-next-line react/iframe-missing-sandbox -- 신뢰하는 YouTube 임베드예요. 재생에 필요한 allow-scripts, allow-same-origin 조합을 이 룰이 허용하지 않아요. */}
      <iframe
        src={`${YOUTUBE_EMBED_URL}/${videoId}`}
        title={`YouTube video player: ${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="size-full border-0"
        loading="lazy"
      />
    </AspectRatio>
  );
}

export { YouTubePlayer };
