import { PROFILE } from '@/constants';

function Footer() {
  return (
    <footer className="h-[var(--footer-height)] w-full border-t border-dashed">
      <div className="container flex h-full items-center">
        <span className="text-muted-foreground text-sm">
          {`© 2025. ${PROFILE.englishName}. All rights reserved.`}
        </span>
      </div>
    </footer>
  );
}

export { Footer };
