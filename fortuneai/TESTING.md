# FortuneAI Testing Guide

## Overview

This guide covers the testing strategy, tools, and best practices for the FortuneAI application. The application includes comprehensive testing utilities and validation systems.

## Testing Strategy

### Test Types

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints and database operations
3. **End-to-End Tests**: Complete user workflows
4. **Accessibility Tests**: WCAG AA compliance
5. **Performance Tests**: Load and response time testing
6. **Security Tests**: Authentication and authorization

### Testing Tools

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **Custom Test Suite**: Built-in validation utilities

## Built-in Testing Utilities

### Test Suite Component

The application includes a comprehensive test suite component:

```typescript
import { TestSuite } from "@/components/testing/TestSuite";

// Run all tests
<TestSuite
  onComplete={(results) => {
    console.log("Test Results:", results);
  }}
  autoRun={true}
/>;
```

### Available Tests

1. **Validation Utilities**: Form validation and data integrity
2. **Error Handling**: Error creation and management
3. **Responsive Design**: Breakpoint detection and utilities
4. **Accessibility Features**: ARIA labels and keyboard navigation
5. **Performance Metrics**: Execution time and memory usage
6. **Database Connectivity**: Connection and query validation
7. **API Integration**: Endpoint availability and responses
8. **Component Rendering**: React component functionality

### Test Data Generation

```typescript
import { TestData } from "@/lib/testing";

// Generate mock data
const mockUser = TestData.generateUser({
  firstName: "Test",
  lastName: "User",
});

const mockReading = TestData.generateReading({
  prompt: "Test prompt",
  aiResponse: "Test response",
});
```

### Validation Testing

```typescript
import { Validation } from "@/lib/validation";

// Test form validation
const result = Validation.validateForm(data, schema);
if (!result.isValid) {
  console.log("Validation errors:", result.errors);
}

// Test individual field validation
const emailError = Validation.FieldValidation.validateEmail("invalid-email");
if (emailError) {
  console.log("Email validation failed:", emailError);
}
```

### Error Handling Testing

```typescript
import { ErrorFactory, ErrorHandler } from "@/lib/errorHandling";

// Test error creation
const error = ErrorFactory.validation("VALIDATION_ERROR", {
  field: "email",
  message: "Invalid email format",
});

// Test error handling
const handler = ErrorHandler.getInstance();
const handledError = handler.handleError(error);
console.log("Handled error:", handledError);
```

## Unit Testing

### Component Testing

```typescript
import { render, screen } from "@testing-library/react";
import { ReadingTypeCard } from "@/components/reading-types/ReadingTypeCard";

describe("ReadingTypeCard", () => {
  it("renders reading type information", () => {
    const mockReadingType = {
      id: "1",
      name: "Tarot Reading",
      description: "Classic tarot card reading",
      icon: "🔮",
      category: "Divination",
    };

    render(<ReadingTypeCard readingType={mockReadingType} />);

    expect(screen.getByText("Tarot Reading")).toBeInTheDocument();
    expect(screen.getByText("Classic tarot card reading")).toBeInTheDocument();
  });

  it("handles favorite toggle", async () => {
    const mockReadingType = {
      /* ... */
    };
    const mockOnToggleFavorite = jest.fn();

    render(
      <ReadingTypeCard
        readingType={mockReadingType}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    await user.click(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith("1");
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from "@testing-library/react";
import { useResponsive } from "@/hooks/useResponsive";

describe("useResponsive", () => {
  it("detects mobile breakpoint", () => {
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useResponsive());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.currentBreakpoint).toBe("xs");
  });

  it("updates on window resize", () => {
    const { result } = renderHook(() => useResponsive());

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.currentBreakpoint).toBe("xl");
  });
});
```

### Utility Function Testing

```typescript
import { Validation } from "@/lib/validation";

describe("Validation", () => {
  describe("validateEmail", () => {
    it("validates correct email addresses", () => {
      expect(
        Validation.FieldValidation.validateEmail("test@example.com")
      ).toBeNull();
      expect(
        Validation.FieldValidation.validateEmail("user.name+tag@domain.co.uk")
      ).toBeNull();
    });

    it("rejects invalid email addresses", () => {
      expect(
        Validation.FieldValidation.validateEmail("invalid-email")
      ).toBeTruthy();
      expect(
        Validation.FieldValidation.validateEmail("@domain.com")
      ).toBeTruthy();
      expect(Validation.FieldValidation.validateEmail("user@")).toBeTruthy();
    });
  });

  describe("validateForm", () => {
    it("validates complete form data", () => {
      const data = {
        email: "test@example.com",
        password: "Password123!",
        firstName: "John",
        lastName: "Doe",
      };

      const result = Validation.validateForm(
        data,
        Validation.FormSchemas.userRegistration
      );
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it("returns errors for invalid data", () => {
      const data = {
        email: "invalid-email",
        password: "weak",
        firstName: "",
        lastName: "Doe",
      };

      const result = Validation.validateForm(
        data,
        Validation.FormSchemas.userRegistration
      );
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.password).toBeTruthy();
      expect(result.errors.firstName).toBeTruthy();
    });
  });
});
```

## Integration Testing

### API Endpoint Testing

```typescript
import { createMocks } from "node-mocks-http";
import handler from "@/app/api/readings/route";

describe("/api/readings", () => {
  it("creates a new reading", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        readingTypeId: "tarot",
        prompt: "What does my future hold?",
      },
      headers: {
        authorization: "Bearer valid-token",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.prompt).toBe("What does my future hold?");
  });

  it("returns 401 for unauthenticated requests", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        readingTypeId: "tarot",
        prompt: "Test prompt",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });
});
```

### Database Testing

```typescript
import { db } from "@/lib/db";
import { readingsTable } from "@/drizzle/schema";

describe("Database Operations", () => {
  beforeEach(async () => {
    // Clean up test data
    await db.delete(readingsTable);
  });

  it("creates and retrieves readings", async () => {
    const readingData = {
      id: "test-reading-123",
      userId: "test-user-123",
      readingTypeId: "tarot",
      prompt: "Test prompt",
      aiResponse: "Test response",
      title: "Test Reading",
    };

    // Create reading
    await db.insert(readingsTable).values(readingData);

    // Retrieve reading
    const readings = await db
      .select()
      .from(readingsTable)
      .where(eq(readingsTable.id, "test-reading-123"));

    expect(readings).toHaveLength(1);
    expect(readings[0].prompt).toBe("Test prompt");
  });
});
```

## End-to-End Testing

### Playwright Setup

```typescript
// tests/e2e/reading-creation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Reading Creation Flow", () => {
  test("user can create a new reading", async ({ page }) => {
    // Navigate to dashboard
    await page.goto("/dashboard");

    // Click "New Reading" button
    await page.click("text=New Reading");

    // Select reading type
    await page.click('[data-testid="reading-type-tarot"]');

    // Fill in prompt
    await page.fill(
      '[data-testid="reading-prompt"]',
      "What does my future hold?"
    );

    // Submit form
    await page.click('[data-testid="submit-reading"]');

    // Wait for AI response
    await page.waitForSelector('[data-testid="ai-response"]');

    // Verify response is displayed
    const response = await page.textContent('[data-testid="ai-response"]');
    expect(response).toBeTruthy();
    expect(response.length).toBeGreaterThan(0);
  });

  test("user can save reading as favorite", async ({ page }) => {
    // Navigate to reading
    await page.goto("/readings/test-reading-123");

    // Click favorite button
    await page.click('[data-testid="favorite-button"]');

    // Verify favorite status
    const favoriteButton = page.locator('[data-testid="favorite-button"]');
    await expect(favoriteButton).toHaveAttribute("data-favorited", "true");
  });
});
```

### Accessibility Testing

```typescript
import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("page has proper heading structure", async ({ page }) => {
    await page.goto("/dashboard");

    // Check for h1
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    // Check heading hierarchy
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test("forms have proper labels", async ({ page }) => {
    await page.goto("/new-reading/selection");

    // Check for form labels
    const inputs = page.locator("input, textarea, select");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const hasLabel =
        (await input.getAttribute("aria-label")) ||
        (await input.getAttribute("aria-labelledby")) ||
        (await page
          .locator(`label[for="${await input.getAttribute("id")}"]`)
          .count()) > 0;

      expect(hasLabel).toBe(true);
    }
  });

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/dashboard");

    // Tab through interactive elements
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Verify focus is visible
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});
```

## Performance Testing

### Load Testing

```typescript
import { test, expect } from "@playwright/test";

test.describe("Performance", () => {
  test("dashboard loads within 2 seconds", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);
  });

  test("reading creation completes within 10 seconds", async ({ page }) => {
    await page.goto("/new-reading/selection");

    const startTime = Date.now();

    await page.click('[data-testid="reading-type-tarot"]');
    await page.fill('[data-testid="reading-prompt"]', "Test prompt");
    await page.click('[data-testid="submit-reading"]');
    await page.waitForSelector('[data-testid="ai-response"]');

    const completionTime = Date.now() - startTime;
    expect(completionTime).toBeLessThan(10000);
  });
});
```

### Memory Testing

```typescript
import { PerformanceTesting } from "@/lib/testing";

describe("Memory Usage", () => {
  it("does not leak memory during reading creation", async () => {
    const initialMemory = PerformanceTesting.measureMemory();

    // Perform multiple reading creations
    for (let i = 0; i < 10; i++) {
      await createTestReading();
    }

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    const finalMemory = PerformanceTesting.measureMemory();
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be reasonable (less than 10MB)
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
  });
});
```

## Security Testing

### Authentication Testing

```typescript
import { test, expect } from "@playwright/test";

test.describe("Security", () => {
  test("protected routes require authentication", async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto("/dashboard");

    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/);
  });

  test("users cannot access other users data", async ({ page }) => {
    // Sign in as user 1
    await page.goto("/sign-in");
    await page.fill('[data-testid="email"]', "user1@example.com");
    await page.fill('[data-testid="password"]', "password123");
    await page.click('[data-testid="sign-in-button"]');

    // Try to access user 2's reading
    await page.goto("/readings/user2-reading-123");

    // Should show 404 or access denied
    await expect(page.locator("text=Not Found")).toBeVisible();
  });
});
```

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
```

## Running Tests

### Command Line

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Run performance tests
npm run test:perf
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
      - run: npm run test:a11y
```

## Best Practices

### Test Organization

1. **Group related tests** using `describe` blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** - each test should be able to run in isolation
5. **Use data-testid attributes** for reliable element selection

### Test Data Management

1. **Use factories** for creating test data
2. **Clean up after tests** to prevent interference
3. **Use realistic data** that matches production scenarios
4. **Mock external dependencies** like APIs and databases

### Performance Considerations

1. **Run tests in parallel** when possible
2. **Use appropriate timeouts** for async operations
3. **Mock expensive operations** in unit tests
4. **Profile test execution** to identify bottlenecks

### Accessibility Testing

1. **Test with screen readers** and keyboard navigation
2. **Validate ARIA attributes** and semantic HTML
3. **Check color contrast** and visual indicators
4. **Test with different zoom levels** and viewport sizes

## Troubleshooting

### Common Issues

1. **Flaky tests**: Use proper waits and stable selectors
2. **Slow tests**: Optimize database operations and API calls
3. **Memory leaks**: Clean up event listeners and subscriptions
4. **Authentication issues**: Use proper test user setup

### Debug Tools

1. **Playwright Inspector**: `npx playwright test --debug`
2. **Jest Debug**: `node --inspect-brk node_modules/.bin/jest`
3. **Browser DevTools**: Use for E2E test debugging
4. **Test Suite Component**: Built-in validation and testing utilities
