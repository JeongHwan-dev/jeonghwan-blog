import type { PropsWithChildren } from 'react';

interface VisuallyHiddenProps extends PropsWithChildren {
  as?: 'div' | 'span';
}

function VisuallyHidden({ as: Component = 'div', children }: VisuallyHiddenProps) {
  return <Component className="sr-only">{children}</Component>;
}

export { VisuallyHidden };
