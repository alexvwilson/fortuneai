import { Suspense } from "react";
import { ReadingTypesContent } from "./ReadingTypesContent";
import Loading from "./loading";

export default function ReadingTypesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">
          Choose Your Reading Type
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Select from our mystical categories to begin your fortune telling
          journey. Each type offers unique insights tailored to different
          aspects of your life.
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <ReadingTypesContent />
      </Suspense>
    </div>
  );
}
