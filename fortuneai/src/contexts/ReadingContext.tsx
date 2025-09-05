"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUserContext } from "./UserContext";
import type { ReadingTypeWithUserPreference } from "@/lib/reading-types";

interface ReadingContextType {
  readingTypes: ReadingTypeWithUserPreference[];
  favoriteTypes: ReadingTypeWithUserPreference[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const [readingTypes, setReadingTypes] = useState<
    ReadingTypeWithUserPreference[]
  >([]);
  const [favoriteTypes, setFavoriteTypes] = useState<
    ReadingTypeWithUserPreference[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch reading types with user preferences
      const response = await fetch("/api/reading-types");
      if (!response.ok) throw new Error("Failed to fetch reading types");

      const data = await response.json();
      setReadingTypes(data.types);
      setFavoriteTypes(data.favorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  const value: ReadingContextType = {
    readingTypes,
    favoriteTypes,
    isLoading,
    error,
    refreshData: fetchData,
  };

  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
}

export function useReadingContext(): ReadingContextType {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error("useReadingContext must be used within a ReadingProvider");
  }
  return context;
}
