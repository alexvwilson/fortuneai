/**
 * Comprehensive error handling and monitoring utilities
 */

// Error types and interfaces
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  data?: unknown;
  url?: string;
  userAgent?: string;
  [key: string]: unknown;
}

// Error codes
export const ErrorCodes = {
  // Authentication errors
  AUTH_REQUIRED: "AUTH_REQUIRED",
  AUTH_INVALID: "AUTH_INVALID",
  AUTH_EXPIRED: "AUTH_EXPIRED",
  AUTH_PERMISSION_DENIED: "AUTH_PERMISSION_DENIED",

  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",
  INVALID_FORMAT: "INVALID_FORMAT",
  VALUE_TOO_LONG: "VALUE_TOO_LONG",
  VALUE_TOO_SHORT: "VALUE_TOO_SHORT",

  // Database errors
  DATABASE_ERROR: "DATABASE_ERROR",
  RECORD_NOT_FOUND: "RECORD_NOT_FOUND",
  DUPLICATE_RECORD: "DUPLICATE_RECORD",
  CONSTRAINT_VIOLATION: "CONSTRAINT_VIOLATION",

  // API errors
  API_ERROR: "API_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

  // Reading errors
  READING_GENERATION_FAILED: "READING_GENERATION_FAILED",
  READING_NOT_FOUND: "READING_NOT_FOUND",
  READING_ACCESS_DENIED: "READING_ACCESS_DENIED",
  READING_TYPE_NOT_FOUND: "READING_TYPE_NOT_FOUND",

  // File errors
  FILE_UPLOAD_FAILED: "FILE_UPLOAD_FAILED",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",

  // System errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  CONFIGURATION_ERROR: "CONFIGURATION_ERROR",
} as const;

// Error messages
export const ErrorMessages = {
  [ErrorCodes.AUTH_REQUIRED]:
    "Authentication is required to access this resource",
  [ErrorCodes.AUTH_INVALID]: "Invalid authentication credentials",
  [ErrorCodes.AUTH_EXPIRED]: "Authentication session has expired",
  [ErrorCodes.AUTH_PERMISSION_DENIED]:
    "You do not have permission to perform this action",

  [ErrorCodes.VALIDATION_ERROR]: "The provided data is invalid",
  [ErrorCodes.REQUIRED_FIELD_MISSING]: "A required field is missing",
  [ErrorCodes.INVALID_FORMAT]: "The data format is invalid",
  [ErrorCodes.VALUE_TOO_LONG]: "The value is too long",
  [ErrorCodes.VALUE_TOO_SHORT]: "The value is too short",

  [ErrorCodes.DATABASE_ERROR]: "A database error occurred",
  [ErrorCodes.RECORD_NOT_FOUND]: "The requested record was not found",
  [ErrorCodes.DUPLICATE_RECORD]:
    "A record with this information already exists",
  [ErrorCodes.CONSTRAINT_VIOLATION]:
    "The operation violates database constraints",

  [ErrorCodes.API_ERROR]: "An API error occurred",
  [ErrorCodes.NETWORK_ERROR]: "A network error occurred",
  [ErrorCodes.TIMEOUT_ERROR]: "The request timed out",
  [ErrorCodes.RATE_LIMIT_EXCEEDED]:
    "Rate limit exceeded, please try again later",

  [ErrorCodes.READING_GENERATION_FAILED]: "Failed to generate fortune reading",
  [ErrorCodes.READING_NOT_FOUND]: "Reading not found",
  [ErrorCodes.READING_ACCESS_DENIED]: "You do not have access to this reading",
  [ErrorCodes.READING_TYPE_NOT_FOUND]: "Reading type not found",

  [ErrorCodes.FILE_UPLOAD_FAILED]: "File upload failed",
  [ErrorCodes.FILE_TOO_LARGE]: "File is too large",
  [ErrorCodes.INVALID_FILE_TYPE]: "Invalid file type",

  [ErrorCodes.INTERNAL_ERROR]: "An internal error occurred",
  [ErrorCodes.SERVICE_UNAVAILABLE]: "Service is temporarily unavailable",
  [ErrorCodes.CONFIGURATION_ERROR]: "Configuration error",
} as const;

// Error severity levels
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Error categories
export enum ErrorCategory {
  AUTHENTICATION = "authentication",
  VALIDATION = "validation",
  DATABASE = "database",
  API = "api",
  READING = "reading",
  FILE = "file",
  SYSTEM = "system",
}

// Error class
export class AppErrorClass extends Error implements AppError {
  public readonly code: string;
  public readonly details?: unknown;
  public readonly timestamp: Date;
  public readonly userId?: string;
  public readonly sessionId?: string;
  public readonly context?: Record<string, unknown>;
  public readonly severity: ErrorSeverity;
  public readonly category: ErrorCategory;

  constructor(
    code: keyof typeof ErrorCodes,
    message?: string,
    details?: unknown,
    context?: ErrorContext,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.SYSTEM
  ) {
    const errorMessage =
      message || ErrorMessages[code] || "An unknown error occurred";
    super(errorMessage);

    this.name = "AppError";
    this.code = code;
    this.message = errorMessage;
    this.details = details;
    this.timestamp = new Date();
    if (context?.userId) this.userId = context.userId;
    if (context?.sessionId) this.sessionId = context.sessionId;
    if (context && typeof context === "object") {
      this.context = context;
    }
    this.severity = severity;
    this.category = category;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppErrorClass);
    }
  }

  // Convert to plain object
  toObject(): AppError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      ...(this.userId && { userId: this.userId }),
      ...(this.sessionId && { sessionId: this.sessionId }),
      ...(this.stack && { stack: this.stack }),
      ...(this.context && { context: this.context }),
    };
  }
}

// Error factory functions
export const ErrorFactory = {
  // Create authentication error
  auth: (code: keyof typeof ErrorCodes, context?: ErrorContext) => {
    return new AppErrorClass(
      code,
      undefined,
      undefined,
      context,
      ErrorSeverity.HIGH,
      ErrorCategory.AUTHENTICATION
    );
  },

  // Create validation error
  validation: (
    code: keyof typeof ErrorCodes,
    details?: unknown,
    context?: ErrorContext
  ) => {
    return new AppErrorClass(
      code,
      undefined,
      details,
      context,
      ErrorSeverity.MEDIUM,
      ErrorCategory.VALIDATION
    );
  },

  // Create database error
  database: (
    code: keyof typeof ErrorCodes,
    details?: unknown,
    context?: ErrorContext
  ) => {
    return new AppErrorClass(
      code,
      undefined,
      details,
      context,
      ErrorSeverity.HIGH,
      ErrorCategory.DATABASE
    );
  },

  // Create API error
  api: (
    code: keyof typeof ErrorCodes,
    details?: unknown,
    context?: ErrorContext
  ) => {
    return new AppErrorClass(
      code,
      undefined,
      details,
      context,
      ErrorSeverity.MEDIUM,
      ErrorCategory.API
    );
  },

  // Create reading error
  reading: (
    code: keyof typeof ErrorCodes,
    details?: unknown,
    context?: ErrorContext
  ) => {
    return new AppErrorClass(
      code,
      undefined,
      details,
      context,
      ErrorSeverity.MEDIUM,
      ErrorCategory.READING
    );
  },

  // Create system error
  system: (
    code: keyof typeof ErrorCodes,
    details?: unknown,
    context?: ErrorContext
  ) => {
    return new AppErrorClass(
      code,
      undefined,
      details,
      context,
      ErrorSeverity.CRITICAL,
      ErrorCategory.SYSTEM
    );
  },
};

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: AppError[] = [];
  private maxLogSize = 1000;

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Handle error
  public handleError(
    error: Error | AppErrorClass,
    context?: ErrorContext
  ): AppError {
    let appError: AppError;

    if (error instanceof AppErrorClass) {
      appError = error.toObject();
    } else {
      appError = {
        code: ErrorCodes.INTERNAL_ERROR,
        message: error.message || "An unknown error occurred",
        timestamp: new Date(),
        ...(error.stack && { stack: error.stack }),
        ...(context && typeof context === "object" && { context }),
      };
    }

    // Add to log
    this.addToLog(appError);

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error handled:", appError);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToMonitoring(appError);
    }

    return appError;
  }

  // Add error to log
  private addToLog(error: AppError): void {
    this.errorLog.push(error);

    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }
  }

  // Send to monitoring service
  private sendToMonitoring(error: AppError): void {
    // In a real application, you would send this to a monitoring service
    // like Sentry, LogRocket, or DataDog
    console.warn("Error monitoring not implemented:", error);
  }

  // Get error log
  public getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  // Clear error log
  public clearErrorLog(): void {
    this.errorLog = [];
  }

  // Get errors by category
  public getErrorsByCategory(): AppError[] {
    return this.errorLog.filter(() => {
      // This would need to be implemented based on your error structure
      return true; // Placeholder
    });
  }

  // Get errors by severity
  public getErrorsBySeverity(): AppError[] {
    return this.errorLog.filter(() => {
      // This would need to be implemented based on your error structure
      return true; // Placeholder
    });
  }
}

// Error boundary utilities
export const ErrorBoundaryUtils = {
  // Get user-friendly error message
  getUserFriendlyMessage: (error: AppError): string => {
    // Return user-friendly message based on error code
    switch (error.code) {
      case ErrorCodes.AUTH_REQUIRED:
        return "Please sign in to continue";
      case ErrorCodes.AUTH_EXPIRED:
        return "Your session has expired. Please sign in again";
      case ErrorCodes.NETWORK_ERROR:
        return "Please check your internet connection and try again";
      case ErrorCodes.RATE_LIMIT_EXCEEDED:
        return "Too many requests. Please wait a moment and try again";
      case ErrorCodes.READING_GENERATION_FAILED:
        return "Unable to generate reading. Please try again";
      case ErrorCodes.SERVICE_UNAVAILABLE:
        return "Service is temporarily unavailable. Please try again later";
      default:
        return "Something went wrong. Please try again";
    }
  },

  // Check if error is recoverable
  isRecoverable: (error: AppError): boolean => {
    const recoverableCodes = [
      ErrorCodes.NETWORK_ERROR,
      ErrorCodes.TIMEOUT_ERROR,
      ErrorCodes.RATE_LIMIT_EXCEEDED,
      ErrorCodes.READING_GENERATION_FAILED,
      ErrorCodes.SERVICE_UNAVAILABLE,
    ];
    return recoverableCodes.includes(error.code as never);
  },

  // Get retry delay for error
  getRetryDelay: (error: AppError): number => {
    switch (error.code) {
      case ErrorCodes.RATE_LIMIT_EXCEEDED:
        return 60000; // 1 minute
      case ErrorCodes.TIMEOUT_ERROR:
        return 5000; // 5 seconds
      case ErrorCodes.NETWORK_ERROR:
        return 3000; // 3 seconds
      default:
        return 1000; // 1 second
    }
  },
};

// Error reporting utilities
export const ErrorReporting = {
  // Report error to external service
  reportError: async (error: AppError): Promise<void> => {
    try {
      // In a real application, you would send this to your error reporting service
      console.warn("Error reporting not implemented:", error);
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
    }
  },

  // Report error with context
  reportErrorWithContext: async (
    error: Error,
    context: ErrorContext
  ): Promise<void> => {
    const appError = ErrorHandler.getInstance().handleError(error, context);
    await ErrorReporting.reportError(appError);
  },
};

// Export all error handling utilities
export const ErrorHandling = {
  ErrorCodes,
  ErrorMessages,
  ErrorSeverity,
  ErrorCategory,
  AppErrorClass,
  ErrorFactory,
  ErrorHandler,
  ErrorBoundaryUtils,
  ErrorReporting,
};
