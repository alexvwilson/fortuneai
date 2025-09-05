import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ReadingSession } from "@/components/readings/ReadingSession";
import { getReadingTypeById } from "@/lib/reading-types";
import Loading from "./loading";

interface PageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ question?: string }>;
}

export default async function ReadingSessionPage({
  params,
  searchParams,
}: PageProps) {
  const { type } = await params;
  const { question } = await searchParams;

  if (!question) {
    notFound();
  }

  const readingType = await getReadingTypeById(type);
  if (!readingType) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<Loading />}>
        <ReadingSession readingType={readingType} userQuestion={question} />
      </Suspense>
    </div>
  );
}
