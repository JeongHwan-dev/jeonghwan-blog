import Link from 'next/link';
import type { ElementType } from 'react';

import { Mail } from 'lucide-react';

import GithubIcon from '#/svgs/icon-github.svg';
import LinkedinIcon from '#/svgs/icon-linkedin.svg';
import { AuthorAvatar, Button } from '@/shared/components';
import { PROFILE } from '@/shared/constants';

type SocialLinkType = 'email' | 'externalLink';

interface SocialLinkItem {
  href: string;
  icon: ElementType;
  label: string;
  type: SocialLinkType;
}

const SOCIAL_LINK_LIST: SocialLinkItem[] = [
  {
    href: PROFILE.gitHubUrl,
    icon: GithubIcon,
    label: 'GitHub',
    type: 'externalLink',
  },
  {
    href: PROFILE.linkedInUrl,
    icon: LinkedinIcon,
    label: 'LinkedIn',
    type: 'externalLink',
  },
  {
    href: PROFILE.email,
    icon: Mail,
    label: 'Email',
    type: 'email',
  },
];

function ProfileCard() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="bg-muted size-16 shrink-0 rounded-full p-1">
        <AuthorAvatar size="full" className="rounded-full" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-bold">{PROFILE.koreanName}</p>
        <p className="text-muted-foreground text-sm">{PROFILE.job}</p>
      </div>

      <nav aria-label="소셜 링크" className="flex gap-1">
        {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label, type }) => {
          const linkProps =
            type === 'email'
              ? {
                  href: `mailto:${href}`,
                }
              : {
                  href,
                  rel: 'noopener noreferrer',
                  target: '_blank',
                };

          return (
            <Button key={label} asChild size="icon" variant="ghost" className="bg-muted">
              <Link aria-label={label} {...linkProps}>
                <Icon aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

export { ProfileCard };
