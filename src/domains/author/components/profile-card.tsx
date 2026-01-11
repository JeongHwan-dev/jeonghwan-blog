import { Github, Linkedin, type LucideIcon, Mail } from 'lucide-react';
import Link from 'next/link';

import { Button, Card, CardContent } from '@/shared/components';
import { PROFILE } from '@/shared/constants';
import JeonghwanAvatar from '@svgs/img-jeonghwan-avatar.svg';

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
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-2">
              <div className="size-36 overflow-hidden rounded-full">
                <JeonghwanAvatar
                  aria-label={`${PROFILE.koreanName}의 프로필 이미지`}
                  className="size-fit"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-lg font-bold">{PROFILE.koreanName}</span>
            <p className="text-primary text-sm">{PROFILE.job}</p>
          </div>

          <div className="flex justify-center gap-2">
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
                  <Link {...linkProps} aria-label={label}>
                    <Icon className="size-4" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileCard };
