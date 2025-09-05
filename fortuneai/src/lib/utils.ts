import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function for generating mystical text effects
export function addMysticalEffect(text: string): string {
  return `✨ ${text} ✨`;
}

// Utility function for fortune-related formatting
export function formatFortuneText(text: string): string {
  return text
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .join(".\n\n");
}
