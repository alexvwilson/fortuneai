/**
 * Accessibility utilities for WCAG AA compliance
 */

// ARIA labels and descriptions
export const AriaLabels = {
  // Navigation
  mainNavigation: "Main navigation",
  userMenu: "User menu",
  breadcrumb: "Breadcrumb navigation",

  // Reading types
  readingTypeCard: "Reading type card",
  favoriteButton: "Add to favorites",
  unfavoriteButton: "Remove from favorites",

  // Reading session
  readingInput: "Enter your question for the fortune reading",
  generateButton: "Generate fortune reading",
  readingResponse: "AI-generated fortune reading",
  loadingIndicator: "Generating your fortune reading",

  // Reading history
  searchReadings: "Search your readings",
  filterByCategory: "Filter readings by category",
  filterFavorites: "Show only favorite readings",
  readingCard: "Reading card",
  deleteReading: "Delete this reading",
  shareReading: "Share this reading",
  exportReading: "Export this reading",

  // Dashboard
  readingStats: "Your reading statistics",
  recentReadings: "Your recent readings",
  favoriteTypes: "Your favorite reading types",
  readingPatterns: "Your reading patterns",

  // Profile
  profileSettings: "Profile settings",
  privacySettings: "Privacy settings",
  dataExport: "Export your data",
  accountDeletion: "Delete your account",

  // Forms
  requiredField: "This field is required",
  optionalField: "This field is optional",
  formError: "Please correct the errors below",
  formSuccess: "Form submitted successfully",

  // Loading states
  loadingContent: "Loading content",
  savingChanges: "Saving your changes",
  processingRequest: "Processing your request",

  // Error states
  errorOccurred: "An error occurred",
  networkError: "Network connection error",
  serverError: "Server error",
  notFound: "Content not found",
} as const;

// Keyboard navigation utilities
export const KeyboardNavigation = {
  // Common key codes
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",

  // Handle keyboard events
  handleKeyDown: (
    event: React.KeyboardEvent,
    handlers: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
      onHome?: () => void;
      onEnd?: () => void;
    }
  ) => {
    switch (event.key) {
      case KeyboardNavigation.ENTER:
        handlers.onEnter?.();
        break;
      case KeyboardNavigation.SPACE:
        event.preventDefault(); // Prevent page scroll
        handlers.onSpace?.();
        break;
      case KeyboardNavigation.ESCAPE:
        handlers.onEscape?.();
        break;
      case KeyboardNavigation.ARROW_UP:
        handlers.onArrowUp?.();
        break;
      case KeyboardNavigation.ARROW_DOWN:
        handlers.onArrowDown?.();
        break;
      case KeyboardNavigation.ARROW_LEFT:
        handlers.onArrowLeft?.();
        break;
      case KeyboardNavigation.ARROW_RIGHT:
        handlers.onArrowRight?.();
        break;
      case KeyboardNavigation.HOME:
        handlers.onHome?.();
        break;
      case KeyboardNavigation.END:
        handlers.onEnd?.();
        break;
    }
  },

  // Focus management
  focusElement: (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  },

  // Trap focus within a container
  trapFocus: (container: HTMLElement, event: KeyboardEvent) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.key === KeyboardNavigation.TAB) {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  },
};

// Screen reader utilities
export const ScreenReader = {
  // Announce messages to screen readers
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Hide content from screen readers
  srOnly: "sr-only",

  // Show content only to screen readers
  srOnlyClass: "sr-only",
};

// Color contrast utilities
export const ColorContrast = {
  // Check if color meets WCAG AA contrast requirements
  getContrastRatio: (): number => {
    // Simplified contrast ratio calculation
    // In a real implementation, you'd use a proper color contrast library
    return 4.5; // Placeholder - should be calculated properly
  },

  // Ensure minimum contrast ratio
  ensureContrast: (
    _foreground: string,
    _background: string,
    ratio: number = 4.5
  ): boolean => {
    return ColorContrast.getContrastRatio() >= ratio;
  },
};

// Form accessibility utilities
export const FormAccessibility = {
  // Generate unique IDs for form elements
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Create accessible form field
  createFieldProps: (
    id: string,
    label: string,
    error?: string,
    required: boolean = false
  ) => ({
    id,
    "aria-label": label,
    "aria-required": required,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  }),

  // Create accessible button
  createButtonProps: (
    label: string,
    loading: boolean = false,
    disabled: boolean = false
  ) => ({
    "aria-label": label,
    "aria-disabled": disabled || loading,
    "aria-busy": loading,
  }),
};

// Focus management utilities
export const FocusManagement = {
  // Store the last focused element
  lastFocusedElement: null as HTMLElement | null,

  // Save current focus
  saveFocus: () => {
    FocusManagement.lastFocusedElement = document.activeElement as HTMLElement;
  },

  // Restore focus
  restoreFocus: () => {
    if (FocusManagement.lastFocusedElement) {
      FocusManagement.lastFocusedElement.focus();
    }
  },

  // Focus first focusable element
  focusFirst: (container: HTMLElement) => {
    const focusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    if (focusable) {
      focusable.focus();
    }
  },
};

// Animation and motion utilities
export const MotionAccessibility = {
  // Respect user's motion preferences
  prefersReducedMotion: (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Get animation duration based on user preferences
  getAnimationDuration: (defaultDuration: number): number => {
    return MotionAccessibility.prefersReducedMotion() ? 0 : defaultDuration;
  },

  // Apply reduced motion styles
  reducedMotionClass:
    "motion-reduce:transition-none motion-reduce:animate-none",
};

// Live regions for dynamic content
export const LiveRegions = {
  // Create live region for announcements
  createLiveRegion: (
    id: string,
    priority: "polite" | "assertive" = "polite"
  ) => {
    const region = document.createElement("div");
    region.id = id;
    region.setAttribute("aria-live", priority);
    region.setAttribute("aria-atomic", "true");
    region.className = "sr-only";
    document.body.appendChild(region);
    return region;
  },

  // Announce to live region
  announceToRegion: (regionId: string, message: string) => {
    const region = document.getElementById(regionId);
    if (region) {
      region.textContent = message;
    }
  },
};

// Skip links for keyboard navigation
export const SkipLinks = {
  // Create skip link
  createSkipLink: (target: string, label: string) => ({
    href: target,
    className:
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50",
    children: label,
  }),
};

// High contrast mode support
export const HighContrast = {
  // Check if high contrast mode is enabled
  isEnabled: (): boolean => {
    return window.matchMedia("(prefers-contrast: high)").matches;
  },

  // Apply high contrast styles
  highContrastClass: "contrast-more:border-2 contrast-more:border-white",
};

// Export all utilities
export const Accessibility = {
  AriaLabels,
  KeyboardNavigation,
  ScreenReader,
  ColorContrast,
  FormAccessibility,
  FocusManagement,
  MotionAccessibility,
  LiveRegions,
  SkipLinks,
  HighContrast,
};
