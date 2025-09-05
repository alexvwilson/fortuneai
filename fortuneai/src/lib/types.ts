/**
 * TypeScript interfaces for serialized data structures
 * Used to ensure proper data serialization between server and client components
 */

/**
 * Serialized user data interface for passing from server to client components
 * Contains only plain, serializable data extracted from Clerk user objects
 */
export interface SerializedUserData {
  id: string;
  emailAddresses: Array<{
    emailAddress: string;
    id: string;
  }>;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  username: string | null;
  createdAt: number;
  updatedAt: number;
}
