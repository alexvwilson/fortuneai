# FortuneAI - AI-Powered Fortune Telling

A mystical fortune telling application powered by artificial intelligence, built with Next.js 14, TypeScript, and modern web technologies.

## ✨ Features

- **AI-Powered Fortune Readings** - Get personalized insights using advanced machine learning
- **Mystical User Experience** - Immerse yourself in a world of enchantment and spiritual discovery
- **Modern Web Technologies** - Built with Next.js 14, TypeScript, and Tailwind CSS
- **Authentication Ready** - Integrated with Clerk for secure user management
- **Database Foundation** - PostgreSQL with Drizzle ORM for data persistence

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom spooky theme
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui
- **Deployment**: Vercel (recommended)

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Neon.tech PostgreSQL database (cloud-hosted)
- Clerk account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd fortuneai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here

   # Database (Neon.tech PostgreSQL)
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

   # OpenAI (for future fortune telling AI)
   OPENAI_API_KEY=sk-your_openai_key_here
   ```

4. **Database Setup**

   ```bash
   # Generate migrations
   npm run db:generate

   # Run migrations
   npm run db:migrate

   # Open Drizzle Studio (optional)
   npm run db:studio
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fortuneai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles with spooky theme
│   │   ├── layout.tsx         # Root layout with Clerk provider
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── clerk.ts           # Clerk configuration
│   │   ├── db.ts              # Database connection
│   │   └── utils.ts           # Utility functions
│   └── drizzle/
│       ├── config.ts          # Drizzle configuration
│       └── schema/            # Database schema
├── .env.local                 # Environment variables
├── drizzle.config.ts          # Drizzle CLI configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Theme & Styling

The application features a custom **spooky theme** with:

- Dark purple and black gradients
- Mystical color palette
- Glowing text effects
- Responsive design
- Tailwind CSS utilities

## 🔐 Authentication

Authentication is handled by Clerk:

- User registration and login
- Protected routes
- User profile management
- Session handling

## 🗄️ Database

The application uses PostgreSQL with Drizzle ORM:

- Type-safe database operations
- Migration management
- Schema-first development
- Database studio for development

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## 📚 Documentation

- **[Development Guide](./DEVELOPMENT.md)** - Comprehensive development setup and guidelines
- **[API Documentation](./API.md)** - Complete API reference and integration guide
- **[Testing Guide](./TESTING.md)** - Testing strategy, tools, and best practices
- **[Task Documentation](./ai_docs/tasks/)** - Detailed implementation tasks and progress

## 🚧 Development Status

### ✅ Completed Phases

- **Phase 0**: Project Setup - Next.js 14, TypeScript, Tailwind CSS, Clerk auth, Database foundation
- **Phase 1**: Requirements Audit & Gap Analysis - Legal pages, help system, navigation
- **Phase 2**: Performance Optimization - Database queries, frontend performance, caching
- **Phase 3**: Accessibility & User Experience - WCAG AA compliance, error handling, loading states
- **Phase 4**: Responsive Design & Theme Polish - Mobile-first design, theme consistency
- **Phase 5**: Final Testing & Validation - Comprehensive testing utilities and validation
- **Phase 6**: Code Quality & Documentation - Code review, documentation, best practices

### 🎯 Current Status

The application is now **production-ready** with:

- ✅ Complete user authentication system
- ✅ AI-powered fortune reading generation
- ✅ Responsive dashboard and user interface
- ✅ Comprehensive error handling and validation
- ✅ Accessibility compliance (WCAG AA)
- ✅ Performance optimization
- ✅ Legal compliance (GDPR-ready)
- ✅ Comprehensive testing utilities
- ✅ Complete documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 About FortuneAI

FortuneAI combines ancient wisdom with modern artificial intelligence to provide users with meaningful insights and guidance. Our mission is to create a mystical experience that helps users navigate life's journey with confidence and clarity.

---

**Built with ❤️ and a touch of magic**
