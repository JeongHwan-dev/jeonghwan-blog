import { Github, Linkedin, type LucideIcon, Mail } from 'lucide-react';
import Link from 'next/link';

import { Button, Card, CardContent } from '@/components';
import { PROFILE } from '@/constants';
import JeonghwanAvatar from '@svgs/img-jeonghwan-avatar.svg';

interface SocialLinkItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SOCIAL_LINK_LIST: SocialLinkItem[] = [
  {
    href: PROFILE.gitHubUrl,
    icon: Github,
    label: 'GitHub',
  },
  {
    href: PROFILE.linkedInUrl,
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: PROFILE.email,
    icon: Mail,
    label: 'Email',
  },
];

function ProfileCard() {
  return (
    <Card className="shadow-none">
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-2">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <JeonghwanAvatar
                  aria-label={`${PROFILE.koreanName}의 프로필 이미지`}
                  height={144}
                  role="img"
                  width={144}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold">{PROFILE.koreanName}</h3>
            <p className="text-primary text-sm">{PROFILE.job}</p>
          </div>

          <div className="flex justify-center gap-2">
            {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
              <Button asChild className="bg-primary/10" key={label} size="icon" variant="ghost">
                <Link
                  aria-label={label}
                  href={label === 'Email' ? `mailto:${href}` : href}
                  rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                  target={label === 'Email' ? undefined : '_blank'}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileCard };
