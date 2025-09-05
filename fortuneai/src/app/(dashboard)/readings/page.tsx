import { Suspense } from "react";
import { ReadingHistory } from "@/components/readings/ReadingHistory";
import { getUserReadings } from "@/lib/readings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default async function ReadingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const readings = await getUserReadings(userId);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          My Fortune Readings
        </h1>
        <p className="text-gray-400">
          Explore your mystical journey through time
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <ReadingHistory readings={readings} />
      </Suspense>
    </div>
  );
}
