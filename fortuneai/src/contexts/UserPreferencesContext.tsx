"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { UserPreferences } from "@/drizzle/schema";

interface UserPreferencesContextType {
  preferences: UserPreferences | null;
  setPreferences: (preferences: UserPreferences | null) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  isLoading: boolean;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

interface UserPreferencesProviderProps {
  children: ReactNode;
  initialPreferences?: UserPreferences | null;
}

export function UserPreferencesProvider({
  children,
  initialPreferences = null,
}: UserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(
    initialPreferences
  );
  const [isLoading, setIsLoading] = useState(false);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    if (preferences) {
      setPreferences({
        ...preferences,
        ...updates,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        setPreferences,
        updatePreferences,
        isLoading,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
}
