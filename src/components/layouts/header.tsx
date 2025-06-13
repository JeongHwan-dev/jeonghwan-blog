import type { ElementType } from 'react';

import { Github, Linkedin, Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  ThemeToggleButton,
  VisuallyHidden,
} from '@/components';
import JeonghwanAvatar from '@svgs/img-jeonghwan-avatar.svg';

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
  {
    href: '/',
    label: '블로그',
  },
  {
    href: '/about',
    label: '개발자 소개',
  },
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
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-[var(--header-height)] w-full border-b-1 border-dashed backdrop-blur">
      <div className="container flex h-full items-center justify-between gap-2 md:gap-4">
        <Link className="mr-4 flex items-center gap-0.5" href="/">
          <JeonghwanAvatar height={44} width={44} />
          <span className="font-bold lg:inline-block">{`Jeonghwan's Blog`}</span>
        </Link>

        <div className="flex items-center gap-0.5 md:gap-4">
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {PAGE_NAV_LINK_LIST.map(({ href, label }) => (
              <Link
                className="hover:text-foreground/100 active:text-foreground/100 text-foreground/80 transition-colors"
                href={href}
                key={label}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <nav className="hidden items-center gap-0.5 md:flex">
              {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
                <Button asChild key={label} size="icon" variant="ghost">
                  <Link href={href} rel="noopener noreferrer" target="_blank">
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
              <Button className="md:hidden" size="icon" type="button" variant="ghost">
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
                    className="hover:bg-accent hover:text-foreground/100 active:bg-accent active:text-foreground/100 text-foreground/80 flex items-center justify-center rounded py-2 transition"
                    href={href}
                    key={label}
                  >
                    {label}
                  </Link>
                ))}

                {SOCIAL_LINK_LIST.map(({ href, icon: Icon, label }) => (
                  <Link
                    className="hover:bg-accent hover:text-foreground/100 active:bg-accent active:text-foreground/100 text-foreground/80 flex items-center justify-center gap-1 rounded py-2 transition"
                    href={href}
                    key={label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon height={20} width={20} />
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
