"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { toast } from "react-hot-toast";
import type { UserPreferences } from "@/drizzle/schema";

interface ProfileCardProps {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  };
  preferences: UserPreferences | null;
}

export default function ProfileCard({ user, preferences }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  const handleSave = async () => {
    try {
      await updateProfile({ firstName, lastName });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400">
          Profile Information
        </CardTitle>
        <CardDescription className="text-gray-300">
          Manage your personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                value={user.emailAddresses[0]?.emailAddress || ""}
                disabled
                className="bg-gray-800 border-gray-600 text-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="firstName" className="text-gray-300">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-400">Email</Label>
              <p className="text-white">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <div>
              <Label className="text-gray-400">Name</Label>
              <p className="text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
