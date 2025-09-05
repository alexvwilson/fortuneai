import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  By accessing and using FortuneAI (&quot;the Service&quot;),
                  you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                2. Description of Service
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  FortuneAI is an AI-powered fortune telling application that
                  provides entertainment and self-reflection through
                  personalized readings. The service is provided for
                  entertainment purposes only and should not be used as a
                  substitute for professional advice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                3. User Accounts
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  To use our service, you must create an account. You are
                  responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                4. Acceptable Use
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Transmit harmful, threatening, or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the service</li>
                  <li>
                    Use the service for commercial purposes without permission
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                5. Content and Intellectual Property
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  You retain ownership of the content you create (your questions
                  and notes), but grant us a license to use, store, and process
                  this content to provide our service. Our AI-generated
                  responses and the FortuneAI platform are protected by
                  intellectual property laws.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                6. Privacy and Data Protection
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Your privacy is important to us. Please review our Privacy
                  Policy to understand how we collect, use, and protect your
                  information. By using our service, you consent to our data
                  practices as described in the Privacy Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                7. Disclaimers
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>Entertainment Only:</strong> FortuneAI is provided for
                  entertainment purposes only. Our AI-generated readings are not
                  intended to provide professional advice, predictions, or
                  guidance for real-life decisions.
                </p>
                <p>
                  <strong>No Warranties:</strong> The service is provided
                  &quot;as is&quot; without warranties of any kind. We do not
                  guarantee the accuracy, reliability, or availability of the
                  service.
                </p>
                <p>
                  <strong>Third-Party Services:</strong> We use third-party
                  services (like OpenAI) to provide AI responses. We are not
                  responsible for the availability or performance of these
                  services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                8. Limitation of Liability
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  To the maximum extent permitted by law, FortuneAI shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including but not limited to loss of
                  profits, data, or use, arising out of or relating to your use
                  of the service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                9. Termination
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We may terminate or suspend your account at any time for
                  violation of these terms or for any other reason at our
                  discretion. You may also terminate your account at any time
                  through your profile settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                10. Changes to Terms
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We reserve the right to modify these terms at any time. We
                  will notify users of significant changes by posting the
                  updated terms on this page. Your continued use of the service
                  after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                11. Governing Law
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  These terms shall be governed by and construed in accordance
                  with applicable laws. Any disputes arising from these terms or
                  your use of the service shall be resolved through appropriate
                  legal channels.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                12. Contact Information
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  If you have any questions about these terms, please contact us
                  through your profile settings or by email.
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
