import type { Toc, TocEntry } from '@stefanprobst/rehype-extract-toc';
import type { ComponentProps } from 'react';

import Link from 'next/link';

interface TableOfContentsCardProps extends ComponentProps<'div'> {
  itemList: Toc;
}

type TableOfContentsLinkProps = TocEntry;

function TableOfContentsCard({ itemList, ...rest }: TableOfContentsCardProps) {
  return (
    <div {...rest}>
      <div className="bg-muted/60 space-y-4 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold">목차</h3>
        <nav aria-label="글 목차 네비게이션" className="space-y-3 text-sm">
          {itemList.map(({ children, depth, id, value }) => (
            <TableOfContentsLink key={id} id={id} value={value} depth={depth}>
              {children}
            </TableOfContentsLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

function TableOfContentsLink({ children = [], id, value }: TableOfContentsLinkProps) {
  return (
    <div className="space-y-2">
      <Link
        key={id}
        href={{
          hash: id,
        }}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {value}
      </Link>
      {children.length > 0 && (
        <div className="space-y-2 pl-4">
          {children.map((subItem) => (
            <TableOfContentsLink
              key={subItem.id}
              id={subItem.id}
              value={subItem.value}
              depth={subItem.depth}
            >
              {subItem.children}
            </TableOfContentsLink>
          ))}
        </div>
      )}
    </div>
  );
}

export { TableOfContentsCard };
