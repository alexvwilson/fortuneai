import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-6 border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated: September 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                What Are Cookies?
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences and
                  understanding how you use our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                How We Use Cookies
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>We use cookies for several purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Authentication:</strong> To keep you logged in and
                    secure your account
                  </li>
                  <li>
                    <strong>Preferences:</strong> To remember your settings and
                    preferences
                  </li>
                  <li>
                    <strong>Analytics:</strong> To understand how you use our
                    service and improve it
                  </li>
                  <li>
                    <strong>Performance:</strong> To ensure our service works
                    properly and loads quickly
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Types of Cookies We Use
              </h2>
              <div className="text-gray-300 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">
                    Essential Cookies
                  </h3>
                  <p>
                    These cookies are necessary for the website to function
                    properly. They enable basic functions like page navigation,
                    access to secure areas, and authentication. The website
                    cannot function properly without these cookies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">
                    Functional Cookies
                  </h3>
                  <p>
                    These cookies enable the website to provide enhanced
                    functionality and personalization. They may be set by us or
                    by third-party providers whose services we have added to our
                    pages.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">
                    Analytics Cookies
                  </h3>
                  <p>
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. This helps us improve our service and user
                    experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">
                    Third-Party Cookies
                  </h3>
                  <p>
                    We may use third-party services (like Clerk for
                    authentication) that set their own cookies. These are
                    governed by the respective third-party privacy policies.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Managing Your Cookie Preferences
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you
                    to control cookies through their settings. You can block or
                    delete cookies, or set preferences for specific websites.
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> You can opt out of non-essential
                    cookies by adjusting your browser settings or using our
                    cookie preference center (if available).
                  </li>
                  <li>
                    <strong>Account Settings:</strong> Some cookie preferences
                    can be managed through your FortuneAI account settings.
                  </li>
                </ul>
                <p className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <strong>Note:</strong> Disabling certain cookies may affect
                  the functionality of our service. Essential cookies cannot be
                  disabled as they are necessary for the website to function.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Cookie Duration
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Cookies may be either &quot;session&quot; cookies or
                  &quot;persistent&quot; cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Session Cookies:</strong> These are temporary and
                    are deleted when you close your browser
                  </li>
                  <li>
                    <strong>Persistent Cookies:</strong> These remain on your
                    device for a set period or until you delete them
                  </li>
                </ul>
                <p>
                  The duration of persistent cookies varies depending on their
                  purpose, but typically ranges from a few days to several
                  years.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Updates to This Policy
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We may update this cookie policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We will notify you of any significant
                  changes by posting the updated policy on this page.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Contact Us
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  If you have any questions about our use of cookies or this
                  cookie policy, please contact us through your profile settings
                  or by email.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
