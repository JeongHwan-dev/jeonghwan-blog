import Link from 'next/link';

import { Github, Linkedin, type LucideIcon, Mail } from 'lucide-react';

import { AuthorAvatar, Button, Card, CardContent } from '@/shared/components';
import { PROFILE } from '@/shared/constants';

type SocialLinkType = 'email' | 'externalLink';

interface SocialLinkItem {
  href: string;
  icon: LucideIcon;
  label: string;
  type: SocialLinkType;
}

const SOCIAL_LINK_LIST: SocialLinkItem[] = [
  {
    href: PROFILE.gitHubUrl,
    icon: Github,
    label: 'GitHub',
    type: 'externalLink',
  },
  {
    href: PROFILE.linkedInUrl,
    icon: Linkedin,
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
    <Card className="shadow-none">
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted m-auto mb-4 max-h-36 max-w-36 rounded-full p-2">
            <AuthorAvatar
              size="full"
              role="img"
              aria-label={`${PROFILE.koreanName}의 프로필 이미지`}
              className="rounded-full"
            />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold">{PROFILE.koreanName}</h2>
            <p className="text-primary text-sm">{PROFILE.job}</p>
          </div>

          <nav aria-label="소셜 링크" className="flex justify-center gap-2">
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
                <Button key={label} asChild size="icon" variant="ghost" className="bg-primary/10">
                  <Link aria-label={label} {...linkProps}>
                    <Icon aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileCard };
