import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileCard from "@/components/profile/ProfileCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import PrivacyCard from "@/components/profile/PrivacyCard";
import DataExportCard from "@/components/profile/DataExportCard";
import { getUserProfileWithPreferences } from "@/lib/profile";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return null; // Layout will handle redirect
  }

  const preferences = await getUserProfileWithPreferences(user.id);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-purple-400">
            Your Profile & Preferences
          </CardTitle>
          <CardDescription className="text-gray-300">
            Manage your FortuneAI experience and data
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <ProfileCard user={user} preferences={preferences} />
        <PreferencesCard preferences={preferences} />
        <PrivacyCard preferences={preferences} />
        <DataExportCard userId={user.id} />
      </div>
    </div>
  );
}
