import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import AuthorAvatarSvg from '#/svgs/img-jeonghwan-avatar.svg';
import { cn } from '@/shared/utils';

const authorAvatarVariants = cva('', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      full: 'size-full',
      lg: 'size-32',
      md: 'size-16',
      sm: 'size-11',
    },
  },
});

type AuthorAvatarProps = Omit<ComponentProps<typeof AuthorAvatarSvg>, 'width' | 'height'> &
  VariantProps<typeof authorAvatarVariants>;

function AuthorAvatar({ className, size, ...props }: AuthorAvatarProps) {
  return <AuthorAvatarSvg className={cn(authorAvatarVariants({ size }), className)} {...props} />;
}

export { AuthorAvatar, authorAvatarVariants };
