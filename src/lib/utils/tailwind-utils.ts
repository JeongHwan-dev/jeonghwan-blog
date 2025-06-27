import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS class names using clsx and tailwind-merge
 * @param inputs Class values to combine (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
