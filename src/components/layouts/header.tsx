import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Menu } from 'lucide-react';
import type { ElementType } from 'react';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  VisuallyHidden,
} from '@/components';

interface SocialLink {
  label: string;
  href: string;
  icon: ElementType;
}

interface PageNavLink {
  label: string;
  href: string;
}

const PAGE_NAV_LINK_LIST: PageNavLink[] = [
  {
    label: '블로그',
    href: '/',
  },
  {
    label: '개발자 소개',
    href: '/about',
  },
];

const SOCIAL_LINK_LIST: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/jeonghwan-dev',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeonghwan-dev/',
    icon: Linkedin,
  },
];

function Header() {
  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b-1 border-dashed backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 border-x-1 border-dashed px-4 md:gap-4">
        <Link href="/" className="mr-4 flex items-center gap-0.5">
          <Image
            src="/images/img-jeonghwan-avatar.svg"
            alt="Avatar of Jeonghwan"
            width={44}
            height={44}
            quality={100}
          />
          <span className="font-bold lg:inline-block">{`Jeonghwan's Blog`}</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-sm sm:flex">
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

          <nav className="hidden items-center gap-0.5 sm:flex">
            {SOCIAL_LINK_LIST.map(({ icon: Icon, label, href }) => (
              <Button key={label} asChild variant="ghost" size="icon">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </Link>
              </Button>
            ))}
          </nav>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" type="button" size="icon" className="sm:hidden">
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

                {SOCIAL_LINK_LIST.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
