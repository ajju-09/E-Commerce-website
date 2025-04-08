import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  // 1.2 then it return 1.20
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : int
}

export const toSlug = (text: string): string => {
 return text.toLowerCase()
    .replace(/[^\w\s-]+/g, "")
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, "")
}