import Link from 'next/link';
import type { ElementType } from 'react';

import { Github, Linkedin, Menu } from 'lucide-react';

import JeonghwanAvatar from '#/svgs/img-jeonghwan-avatar.svg';
import { Button } from './button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './drawer';
import { ThemeToggleButton } from './theme-toggle-button';
import { VisuallyHidden } from './visually-hidden';

interface PageNavLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  icon: ElementType;
  label: string;
}

const PAGE_NAV_LINK_LIST: PageNavLink[] = [
  // {
  //   href: '/about',
  //   label: '개발자 소개',
  // },
];

const SOCIAL_LINK_LIST: SocialLink[] = [
  {
    href: 'https://github.com/jeonghwan-dev',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/jeonghwan-dev/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
];

function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-[var(--header-height)] w-full border-b border-dashed backdrop-blur">
      <div className="container flex h-full items-center justify-between gap-2 md:gap-4">
        <Link href="/" className="mr-4 flex items-center gap-0.5">
          <JeonghwanAvatar width={44} height={44} />
          <span className="font-bold lg:inline-block">{`Jeonghwan's Blog`}</span>
        </Link>

        <div className="flex items-center gap-0.5 md:gap-4">
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {PAGE_NAV_LINK_LIST.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-foreground/100 active:text-foreground/100 text-foreground/80 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

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
              <VisuallyHidden>
                <DrawerTitle>메뉴</DrawerTitle>
              </VisuallyHidden>
              <div className="mx-auto flex w-full flex-col gap-2 p-6">
                {PAGE_NAV_LINK_LIST.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:bg-accent hover:text-foreground/100 active:bg-accent active:text-foreground/100 text-foreground/80 flex items-center justify-center rounded py-2 transition"
                  >
                    {label}
                  </Link>
                ))}

                {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${label} 프로필 보기`}
                    className="hover:bg-accent hover:text-foreground/100 active:bg-accent active:text-foreground/100 text-foreground/80 flex items-center justify-center gap-1 rounded py-2 transition"
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
