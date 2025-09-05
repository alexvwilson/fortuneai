import { Suspense } from "react";
import { ReadingTypeForm } from "@/components/readings/ReadingTypeForm";
import { getReadingTypesWithUserPreferences } from "@/lib/reading-types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default async function NewReadingSelectionPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const readingTypes = await getReadingTypesWithUserPreferences(userId);

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<Loading />}>
        <ReadingTypeForm readingTypes={readingTypes} />
      </Suspense>
    </div>
  );
}
