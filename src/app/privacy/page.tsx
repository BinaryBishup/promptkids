import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-pk-text-secondary hover:text-pk-text mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-extrabold text-pk-text mb-2">Privacy Policy</h1>
        <p className="text-sm text-pk-text-secondary mb-10">Last updated: March 2025</p>

        <div className="prose prose-sm max-w-none text-pk-text-secondary leading-relaxed space-y-6">
          <section>
            <h2 className="text-lg font-bold text-pk-text">1. Information We Collect</h2>
            <p>We collect personal information that you provide when booking a trial class or creating an account, including parent name, phone number, email, child&apos;s name, and class/grade. We also collect usage data from our platform including session activity, AI interactions, and learning progress.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">2. How We Use Your Information</h2>
            <p>We use collected information to: provide and improve our educational services, communicate with parents about their child&apos;s progress, send class schedules and updates, personalize the learning experience, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">3. Data Protection for Minors</h2>
            <p>We take extra care with data from students under 18. All student data is accessible only to their registered parent/guardian. AI interaction logs are stored securely and are never shared with third parties. Parents can request full deletion of their child&apos;s data at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">4. AI Interaction Data</h2>
            <p>All AI interactions through LearnBot and HomeworkAI are logged for educational quality and safety purposes. These logs are reviewed by our teaching team and are accessible to parents through the Parent Dashboard. We do not use student AI interaction data for advertising or sell it to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">5. Data Sharing</h2>
            <p>We do not sell personal information. We may share data with: AI service providers (OpenAI, Anthropic, Google) solely to power our educational tools, payment processors for billing, and law enforcement if legally required.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">6. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits to protect your information.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <span className="text-pk-text font-medium">hello@promptkids.in</span>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">8. Contact</h2>
            <p>For privacy-related questions, email <span className="text-pk-text font-medium">hello@promptkids.in</span> or visit our <Link href="/contact" className="text-pk-orange font-medium hover:text-pk-orange-dark">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
