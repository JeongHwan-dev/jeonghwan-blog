import type { ComponentProps } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

import AuthorAvatarSvg from '#/svgs/img-jeonghwan-avatar.svg';

const authorAvatarVariants = tv({
  base: '',
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
  return <AuthorAvatarSvg className={authorAvatarVariants({ className, size })} {...props} />;
}

export { AuthorAvatar, authorAvatarVariants };
