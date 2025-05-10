import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: Date | string | undefined) {
  if (date === undefined) {
    return '';
  }

  return format(new Date(date), 'PPP', {
    locale: ko,
  });
}
