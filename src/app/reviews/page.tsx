import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-pk-gray-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⭐</div>
        <h1 className="text-2xl font-extrabold text-pk-text mb-2">Reviews</h1>
        <p className="text-pk-text-secondary text-sm mb-6">This page is coming soon. Read what parents and students say about PromptKids.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-pk-orange hover:text-pk-orange-dark">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
