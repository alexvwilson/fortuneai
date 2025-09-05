/**
 * Performance utilities for optimizing frontend performance
 */

// Debounce function for search inputs and API calls
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll events and frequent updates
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Memoization for expensive calculations
export function memoize<T extends (...args: unknown[]) => unknown>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result as ReturnType<T>);
    return result;
  }) as T;
}

// Lazy loading utility for images and components
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static marks = new Map<string, number>();

  static mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  static measure(name: string, startMark?: string): number {
    const endTime = performance.now();
    const startTime = startMark ? this.marks.get(startMark) || 0 : 0;
    const duration = endTime - startTime;

    if (process.env.NODE_ENV === "development") {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static clearMarks(): void {
    this.marks.clear();
  }
}

// Bundle size optimization utilities
export function lazyImport<T>(importFn: () => Promise<T>): () => Promise<T> {
  let promise: Promise<T> | null = null;

  return () => {
    if (!promise) {
      promise = importFn();
    }
    return promise;
  };
}

// Memory management utilities
export function createWeakMap<K extends object, V>(): WeakMap<K, V> {
  return new WeakMap<K, V>();
}

// Cache management for API responses
export class APICache {
  private cache = new Map<
    string,
    { data: unknown; timestamp: number; ttl: number }
  >();

  set(key: string, data: unknown, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): unknown | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// React-specific performance utilities
export const ReactPerformance = {
  // Memoized component wrapper
  memo: <T extends React.ComponentType<React.ComponentProps<T>>>(
    Component: T,
    areEqual?: (
      prevProps: React.ComponentProps<T>,
      nextProps: React.ComponentProps<T>
    ) => boolean
  ): T => {
    return React.memo(
      Component as React.ComponentType<object>,
      areEqual as
        | ((prevProps: object, nextProps: object) => boolean)
        | undefined
    ) as unknown as T;
  },

  // Callback memoization
  useCallback: <T extends (...args: unknown[]) => unknown>(
    callback: T,
    deps: React.DependencyList
  ): T => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback(callback, deps) as T;
  },

  // Value memoization
  useMemo: <T>(factory: () => T, deps: React.DependencyList): T => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useMemo(factory, deps);
  },
};

// Import React for type definitions
import React from "react";
