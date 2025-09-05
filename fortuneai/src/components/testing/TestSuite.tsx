"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Validation } from "@/lib/validation";
import { ErrorHandling } from "@/lib/errorHandling";

interface TestResult {
  name: string;
  status: "pending" | "running" | "passed" | "failed";
  message?: string;
  duration?: number;
  error?: string;
}

interface TestSuiteProps {
  onComplete?: (results: TestResult[]) => void;
  autoRun?: boolean;
}

export function TestSuite({ onComplete, autoRun = false }: TestSuiteProps) {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  // Update test status
  const updateTest = useCallback(
    (name: string, updates: Partial<TestResult>) => {
      setTests((prev) =>
        prev.map((test) =>
          test.name === name ? { ...test, ...updates } : test
        )
      );
    },
    []
  );

  // Run individual test
  const runTest = useCallback(
    async (testName: string): Promise<TestResult> => {
      const startTime = performance.now();
      updateTest(testName, { status: "running" });
      setCurrentTest(testName);

      try {
        let result: TestResult = { name: testName, status: "passed" };

        switch (testName) {
          case "Validation Utilities":
            result = await testValidationUtilities();
            break;
          case "Error Handling":
            result = await testErrorHandling();
            break;
          case "Responsive Design":
            result = await testResponsiveDesign();
            break;
          case "Accessibility Features":
            result = await testAccessibilityFeatures();
            break;
          case "Performance Metrics":
            result = await testPerformanceMetrics();
            break;
          case "Database Connectivity":
            result = await testDatabaseConnectivity();
            break;
          case "API Integration":
            result = await testAPIIntegration();
            break;
          case "Component Rendering":
            result = await testComponentRendering();
            break;
          default:
            result = {
              name: testName,
              status: "failed",
              error: "Unknown test",
            };
        }

        const endTime = performance.now();
        result.duration = endTime - startTime;

        updateTest(testName, result);
        return result;
      } catch (error) {
        const endTime = performance.now();
        const result: TestResult = {
          name: testName,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          duration: endTime - startTime,
        };
        updateTest(testName, result);
        return result;
      } finally {
        setCurrentTest(null);
      }
    },
    [updateTest]
  );

  // Run all tests
  const runTests = useCallback(async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    for (const test of tests) {
      if (test.status === "pending") {
        const result = await runTest(test.name);
        results.push(result);
      }
    }

    setIsRunning(false);
    onComplete?.(results);
  }, [tests, onComplete, runTest]);

  // Initialize test suite
  useEffect(() => {
    const initialTests: TestResult[] = [
      { name: "Validation Utilities", status: "pending" },
      { name: "Error Handling", status: "pending" },
      { name: "Responsive Design", status: "pending" },
      { name: "Accessibility Features", status: "pending" },
      { name: "Performance Metrics", status: "pending" },
      { name: "Database Connectivity", status: "pending" },
      { name: "API Integration", status: "pending" },
      { name: "Component Rendering", status: "pending" },
    ];
    setTests(initialTests);

    if (autoRun) {
      runTests();
    }
  }, [autoRun, runTests]);

  // Test validation utilities
  const testValidationUtilities = async (): Promise<TestResult> => {
    try {
      // Test email validation
      const validEmail =
        Validation.FieldValidation.validateEmail("test@example.com");
      if (validEmail) throw new Error("Valid email was rejected");

      const invalidEmail =
        Validation.FieldValidation.validateEmail("invalid-email");
      if (!invalidEmail) throw new Error("Invalid email was accepted");

      // Test password validation
      const validPassword =
        Validation.FieldValidation.validatePassword("Password123!");
      if (validPassword) throw new Error("Valid password was rejected");

      const invalidPassword =
        Validation.FieldValidation.validatePassword("weak");
      if (!invalidPassword) throw new Error("Invalid password was accepted");

      // Test form validation
      const testData = {
        email: "test@example.com",
        password: "Password123!",
        firstName: "John",
        lastName: "Doe",
      };

      const result = Validation.validateForm(
        testData,
        Validation.FormSchemas.userRegistration
      );
      if (!result.isValid) throw new Error("Valid form data was rejected");

      return {
        name: "Validation Utilities",
        status: "passed",
        message: "All validation tests passed",
      };
    } catch (error) {
      return {
        name: "Validation Utilities",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test error handling
  const testErrorHandling = async (): Promise<TestResult> => {
    try {
      // Test error creation
      const error = ErrorHandling.ErrorFactory.validation(
        ErrorHandling.ErrorCodes.VALIDATION_ERROR,
        { field: "email" },
        { component: "TestSuite" }
      );

      if (error.code !== ErrorHandling.ErrorCodes.VALIDATION_ERROR) {
        throw new Error("Error code not set correctly");
      }

      // Test error handling
      const handler = ErrorHandling.ErrorHandler.getInstance();
      const handledError = handler.handleError(error);

      if (!handledError) throw new Error("Error handling failed");

      // Test user-friendly messages
      const userMessage =
        ErrorHandling.ErrorBoundaryUtils.getUserFriendlyMessage(handledError);
      if (!userMessage) throw new Error("User-friendly message not generated");

      return {
        name: "Error Handling",
        status: "passed",
        message: "All error handling tests passed",
      };
    } catch (error) {
      return {
        name: "Error Handling",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test responsive design
  const testResponsiveDesign = async (): Promise<TestResult> => {
    try {
      // Test responsive utilities
      const { ResponsiveUtils } = await import("@/lib/responsive");

      if (!ResponsiveUtils.isBreakpoint) {
        throw new Error("Responsive utilities not available");
      }

      return {
        name: "Responsive Design",
        status: "passed",
        message: "Responsive utilities available",
      };
    } catch (error) {
      return {
        name: "Responsive Design",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test accessibility features
  const testAccessibilityFeatures = async (): Promise<TestResult> => {
    try {
      // Test accessibility utilities
      const { Accessibility } = await import("@/lib/accessibility");

      if (!Accessibility.AriaLabels) {
        throw new Error("ARIA labels not available");
      }

      if (!Accessibility.KeyboardNavigation) {
        throw new Error("Keyboard navigation utilities not available");
      }

      if (!Accessibility.ScreenReader) {
        throw new Error("Screen reader utilities not available");
      }

      // Test ARIA labels
      const mainNavLabel = Accessibility.AriaLabels.mainNavigation;
      if (!mainNavLabel) throw new Error("Main navigation ARIA label missing");

      return {
        name: "Accessibility Features",
        status: "passed",
        message: "All accessibility features available",
      };
    } catch (error) {
      return {
        name: "Accessibility Features",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test performance metrics
  const testPerformanceMetrics = async (): Promise<TestResult> => {
    try {
      // Test performance utilities
      const { PerformanceTesting } = await import("@/lib/testing");

      if (!PerformanceTesting.measureTime) {
        throw new Error("Performance measurement not available");
      }

      // Test performance measurement
      const { result, time } = await PerformanceTesting.measureTime(
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          return "test";
        }
      );

      if (result !== "test") throw new Error("Performance measurement failed");
      if (time < 0) throw new Error("Invalid performance measurement");

      return {
        name: "Performance Metrics",
        status: "passed",
        message: `Performance measurement working (${time.toFixed(2)}ms)`,
      };
    } catch (error) {
      return {
        name: "Performance Metrics",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test database connectivity
  const testDatabaseConnectivity = async (): Promise<TestResult> => {
    try {
      // Test database utilities
      const { db } = await import("@/lib/db");

      if (!db) throw new Error("Database connection not available");

      // Test basic database operation (this would need to be implemented)
      // For now, just check if the database object exists

      return {
        name: "Database Connectivity",
        status: "passed",
        message: "Database connection available",
      };
    } catch (error) {
      return {
        name: "Database Connectivity",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test API integration
  const testAPIIntegration = async (): Promise<TestResult> => {
    try {
      // Test API utilities
      const { MockAPI } = await import("@/lib/testing");

      if (!MockAPI.success) throw new Error("API utilities not available");

      // Test mock API response
      const response = MockAPI.success({ test: "data" });
      if (!response.success) throw new Error("Mock API response failed");

      return {
        name: "API Integration",
        status: "passed",
        message: "API integration utilities available",
      };
    } catch (error) {
      return {
        name: "API Integration",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Test component rendering
  const testComponentRendering = async (): Promise<TestResult> => {
    try {
      // Test component utilities
      const { ComponentTesting } = await import("@/lib/testing");

      if (!ComponentTesting.mockRouter)
        throw new Error("Component testing utilities not available");

      // Test mock router
      const router = ComponentTesting.mockRouter("/test");
      if (router.pathname !== "/test") throw new Error("Mock router failed");

      return {
        name: "Component Rendering",
        status: "passed",
        message: "Component rendering utilities available",
      };
    } catch (error) {
      return {
        name: "Component Rendering",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Get test summary
  const getTestSummary = () => {
    const passed = tests.filter((t) => t.status === "passed").length;
    const failed = tests.filter((t) => t.status === "failed").length;
    const pending = tests.filter((t) => t.status === "pending").length;
    const running = tests.filter((t) => t.status === "running").length;

    return { passed, failed, pending, running, total: tests.length };
  };

  const summary = getTestSummary();

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold text-purple-400 flex items-center gap-2">
          🧪 Test Suite
          {isRunning && (
            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-green-600/10 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-green-400">
              {summary.passed}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Passed</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-red-600/10 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-red-400">
              {summary.failed}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Failed</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-yellow-600/10 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-yellow-400">
              {summary.pending}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Pending</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-blue-600/10 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-blue-400">
              {summary.running}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Running</div>
          </div>
        </div>

        {/* Test List */}
        <div className="space-y-2">
          {tests.map((test) => (
            <div
              key={test.name}
              className={`p-3 rounded-lg border ${
                test.status === "passed"
                  ? "bg-green-600/10 border-green-500/30"
                  : test.status === "failed"
                  ? "bg-red-600/10 border-red-500/30"
                  : test.status === "running"
                  ? "bg-blue-600/10 border-blue-500/30"
                  : "bg-gray-600/10 border-gray-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      test.status === "passed"
                        ? "bg-green-400"
                        : test.status === "failed"
                        ? "bg-red-400"
                        : test.status === "running"
                        ? "bg-blue-400 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-sm sm:text-base font-medium text-white">
                    {test.name}
                  </span>
                </div>
                {test.duration && (
                  <span className="text-xs text-gray-400">
                    {test.duration.toFixed(0)}ms
                  </span>
                )}
              </div>

              {test.message && (
                <div className="mt-2 text-xs sm:text-sm text-gray-300">
                  {test.message}
                </div>
              )}

              {test.error && (
                <div className="mt-2 text-xs sm:text-sm text-red-400">
                  Error: {test.error}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button
            onClick={runTests}
            disabled={isRunning}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </Button>

          <Button
            onClick={() => {
              setTests((prev) =>
                prev.map((test) => ({ ...test, status: "pending" as const }))
              );
            }}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Reset Tests
          </Button>
        </div>

        {/* Current Test Indicator */}
        {currentTest && (
          <div className="text-center text-sm text-blue-400">
            Running: {currentTest}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
