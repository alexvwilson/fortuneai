import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ReadingDetail } from "@/components/readings/ReadingDetail";
import { getReadingById } from "@/lib/readings";
import { auth } from "@clerk/nextjs/server";
import Loading from "./loading";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadingDetailPage({ params }: PageProps) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    notFound();
  }

  const reading = await getReadingById(id, userId);

  if (!reading) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<Loading />}>
        <ReadingDetail reading={reading} />
      </Suspense>
    </div>
  );
}
