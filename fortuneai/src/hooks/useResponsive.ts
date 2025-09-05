"use client";

import { useState, useEffect } from "react";
import { breakpoints } from "@/lib/responsive";

// Hook for responsive breakpoint detection
export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    keyof typeof breakpoints | "xs"
  >("xs");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial values
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width >= parseInt(breakpoints["2xl"])) {
        setCurrentBreakpoint("2xl");
      } else if (width >= parseInt(breakpoints.xl)) {
        setCurrentBreakpoint("xl");
      } else if (width >= parseInt(breakpoints.lg)) {
        setCurrentBreakpoint("lg");
      } else if (width >= parseInt(breakpoints.md)) {
        setCurrentBreakpoint("md");
      } else if (width >= parseInt(breakpoints.sm)) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Add resize listener
    window.addEventListener("resize", updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  // Helper functions
  const isBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
    return currentBreakpoint === breakpoint;
  };

  const isAboveBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
    const breakpointOrder = ["xs", "sm", "md", "lg", "xl", "2xl"];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  const isBelowBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
    return !isAboveBreakpoint(breakpoint);
  };

  // Device type detection
  const isMobile = currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const isTablet = currentBreakpoint === "md";
  const isDesktop =
    currentBreakpoint === "lg" ||
    currentBreakpoint === "xl" ||
    currentBreakpoint === "2xl";

  return {
    currentBreakpoint,
    windowWidth,
    isBreakpoint,
    isAboveBreakpoint,
    isBelowBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
}

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}): T | undefined {
  const { currentBreakpoint } = useResponsive();
  return values[currentBreakpoint];
}

// Hook for responsive classes
export function useResponsiveClasses(classes: {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
}): string {
  const { currentBreakpoint } = useResponsive();

  // Get the appropriate class for current breakpoint
  // Fall back to smaller breakpoints if current one doesn't exist
  const breakpointOrder = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i] as keyof typeof classes;
    if (classes[breakpoint]) {
      return classes[breakpoint]!;
    }
  }

  return "";
}

// Hook for responsive visibility
export function useResponsiveVisibility() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return {
    showOnMobile: isMobile,
    showOnTablet: isTablet,
    showOnDesktop: isDesktop,
    showOnMobileAndTablet: isMobile || isTablet,
    showOnTabletAndDesktop: isTablet || isDesktop,
    hideOnMobile: !isMobile,
    hideOnTablet: !isTablet,
    hideOnDesktop: !isDesktop,
  };
}

// Hook for responsive layout
export function useResponsiveLayout() {
  const { isMobile, isTablet } = useResponsive();

  return {
    // Grid columns
    gridCols: isMobile ? 1 : isTablet ? 2 : 3,

    // Spacing
    spacing: isMobile ? "gap-4" : isTablet ? "gap-6" : "gap-8",

    // Padding
    padding: isMobile ? "p-4" : isTablet ? "p-6" : "p-8",

    // Text size
    textSize: {
      heading: isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl",
      body: isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg",
    },

    // Button size
    buttonSize: isMobile ? "sm" : isTablet ? "md" : "lg",

    // Flex direction
    flexDirection: isMobile ? "flex-col" : "flex-row",
  };
}
