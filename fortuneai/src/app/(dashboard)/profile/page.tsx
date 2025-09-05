import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileCard from "@/components/profile/ProfileCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import PrivacyCard from "@/components/profile/PrivacyCard";
import DataExportCard from "@/components/profile/DataExportCard";
import { getUserProfileWithPreferences } from "@/lib/profile";
import { SerializedUserData } from "@/lib/types";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return null; // Layout will handle redirect
  }

  // Extract only serializable data from Clerk user object
  const userData: SerializedUserData = {
    id: user.id,
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress,
      id: email.id,
    })),
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

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
        <ProfileCard userData={userData} />
        <PreferencesCard preferences={preferences} />
        <PrivacyCard preferences={preferences} />
        <DataExportCard />
      </div>
    </div>
  );
}
