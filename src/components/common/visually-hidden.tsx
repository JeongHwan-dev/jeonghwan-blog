import type { PropsWithChildren } from 'react';

interface VisuallyHiddenProps extends PropsWithChildren {
  as?: 'div' | 'span';
}

function VisuallyHidden({ children, as: Component = 'div' }: VisuallyHiddenProps) {
  return <Component className="sr-only">{children}</Component>;
}

export { VisuallyHidden };
