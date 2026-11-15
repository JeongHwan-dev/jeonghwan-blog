import { PROFILE } from '@/shared/constants';

function Footer() {
  return (
    <footer className="h-[var(--footer-height)] w-full">
      <div className="container flex h-full items-center">
        <span className="text-muted-foreground text-sm">
          {`© 2025. ${PROFILE.englishName}. All rights reserved.`}
        </span>
      </div>
    </footer>
  );
}

export { Footer };
