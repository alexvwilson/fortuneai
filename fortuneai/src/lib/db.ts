import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../drizzle/schema";

// Validate DATABASE_URL environment variable
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. " +
      "Please create a .env.local file with your Neon.tech connection string. " +
      "See SETUP.md for instructions."
  );
}

const connectionString = process.env.DATABASE_URL;

// Optimized connection configuration for Neon.tech PostgreSQL
const client = postgres(connectionString, {
  prepare: false,
  max: 20, // Maximum number of connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout
  max_lifetime: 60 * 30, // Maximum connection lifetime (30 minutes)
  ssl: "require", // Required for Neon.tech secure connections
});

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development", // Enable query logging in development
});

export * from "../drizzle/schema";
