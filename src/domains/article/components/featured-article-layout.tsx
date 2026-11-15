import type { PropsWithChildren, ReactNode } from 'react';

interface FeaturedArticleLayoutProps extends PropsWithChildren {
  thumbnail: ReactNode;
}

function FeaturedArticleLayout({ children, thumbnail }: FeaturedArticleLayoutProps) {
  return (
    <div className="grid items-center gap-5 md:grid-cols-[3fr_2fr] md:gap-10">
      <div className="md:order-last">{thumbnail}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export { FeaturedArticleLayout };
