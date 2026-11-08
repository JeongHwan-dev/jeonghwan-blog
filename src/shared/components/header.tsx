import Link from 'next/link';
import type { ElementType } from 'react';

import { Menu } from 'lucide-react';

import GithubIcon from '#/svgs/icon-github.svg';
import LinkedinIcon from '#/svgs/icon-linkedin.svg';
import { PROFILE } from '@/shared/constants';
import { AuthorAvatar } from './author-avatar';
import { Button } from './button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './drawer';
import { ThemeToggleButton } from './theme-toggle-button';

interface SocialLink {
  href: string;
  icon: ElementType;
  label: string;
}

const SOCIAL_LINK_LIST: SocialLink[] = [
  {
    href: PROFILE.gitHubUrl,
    icon: GithubIcon,
    label: 'GitHub',
  },
  {
    href: PROFILE.linkedInUrl,
    icon: LinkedinIcon,
    label: 'LinkedIn',
  },
];

function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-[var(--header-height)] w-full border-b border-dashed backdrop-blur">
      <div className="container flex h-full items-center justify-between gap-2 md:gap-4">
        <Link href="/" className="mr-4 flex items-center gap-0.5">
          <AuthorAvatar size="sm" aria-hidden="true" />
          <span className="font-bold lg:inline-block">{`Jeonghwan's Blog`}</span>
        </Link>

        <div className="flex items-center gap-0.5 md:gap-4">
          <div className="flex items-center gap-0.5">
            <nav className="hidden items-center gap-0.5 md:flex">
              {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
                <Button key={label} asChild size="icon" variant="ghost">
                  <Link
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${label} 프로필 보기`}
                  >
                    <Icon />
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggleButton />
            </div>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="메뉴 열기"
                className="md:hidden"
              >
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="sr-only">메뉴</DrawerTitle>
              <div className="mx-auto flex w-full flex-col gap-2 p-6">
                {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${label} 프로필 보기`}
                    className="text-foreground/80 hover:bg-accent hover:text-foreground/100 active:bg-accent active:text-foreground/100 flex items-center justify-center gap-1 rounded py-2 transition"
                  >
                    <Icon width={20} height={20} />
                    {label}
                  </Link>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export { Header };
