# FortuneAI Development Guide

## Overview

FortuneAI is a modern Next.js 14 application that provides AI-powered fortune telling experiences. This guide covers the development setup, architecture, and best practices for contributing to the project.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **AI Integration**: OpenAI ChatGPT API
- **Deployment**: Vercel

## Project Structure

```
fortuneai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (dashboard)/        # Dashboard routes group
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── new-reading/    # Reading creation flow
│   │   │   ├── readings/       # Reading history
│   │   │   ├── types/          # Reading type management
│   │   │   ├── profile/        # User profile
│   │   │   └── help/           # Help and FAQ
│   │   ├── api/                # API routes
│   │   ├── share/              # Public sharing pages
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── reading-types/      # Reading type components
│   │   ├── readings/           # Reading-related components
│   │   ├── profile/            # Profile components
│   │   ├── accessibility/      # Accessibility components
│   │   └── testing/            # Testing utilities
│   ├── contexts/               # React contexts
│   ├── drizzle/                # Database schema and migrations
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   └── middleware.ts           # Next.js middleware
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Clerk account for authentication

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://..."

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
   CLERK_SECRET_KEY="sk_..."

   # OpenAI
   OPENAI_API_KEY="sk-..."

   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. Set up the database:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture

### Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables:

- **users**: User profiles and preferences
- **reading_types**: Available fortune reading types
- **readings**: User-generated fortune readings
- **user_favorite_reading_types**: User preferences

### Authentication Flow

1. Users sign up/sign in via Clerk
2. Middleware protects dashboard routes
3. User context provides authentication state
4. Server actions validate user permissions

### AI Integration

1. Users select a reading type and provide a prompt
2. Server action calls OpenAI ChatGPT API
3. Response is stored in database
4. User can view, share, or export readings

## Development Guidelines

### Code Style

- Use TypeScript for all code
- Follow Next.js App Router patterns
- Use functional components with hooks
- Implement proper error boundaries
- Follow accessibility best practices (WCAG AA)

### Component Structure

```typescript
// Server Component (default)
async function MyPage() {
  const data = await getData();
  return <MyClientComponent data={data} />;
}

// Client Component (when needed)
("use client");
function MyClientComponent({ data }: { data: DataType }) {
  const [state, setState] = useState();
  return <div>{/* Interactive content */}</div>;
}
```

### Database Operations

Use Drizzle ORM with proper type safety:

```typescript
// Good: Type-safe queries
const readings = await db
  .select()
  .from(readingsTable)
  .where(eq(readingsTable.userId, userId));

// Avoid: Raw SQL unless necessary
```

### Error Handling

Use the centralized error handling system:

```typescript
import { ErrorFactory } from "@/lib/errorHandling";

try {
  // Operation
} catch (error) {
  throw ErrorFactory.validation("VALIDATION_ERROR", details);
}
```

### Testing

The application includes comprehensive testing utilities:

```typescript
import { TestSuite } from "@/components/testing/TestSuite";

// Run all tests
<TestSuite onComplete={(results) => console.log(results)} />;
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## Performance Optimization

### Database

- Composite indexes on frequently queried columns
- Connection pooling configured
- Query optimization with proper WHERE clauses

### Frontend

- React.memo for expensive components
- Debounced user inputs
- Lazy loading for non-critical components
- Optimized bundle splitting

### Caching

- API response caching
- Database query result caching
- Static asset optimization

## Accessibility

The application follows WCAG AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

## Security

- Input validation and sanitization
- SQL injection prevention via Drizzle ORM
- XSS protection
- CSRF protection via Next.js
- Secure authentication via Clerk
- Environment variable protection

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to your hosting provider

## Monitoring and Analytics

- Error tracking via centralized error handling
- Performance monitoring via Next.js analytics
- User behavior tracking (if implemented)

## Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation as needed
4. Ensure accessibility compliance
5. Test on multiple devices and browsers

## Troubleshooting

### Common Issues

1. **Database connection errors**: Check DATABASE_URL and ensure PostgreSQL is running
2. **Authentication issues**: Verify Clerk keys and configuration
3. **Build errors**: Check TypeScript types and imports
4. **Performance issues**: Review database queries and component optimization

### Debug Mode

Enable debug logging by setting:

```env
DEBUG=true
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Clerk Documentation](https://clerk.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
