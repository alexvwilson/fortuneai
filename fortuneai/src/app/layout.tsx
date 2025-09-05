import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FortuneAI - AI-Powered Fortune Telling",
  description: "Discover your future with AI-powered fortune telling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#0f0f23",
          colorText: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          colorInputBackground: "#1f1f23",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-900/50 border border-gray-800",
          headerTitle: "text-purple-400",
        },
      }}
    >
      <html lang="en">
        <body className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white antialiased">
          {/* Skip links for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
          <a
            href="#main-navigation"
            className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to navigation
          </a>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
