const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

/**
 * 주어진 URL이 내부 링크인지 확인합니다
 * @param href 확인할 URL 문자열
 * @returns URL이 내부 링크인 경우 true (해시, 상대 경로, 또는 같은 사이트), 그렇지 않으면 false
 */
export function isInternalLink(href: string): boolean {
  return href.startsWith('#') || href.startsWith('/') || href.startsWith(SITE_URL);
}
