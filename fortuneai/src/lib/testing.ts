/**
 * Testing utilities and validation helpers
 */

// Test data generators
export const TestData = {
  // Generate mock user data
  generateUser: (overrides: Partial<Record<string, unknown>> = {}) => ({
    id: "test-user-123",
    firstName: "Test",
    lastName: "User",
    emailAddresses: [{ emailAddress: "test@example.com" }],
    ...overrides,
  }),

  // Generate mock reading type data
  generateReadingType: (overrides: Partial<Record<string, unknown>> = {}) => ({
    id: "test-reading-type-123",
    name: "Test Reading",
    description: "A test reading type for testing purposes",
    icon: "🔮",
    category: "General",
    isUserFavorite: false,
    ...overrides,
  }),

  // Generate mock reading data
  generateReading: (overrides: Partial<Record<string, unknown>> = {}) => ({
    id: "test-reading-123",
    userId: "test-user-123",
    readingTypeId: "test-reading-type-123",
    prompt: "What does the future hold?",
    aiResponse: "The future holds great promise and opportunity.",
    title: "Test Reading",
    tags: ["test", "future"],
    isFavorite: false,
    isShareable: false,
    shareToken: null,
    shareExpiresAt: null,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    readingType: TestData.generateReadingType(),
    ...overrides,
  }),

  // Generate mock reading stats
  generateReadingStats: (overrides: Partial<Record<string, unknown>> = {}) => ({
    totalReadings: 5,
    favoriteType: "Tarot",
    readingFrequency: 2.5,
    recentActivity: new Date("2024-01-01T00:00:00Z"),
    ...overrides,
  }),

  // Generate mock reading patterns
  generateReadingPatterns: (
    overrides: Partial<Record<string, unknown>> = {}
  ) => ({
    typeDistribution: [
      { typeName: "Tarot", percentage: 40 },
      { typeName: "Crystal Ball", percentage: 30 },
      { typeName: "Palm Reading", percentage: 30 },
    ],
    weeklyActivity: [
      { day: "Monday", count: 2 },
      { day: "Tuesday", count: 1 },
      { day: "Wednesday", count: 3 },
      { day: "Thursday", count: 1 },
      { day: "Friday", count: 2 },
      { day: "Saturday", count: 4 },
      { day: "Sunday", count: 1 },
    ],
    favoriteTypes: [
      { typeName: "Tarot", isFavorite: true },
      { typeName: "Crystal Ball", isFavorite: false },
    ],
    ...overrides,
  }),
};

// Validation utilities
export const Validation = {
  // Validate email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate UUID format
  isValidUUID: (uuid: string): boolean => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },

  // Validate required fields
  validateRequired: (
    data: Record<string, unknown>,
    requiredFields: string[]
  ): string[] => {
    const missingFields: string[] = [];
    requiredFields.forEach((field) => {
      if (
        !data[field] ||
        (typeof data[field] === "string" && data[field].trim() === "")
      ) {
        missingFields.push(field);
      }
    });
    return missingFields;
  },

  // Validate reading data
  validateReading: (
    reading: Record<string, unknown>
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (
      !reading.prompt ||
      (typeof reading.prompt === "string" && reading.prompt.trim() === "")
    ) {
      errors.push("Prompt is required");
    }

    if (
      !reading.readingTypeId ||
      (typeof reading.readingTypeId === "string" &&
        !Validation.isValidUUID(reading.readingTypeId))
    ) {
      errors.push("Valid reading type ID is required");
    }

    if (
      reading.prompt &&
      typeof reading.prompt === "string" &&
      reading.prompt.length > 1000
    ) {
      errors.push("Prompt must be less than 1000 characters");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validate reading type data
  validateReadingType: (
    readingType: Record<string, unknown>
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (
      !readingType.name ||
      (typeof readingType.name === "string" && readingType.name.trim() === "")
    ) {
      errors.push("Name is required");
    }

    if (
      !readingType.description ||
      (typeof readingType.description === "string" &&
        readingType.description.trim() === "")
    ) {
      errors.push("Description is required");
    }

    if (
      !readingType.icon ||
      (typeof readingType.icon === "string" && readingType.icon.trim() === "")
    ) {
      errors.push("Icon is required");
    }

    if (
      !readingType.category ||
      (typeof readingType.category === "string" &&
        readingType.category.trim() === "")
    ) {
      errors.push("Category is required");
    }

    if (
      readingType.name &&
      typeof readingType.name === "string" &&
      readingType.name.length > 100
    ) {
      errors.push("Name must be less than 100 characters");
    }

    if (
      readingType.description &&
      typeof readingType.description === "string" &&
      readingType.description.length > 500
    ) {
      errors.push("Description must be less than 500 characters");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Mock API responses
export const MockAPI = {
  // Mock successful API response
  success: <T>(
    data: T,
    message: string = "Success"
  ): { success: true; data: T; message: string } => ({
    success: true,
    data,
    message,
  }),

  // Mock error API response
  error: (
    message: string = "An error occurred",
    status: number = 400
  ): { success: false; error: string; status: number } => ({
    success: false,
    error: message,
    status,
  }),

  // Mock loading state
  loading: (): { success: false; loading: true } => ({
    success: false,
    loading: true,
  }),
};

// Test environment utilities
export const TestEnvironment = {
  // Check if running in test environment
  isTest: (): boolean => {
    return (
      process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    );
  },

  // Mock console methods for testing
  mockConsole: () => {
    const originalConsole = { ...console };
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
    console.info = jest.fn();

    return {
      restore: () => {
        Object.assign(console, originalConsole);
      },
    };
  },

  // Mock fetch for API testing
  mockFetch: (response: unknown, status: number = 200) => {
    const mockResponse = {
      ok: status >= 200 && status < 300,
      status,
      json: async () => response,
      text: async () => JSON.stringify(response),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    return global.fetch;
  },

  // Mock localStorage
  mockLocalStorage: () => {
    const store: Record<string, string> = {};

    const mockLocalStorage = {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      }),
    };

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });

    return mockLocalStorage;
  },
};

// Component testing utilities
export const ComponentTesting = {
  // Mock React Router
  mockRouter: (pathname: string = "/", query: Record<string, string> = {}) => ({
    pathname,
    query,
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    reload: jest.fn(),
  }),

  // Mock Next.js router
  mockNextRouter: (
    pathname: string = "/",
    query: Record<string, string> = {}
  ) => ({
    pathname,
    query,
    asPath: pathname,
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    reload: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),

  // Mock Clerk authentication
  mockClerk: (
    user: Record<string, unknown> | null = null,
    isLoaded: boolean = true
  ) => ({
    user,
    isLoaded,
    isSignedIn: !!user,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    openSignIn: jest.fn(),
    openSignUp: jest.fn(),
    openUserProfile: jest.fn(),
  }),

  // Mock toast notifications
  mockToast: () => ({
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  }),
};

// Performance testing utilities
export const PerformanceTesting = {
  // Measure function execution time
  measureTime: async <T>(
    fn: () => Promise<T> | T
  ): Promise<{ result: T; time: number }> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    return {
      result,
      time: end - start,
    };
  },

  // Mock slow API response
  mockSlowResponse: <T>(data: T, delay: number = 1000): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  },

  // Test memory usage
  measureMemory: (): number => {
    if (typeof window !== "undefined" && "memory" in performance) {
      return (performance as { memory: { usedJSHeapSize: number } }).memory
        .usedJSHeapSize;
    }
    return 0;
  },
};

// Accessibility testing utilities
export const AccessibilityTesting = {
  // Check for required ARIA attributes
  checkARIA: (element: HTMLElement): string[] => {
    const errors: string[] = [];

    // Check for required ARIA attributes on interactive elements
    if (
      element.tagName === "BUTTON" &&
      !element.getAttribute("aria-label") &&
      !element.textContent?.trim()
    ) {
      errors.push("Button missing aria-label or text content");
    }

    if (
      element.tagName === "INPUT" &&
      !element.getAttribute("aria-label") &&
      !element.getAttribute("aria-labelledby")
    ) {
      errors.push("Input missing aria-label or aria-labelledby");
    }

    return errors;
  },

  // Check color contrast (simplified)
  checkColorContrast: (): boolean => {
    // This is a simplified check - in a real implementation, you'd use a proper contrast ratio library
    return true; // Placeholder
  },

  // Check keyboard navigation
  checkKeyboardNavigation: (element: HTMLElement): boolean => {
    return (
      element.tabIndex >= 0 ||
      element.tagName === "BUTTON" ||
      element.tagName === "A" ||
      element.tagName === "INPUT"
    );
  },
};

// Export all testing utilities
export const Testing = {
  TestData,
  Validation,
  MockAPI,
  TestEnvironment,
  ComponentTesting,
  PerformanceTesting,
  AccessibilityTesting,
};
