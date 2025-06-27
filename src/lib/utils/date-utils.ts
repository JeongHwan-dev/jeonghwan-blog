import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * Formats a date into a localized Korean string format
 * @param date Date to format (can be Date object, string, or undefined)
 * @returns Formatted date string in Korean locale, or empty string if date is undefined
 */
export function formatDate(date: Date | string | undefined): string {
  if (date === undefined) {
    return '';
  }

  return format(new Date(date), 'PPP', {
    locale: ko,
  });
}
