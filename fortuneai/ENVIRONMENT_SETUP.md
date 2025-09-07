# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database Configuration (Neon.tech PostgreSQL)
# Get your connection string from: https://console.neon.tech/
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Clerk Authentication (if not already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Optional: OpenAI API Key (if using AI features)
OPENAI_API_KEY="sk-..."
```

## Setup Steps

1. **Create Neon.tech Account**

   - Go to [https://console.neon.tech/](https://console.neon.tech/)
   - Create a new project and database

2. **Get Your Connection String**

   - Copy the connection string from your Neon.tech dashboard
   - It will look like: `postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

3. **Create .env.local File**

   - Create a new file called `.env.local` in your project root
   - Add the DATABASE_URL with your actual connection string
   - Add other required environment variables

4. **Restart Development Server**
   - Run `npm run dev` to restart with new environment variables

## Troubleshooting

- **"DATABASE_URL environment variable is not set"**: Make sure you have created `.env.local` file with the correct DATABASE_URL
- **Database connection failed**: Verify your Neon.tech connection string is correct and the database is accessible
- **Environment variables not loading**: Ensure `.env.local` is in the project root and restart your development server
