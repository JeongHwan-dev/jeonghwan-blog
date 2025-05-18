import { PROFILE } from '@/constants';

function Footer() {
  return (
    <footer className="h-[var(--footer-height)] w-full border-t-1 border-dashed">
      <div className="container flex h-full items-center">
        <span className="text-muted-foreground text-sm">
          {`Copyright © ${PROFILE.englishName}. All Rights Reserved.`}
        </span>
      </div>
    </footer>
  );
}

export { Footer };
