"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Accessibility } from "@/lib/accessibility";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Announce error to screen readers
    Accessibility.ScreenReader.announce(
      "An error occurred. Please try refreshing the page or contact support if the problem persists.",
      "assertive"
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Announce retry to screen readers
    Accessibility.ScreenReader.announce("Retrying to load content", "polite");
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div
          className="min-h-screen flex items-center justify-center p-8"
          role="alert"
          aria-live="assertive"
        >
          <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4" role="img" aria-label="Error icon">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
              </div>
              <CardTitle className="text-white">
                {Accessibility.AriaLabels.errorOccurred}
              </CardTitle>
              <p className="text-gray-300">
                We encountered an unexpected error. Please try again or contact
                support if the problem persists.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error details for debugging */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-sm text-gray-400 bg-gray-700/50 p-3 rounded-lg">
                  <summary className="font-semibold mb-2 cursor-pointer">
                    Error Details (Development Only)
                  </summary>
                  <div className="space-y-2">
                    <p>
                      <strong>Error:</strong> {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-xs overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    )}
                    {this.state.errorInfo && (
                      <p>
                        <strong>Component Stack:</strong>
                      </p>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <pre className="text-xs overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={this.handleRetry}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  aria-label="Try again to load the content"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-500/10"
                  aria-label="Go to home page"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support information */}
              <div className="text-center text-sm text-gray-400">
                <p>
                  If this error continues, please{" "}
                  <a
                    href="/help"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    contact support
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, "children">
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}
