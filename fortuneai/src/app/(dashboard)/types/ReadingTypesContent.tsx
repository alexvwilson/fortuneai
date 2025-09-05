"use client";

import { UserProvider } from "@/contexts/UserContext";
import { ReadingProvider } from "@/contexts/ReadingContext";
import { ReadingTypeGrid } from "@/components/reading-types/ReadingTypeGrid";

export function ReadingTypesContent() {
  return (
    <UserProvider>
      <ReadingProvider>
        <ReadingTypeGrid />
      </ReadingProvider>
    </UserProvider>
  );
}
