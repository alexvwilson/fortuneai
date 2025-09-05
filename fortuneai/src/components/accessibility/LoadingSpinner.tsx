"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  label = "Loading content",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label={label}
    >
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
  label?: string;
}

export function LoadingSkeleton({
  lines = 3,
  className = "",
  label = "Loading content",
}: LoadingSkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label={label}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-700 rounded animate-pulse"
          style={{
            width: index === lines - 1 ? "75%" : "100%",
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingCard({
  title = "Loading",
  description = "Please wait while we load your content",
  className = "",
}: LoadingCardProps) {
  return (
    <div
      className={`bg-gray-800/50 border border-gray-700 rounded-lg p-6 ${className}`}
      role="status"
      aria-label={`${title}: ${description}`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <LoadingSpinner size="sm" label="Loading" />
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <LoadingSkeleton lines={3} label="Loading content" />
    </div>
  );
}

interface LoadingPageProps {
  title?: string;
  description?: string;
}

export function LoadingPage({
  title = "Loading Page",
  description = "Please wait while we load the page",
}: LoadingPageProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      role="status"
      aria-label={`${title}: ${description}`}
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" label="Loading page" />
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Progress indicator for long-running operations
interface ProgressIndicatorProps {
  progress: number; // 0-100
  label?: string;
  className?: string;
}

export function ProgressIndicator({
  progress,
  label = "Loading progress",
  className = "",
}: ProgressIndicatorProps) {
  return (
    <div
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <div className="text-sm text-gray-400 mt-1 text-center">
        {Math.round(progress)}% complete
      </div>
    </div>
  );
}

// Inline loading indicator for buttons
interface ButtonLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function ButtonLoading({
  loading,
  children,
  loadingText = "Loading...",
  className = "",
}: ButtonLoadingProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {loading && <LoadingSpinner size="sm" label={loadingText} />}
      <span>{children}</span>
    </div>
  );
}
