# FortuneAI API Documentation

## Overview

This document describes the API endpoints, data models, and integration patterns for the FortuneAI application.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## Authentication

All API endpoints require authentication via Clerk. Include the session token in requests:

```typescript
// Client-side
import { useAuth } from "@clerk/nextjs";

const { getToken } = useAuth();
const token = await getToken();

fetch("/api/readings", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## API Endpoints

### Reading Types

#### GET `/api/reading-types`

Get all available reading types.

**Response:**

```typescript
{
  success: true,
  data: ReadingType[]
}

interface ReadingType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isUserFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### POST `/api/reading-types`

Create a new reading type (admin only).

**Request Body:**

```typescript
{
  name: string;
  description: string;
  icon: string;
  category: string;
}
```

**Response:**

```typescript
{
  success: true,
  data: ReadingType
}
```

### Readings

#### GET `/api/readings`

Get user's readings with pagination and filtering.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `type` (optional): Filter by reading type ID
- `favorite` (optional): Filter favorites only (true/false)

**Response:**

```typescript
{
  success: true,
  data: {
    readings: Reading[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
}

interface Reading {
  id: string;
  userId: string;
  readingTypeId: string;
  prompt: string;
  aiResponse: string;
  title: string;
  tags: string[];
  isFavorite: boolean;
  isShareable: boolean;
  shareToken: string | null;
  shareExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  readingType: ReadingType;
}
```

#### POST `/api/readings`

Create a new fortune reading.

**Request Body:**

```typescript
{
  readingTypeId: string;
  prompt: string;
  title?: string;
}
```

**Response:**

```typescript
{
  success: true,
  data: Reading
}
```

#### GET `/api/readings/[id]`

Get a specific reading by ID.

**Response:**

```typescript
{
  success: true,
  data: Reading
}
```

#### PUT `/api/readings/[id]`

Update a reading (title, favorite status, shareable status).

**Request Body:**

```typescript
{
  title?: string;
  isFavorite?: boolean;
  isShareable?: boolean;
}
```

**Response:**

```typescript
{
  success: true,
  data: Reading
}
```

#### DELETE `/api/readings/[id]`

Delete a reading.

**Response:**

```typescript
{
  success: true,
  message: "Reading deleted successfully"
}
```

#### GET `/api/readings/[id]/export`

Export a reading in various formats.

**Query Parameters:**

- `format`: Export format (`json`, `pdf`, `text`)

**Response:**

```typescript
// JSON format
{
  success: true,
  data: Reading
}

// PDF/Text format
// Returns file download
```

### Sharing

#### GET `/api/share/[token]`

Get a shared reading by share token.

**Response:**

```typescript
{
  success: true,
  data: {
    reading: Reading;
    isExpired: boolean;
  }
}
```

#### POST `/api/share/[token]`

Create or update sharing settings for a reading.

**Request Body:**

```typescript
{
  isShareable: boolean;
  expiresAt?: Date;
}
```

**Response:**

```typescript
{
  success: true,
  data: {
    shareToken: string;
    shareUrl: string;
    expiresAt: Date | null;
  }
}
```

### ChatGPT Integration

#### POST `/api/chatgpt`

Generate AI response for fortune reading.

**Request Body:**

```typescript
{
  readingTypeId: string;
  prompt: string;
  context?: string;
}
```

**Response:**

```typescript
{
  success: true,
  data: {
    response: string;
    tokensUsed: number;
    model: string;
  }
}
```

### User Profile

#### GET `/api/profile`

Get current user's profile information.

**Response:**

```typescript
{
  success: true,
  data: {
    id: string;
    firstName: string;
    lastName: string;
    emailAddresses: Array<{
      emailAddress: string;
      verification: {
        status: string;
      };
    }>;
    preferences: UserPreferences;
  }
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
  };
  privacy: {
    shareReadings: boolean;
    showInDirectory: boolean;
  };
}
```

#### PUT `/api/profile`

Update user profile information.

**Request Body:**

```typescript
{
  firstName?: string;
  lastName?: string;
  preferences?: Partial<UserPreferences>;
}
```

**Response:**

```typescript
{
  success: true,
  data: UserProfile
}
```

## Error Responses

All endpoints return consistent error responses:

```typescript
{
  success: false,
  error: string;
  code?: string;
  details?: unknown;
}
```

### Common Error Codes

- `AUTH_REQUIRED`: Authentication required
- `AUTH_INVALID`: Invalid authentication
- `VALIDATION_ERROR`: Request validation failed
- `RECORD_NOT_FOUND`: Resource not found
- `PERMISSION_DENIED`: Insufficient permissions
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Reading generation**: 10 requests per minute per user
- **General API**: 100 requests per minute per user
- **Authentication**: 5 requests per minute per IP

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Reading Created

Triggered when a new reading is created.

**Payload:**

```typescript
{
  event: "reading.created";
  data: {
    reading: Reading;
    user: {
      id: string;
      email: string;
    }
  }
  timestamp: string;
}
```

### User Registered

Triggered when a new user registers.

**Payload:**

```typescript
{
  event: "user.registered";
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    }
  }
  timestamp: string;
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { FortuneAI } from "@fortuneai/sdk";

const client = new FortuneAI({
  apiKey: "your-api-key",
  baseUrl: "https://api.fortuneai.com",
});

// Create a reading
const reading = await client.readings.create({
  readingTypeId: "tarot",
  prompt: "What does my future hold?",
});

// Get user's readings
const readings = await client.readings.list({
  page: 1,
  limit: 10,
});
```

### Python

```python
from fortuneai import FortuneAI

client = FortuneAI(api_key='your-api-key')

# Create a reading
reading = client.readings.create(
    reading_type_id='tarot',
    prompt='What does my future hold?'
)

# Get user's readings
readings = client.readings.list(page=1, limit=10)
```

## Testing

### Test Environment

Use the test environment for development:

- **Base URL**: `https://test-api.fortuneai.com`
- **Test API Key**: Available in dashboard

### Mock Responses

For testing, you can use mock responses:

```typescript
// Mock reading creation
const mockReading = {
  id: "test-reading-123",
  prompt: "Test prompt",
  aiResponse: "Mock AI response",
  // ... other fields
};

// Use in tests
jest.mock("@/lib/readings", () => ({
  createReading: jest.fn().mockResolvedValue(mockReading),
}));
```

## Changelog

### v1.0.0 (2024-01-01)

- Initial API release
- Reading types and readings endpoints
- User authentication via Clerk
- ChatGPT integration
- Sharing functionality

### v1.1.0 (2024-01-15)

- Added user preferences
- Enhanced error handling
- Rate limiting implementation
- Webhook support

## Support

For API support:

- **Documentation**: [docs.fortuneai.com](https://docs.fortuneai.com)
- **Email**: api-support@fortuneai.com
- **Status Page**: [status.fortuneai.com](https://status.fortuneai.com)
