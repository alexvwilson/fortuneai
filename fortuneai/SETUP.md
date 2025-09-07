# FortuneAI Setup Instructions

## Environment Configuration

Before running the application, you need to set up your environment variables. Create a `.env.local` file in the root directory with the following content:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Database (Neon.tech PostgreSQL)
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# OpenAI (for future fortune telling AI)
OPENAI_API_KEY=sk-your_openai_key_here
```

## Getting Your API Keys

### Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable key and secret key from the dashboard

### Database Setup

1. **Create a Neon.tech Account**

   - Go to [neon.tech](https://neon.tech) and create a free account
   - Create a new project and database

2. **Get Your Connection String**

   - Copy the connection string from your Neon.tech dashboard
   - It will look like: `postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

3. **Update Environment Variables**
   - Replace the DATABASE_URL in your `.env.local` file with the Neon.tech connection string

### OpenAI (Optional for now)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add it to your .env.local file

## First Run

After setting up your environment variables:

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Operations

```bash
# Generate migrations (when you modify schema)
npm run db:generate

# Run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## Troubleshooting

- **Port 3000 already in use**: Change the port in package.json or kill the existing process
- **Database connection failed**: Check your DATABASE_URL and ensure it's properly configured for Neon.tech
- **Clerk errors**: Verify your Clerk keys are correct and the application is properly configured
