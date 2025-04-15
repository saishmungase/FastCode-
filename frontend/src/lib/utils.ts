import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining class names.
 * @param inputs - Class values to combine.
 * @returns - A merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
