import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageCircle, BookOpen, Sparkles } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">Help & FAQ</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Find answers to common questions and learn how to make the most of
          your FortuneAI experience.
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Sparkles className="w-5 h-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300">
              New to FortuneAI? Learn how to create your first reading and
              explore our mystical categories.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Choose a reading type that interests you</li>
              <li>• Ask a question or let us guide you</li>
              <li>• Receive your personalized AI reading</li>
              <li>• Save and revisit your favorite readings</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <BookOpen className="w-5 h-5" />
              Reading Types
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300">
              Explore our six mystical categories, each offering unique insights
              into different aspects of life.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Love &amp; Relationships</li>
              <li>• Career &amp; Success</li>
              <li>• General Life Guidance</li>
              <li>• Health &amp; Wellness</li>
              <li>• Family &amp; Friends</li>
              <li>• Travel &amp; Adventure</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-300">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              How does FortuneAI work?
            </h3>
            <p className="text-gray-300">
              FortuneAI uses advanced artificial intelligence to provide
              personalized fortune readings. You select a reading type, ask a
              question or let us guide you, and our AI generates a mystical,
              personalized response based on your input.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Are the readings real predictions?
            </h3>
            <p className="text-gray-300">
              FortuneAI is designed for entertainment and self-reflection
              purposes only. Our readings are not intended to provide actual
              predictions or professional advice. They are meant to inspire
              thought, provide perspective, and offer moments of introspection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Can I save my readings?
            </h3>
            <p className="text-gray-300">
              Yes! All your readings are automatically saved to your reading
              history. You can access them anytime from the &quot;My
              Readings&quot; section, mark favorites, add tags, and even share
              them with others.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              How do I share a reading?
            </h3>
            <p className="text-gray-300">
              You can share your readings in several ways: generate a shareable
              link, export as PDF or text, or share directly to social media.
              All sharing options are available from your reading detail page.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Is my data private and secure?
            </h3>
            <p className="text-gray-300">
              Absolutely. We take your privacy seriously. Your readings and
              personal information are encrypted and stored securely. You can
              control your privacy settings and export or delete your data at
              any time through your profile settings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Can I delete my account?
            </h3>
            <p className="text-gray-300">
              Yes, you can delete your account and all associated data at any
              time through your profile settings. This action is permanent and
              cannot be undone, so please make sure you want to proceed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              What if I have technical issues?
            </h3>
            <p className="text-gray-300">
              If you encounter any technical problems, try refreshing the page
              or clearing your browser cache. For persistent issues, you can
              contact us through your profile settings or email support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Is FortuneAI free to use?
            </h3>
            <p className="text-gray-300">
              Yes! FortuneAI is completely free to use. We believe in making
              mystical experiences accessible to everyone, so there are no
              subscription fees or hidden costs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-300">
            <MessageCircle className="w-5 h-5" />
            Still Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            If you couldn&apos;t find the answer you were looking for,
            we&apos;re here to help!
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Check your profile settings for contact options</p>
            <p>• Review our Privacy Policy and Terms of Service</p>
            <p>• Try refreshing the page or clearing your browser cache</p>
            <p>• Make sure you&apos;re using a supported browser</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
