"use client";

import React, { useState, useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "./LoadingSpinner";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  description,
  className = "",
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          [error ? errorId : undefined, description ? descriptionId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={error ? "border-red-500 focus:border-red-500" : ""}
      />

      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  rows?: number;
  className?: string;
}

export function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  description,
  rows = 4,
  className = "",
}: TextAreaFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </Label>

      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={
          [error ? errorId : undefined, description ? descriptionId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`
          flex min-h-[80px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white 
          placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500 focus:border-red-500" : ""}
        `}
      />

      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  description,
  placeholder = "Select an option",
  className = "",
}: SelectFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </Label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          [error ? errorId : undefined, description ? descriptionId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`
          flex h-9 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500 focus:border-red-500" : ""}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export function CheckboxField({
  label,
  checked,
  onChange,
  error,
  disabled = false,
  description,
  className = "",
}: CheckboxFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-start space-x-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            [
              error ? errorId : undefined,
              description ? descriptionId : undefined,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`
            mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-600
            focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-red-500" : ""}
          `}
        />
        <div className="flex-1">
          <Label
            htmlFor={id}
            className="text-sm font-medium text-gray-300 cursor-pointer"
          >
            {label}
          </Label>
          {description && (
            <p id={descriptionId} className="text-sm text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-400 ml-7"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface FormProps {
  title?: string;
  description?: string;
  onSubmit: (data: FormData) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  success?: string;
  children: React.ReactNode;
  className?: string;
}

export function AccessibleForm({
  title,
  description,
  onSubmit,
  loading = false,
  error,
  success,
  children,
  className = "",
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`bg-gray-800/50 border-gray-700 ${className}`}>
      {(title || description) && (
        <CardHeader>
          {title && (
            <CardTitle className="text-xl font-semibold text-purple-400">
              {title}
            </CardTitle>
          )}
          {description && <p className="text-gray-300">{description}</p>}
        </CardHeader>
      )}

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {children}

          {/* Form status messages */}
          {error && (
            <div
              className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div
              className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <p className="text-green-400">{success}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            aria-label={
              loading || isSubmitting ? "Submitting form" : "Submit form"
            }
          >
            {loading || isSubmitting ? (
              <LoadingSpinner size="sm" label="Submitting" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
