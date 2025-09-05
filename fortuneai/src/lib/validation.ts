/**
 * Comprehensive validation utilities for forms and data
 */

// Validation rules and schemas
export const ValidationRules = {
  // Email validation
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },

  // Password validation
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  },

  // Name validation
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
  },

  // Reading prompt validation
  readingPrompt: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: "Prompt must be 10-1000 characters long",
  },

  // Reading title validation
  readingTitle: {
    required: false,
    maxLength: 100,
    message: "Title must be less than 100 characters",
  },

  // Reading type name validation
  readingTypeName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    message:
      "Name must be 2-100 characters and contain only letters, numbers, spaces, hyphens, and underscores",
  },

  // Reading type description validation
  readingTypeDescription: {
    required: true,
    minLength: 10,
    maxLength: 500,
    message: "Description must be 10-500 characters long",
  },

  // UUID validation
  uuid: {
    required: true,
    pattern:
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    message: "Invalid ID format",
  },
};

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

// Validation function type
export type ValidationFunction<T = unknown> = (
  value: T,
  field: string,
  data?: Record<string, unknown>
) => string | null;

// Core validation functions
export const Validators = {
  // Required field validator
  required: (value: unknown, field: string): string | null => {
    if (value === null || value === undefined || value === "") {
      return `${field} is required`;
    }
    if (typeof value === "string" && value.trim() === "") {
      return `${field} is required`;
    }
    return null;
  },

  // Minimum length validator
  minLength:
    (min: number) =>
    (value: string, field: string): string | null => {
      if (value && value.length < min) {
        return `${field} must be at least ${min} characters long`;
      }
      return null;
    },

  // Maximum length validator
  maxLength:
    (max: number) =>
    (value: string, field: string): string | null => {
      if (value && value.length > max) {
        return `${field} must be less than ${max} characters long`;
      }
      return null;
    },

  // Pattern validator
  pattern:
    (regex: RegExp, message: string) =>
    (value: string, field: string): string | null => {
      if (value && !regex.test(value)) {
        return message || `${field} format is invalid`;
      }
      return null;
    },

  // Email validator
  email: (value: string, field: string): string | null => {
    if (value && !ValidationRules.email.pattern.test(value)) {
      return ValidationRules.email.message;
    }
    return null;
  },

  // Password strength validator
  password: (value: string, field: string): string | null => {
    if (!value) return null;

    const rules = ValidationRules.password;
    if (value.length < rules.minLength) {
      return `Password must be at least ${rules.minLength} characters long`;
    }
    if (!rules.pattern.test(value)) {
      return rules.message;
    }
    return null;
  },

  // UUID validator
  uuid: (value: string, field: string): string | null => {
    if (value && !ValidationRules.uuid.pattern.test(value)) {
      return ValidationRules.uuid.message;
    }
    return null;
  },

  // Number range validator
  range:
    (min: number, max: number) =>
    (value: number, field: string): string | null => {
      if (value !== null && value !== undefined) {
        if (value < min || value > max) {
          return `${field} must be between ${min} and ${max}`;
        }
      }
      return null;
    },

  // Date validator
  date: (value: string | Date, field: string): string | null => {
    if (value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return `${field} must be a valid date`;
      }
    }
    return null;
  },

  // Future date validator
  futureDate: (value: string | Date, field: string): string | null => {
    if (value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return `${field} must be a valid date`;
      }
      if (date <= new Date()) {
        return `${field} must be in the future`;
      }
    }
    return null;
  },

  // Custom validator
  custom:
    (validator: (value: unknown) => boolean, message: string) =>
    (value: unknown, field: string): string | null => {
      if (value && !validator(value)) {
        return message;
      }
      return null;
    },
};

// Form validation schemas
export const FormSchemas = {
  // User registration schema
  userRegistration: {
    firstName: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ],
    lastName: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.password],
  },

  // User login schema
  userLogin: {
    email: [Validators.required, Validators.email],
    password: [Validators.required],
  },

  // Reading creation schema
  readingCreation: {
    readingTypeId: [Validators.required, Validators.uuid],
    prompt: [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ],
    title: [Validators.maxLength(100)],
  },

  // Reading update schema
  readingUpdate: {
    title: [Validators.maxLength(100)],
    isFavorite: [
      Validators.custom(
        (value: unknown) => typeof value === "boolean",
        "Invalid favorite status"
      ),
    ],
    isShareable: [
      Validators.custom(
        (value: unknown) => typeof value === "boolean",
        "Invalid shareable status"
      ),
    ],
  },

  // Reading type creation schema
  readingTypeCreation: {
    name: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ],
    description: [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ],
    icon: [Validators.required, Validators.minLength(1)],
    category: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ],
  },

  // Profile update schema
  profileUpdate: {
    firstName: [Validators.minLength(2), Validators.maxLength(50)],
    lastName: [Validators.minLength(2), Validators.maxLength(50)],
  },
};

// Main validation function
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, ValidationFunction[]>
): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // Validate each field
  Object.entries(schema).forEach(([field, validators]) => {
    const value = data[field];

    // Run all validators for this field
    for (const validator of validators) {
      const error = validator(value, field, data);
      if (error) {
        errors[field] = error;
        break; // Stop at first error
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}

// Field-specific validation functions
export const FieldValidation = {
  // Validate email field
  validateEmail: (email: string): string | null => {
    return Validators.email(email, "Email");
  },

  // Validate password field
  validatePassword: (password: string): string | null => {
    return Validators.password(password, "Password");
  },

  // Validate name field
  validateName: (name: string, fieldName: string = "Name"): string | null => {
    const rules = ValidationRules.name;
    if (!name || name.trim() === "") {
      return `${fieldName} is required`;
    }
    if (name.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters long`;
    }
    if (name.length > rules.maxLength) {
      return `${fieldName} must be less than ${rules.maxLength} characters long`;
    }
    if (!rules.pattern.test(name)) {
      return rules.message;
    }
    return null;
  },

  // Validate reading prompt
  validateReadingPrompt: (prompt: string): string | null => {
    const rules = ValidationRules.readingPrompt;
    if (!prompt || prompt.trim() === "") {
      return "Prompt is required";
    }
    if (prompt.length < rules.minLength) {
      return `Prompt must be at least ${rules.minLength} characters long`;
    }
    if (prompt.length > rules.maxLength) {
      return `Prompt must be less than ${rules.maxLength} characters long`;
    }
    return null;
  },

  // Validate reading title
  validateReadingTitle: (title: string): string | null => {
    const rules = ValidationRules.readingTitle;
    if (title && title.length > rules.maxLength) {
      return rules.message;
    }
    return null;
  },

  // Validate UUID
  validateUUID: (uuid: string, fieldName: string = "ID"): string | null => {
    return Validators.uuid(uuid, fieldName);
  },
};

// Sanitization functions
export const Sanitization = {
  // Sanitize string input
  sanitizeString: (input: string): string => {
    return input.trim().replace(/[<>]/g, "");
  },

  // Sanitize HTML content
  sanitizeHTML: (input: string): string => {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  },

  // Sanitize reading prompt
  sanitizeReadingPrompt: (prompt: string): string => {
    return prompt.trim().substring(0, 1000);
  },

  // Sanitize reading title
  sanitizeReadingTitle: (title: string): string => {
    return title.trim().substring(0, 100);
  },
};

// Validation helpers
export const ValidationHelpers = {
  // Check if form has errors
  hasErrors: (result: ValidationResult): boolean => {
    return !result.isValid;
  },

  // Get first error message
  getFirstError: (result: ValidationResult): string | null => {
    const errors = Object.values(result.errors);
    return errors.length > 0 ? errors[0] : null;
  },

  // Get all error messages
  getAllErrors: (result: ValidationResult): string[] => {
    return Object.values(result.errors);
  },

  // Check if specific field has error
  hasFieldError: (result: ValidationResult, field: string): boolean => {
    return field in result.errors;
  },

  // Get field error message
  getFieldError: (result: ValidationResult, field: string): string | null => {
    return result.errors[field] || null;
  },
};

// Export all validation utilities
export const Validation = {
  ValidationRules,
  Validators,
  FormSchemas,
  validateForm,
  FieldValidation,
  Sanitization,
  ValidationHelpers,
};
