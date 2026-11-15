import Image from 'next/image';

import { cn } from '@/shared/utils';

interface ArticleThumbnailProps {
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  src?: string;
}

function ArticleThumbnail({
  alt = '',
  className,
  priority = false,
  sizes,
  src,
}: ArticleThumbnailProps) {
  return (
    <div className={cn('bg-muted relative aspect-video overflow-hidden', className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-400 ease-[ease] motion-safe:group-hover:scale-[1.15]"
        />
      )}
    </div>
  );
}

export { ArticleThumbnail };
