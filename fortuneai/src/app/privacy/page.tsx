import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your email address and basic profile
                  information through Clerk authentication.
                </p>
                <p>
                  <strong>Fortune Reading Data:</strong> We store your fortune
                  reading questions, AI responses, and any tags or notes you add
                  to your readings.
                </p>
                <p>
                  <strong>Usage Data:</strong> We collect information about how
                  you use our service, including reading types you prefer and
                  frequency of use.
                </p>
                <p>
                  <strong>Device Information:</strong> We automatically collect
                  certain information about your device, including IP address,
                  browser type, and operating system.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our fortune telling services</li>
                  <li>Personalize your reading experience</li>
                  <li>Store and organize your reading history</li>
                  <li>Communicate with you about your account</li>
                  <li>Ensure the security and integrity of our service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                3. Information Sharing
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    When you explicitly choose to share a reading with others
                  </li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>
                    With service providers who assist in operating our platform
                    (like OpenAI for AI responses)
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                4. Data Security
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication through Clerk</li>
                  <li>Regular security audits and updates</li>
                  <li>
                    Limited access to personal information on a need-to-know
                    basis
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                5. Your Rights
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your reading data</li>
                  <li>Opt out of certain data processing activities</li>
                </ul>
                <p>
                  To exercise these rights, please contact us or use the data
                  management tools in your profile settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                6. Cookies and Tracking
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We use cookies and similar technologies to enhance your
                  experience, remember your preferences, and analyze how you use
                  our service. You can control cookie settings through your
                  browser.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                7. Children&apos;s Privacy
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Our service is not intended for children under 13. We do not
                  knowingly collect personal information from children under 13.
                  If you believe we have collected information from a child
                  under 13, please contact us immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                8. Changes to This Policy
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the &quot;Last updated&quot; date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                9. Contact Us
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  If you have any questions about this privacy policy or our
                  data practices, please contact us through your profile
                  settings or by email.
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
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
