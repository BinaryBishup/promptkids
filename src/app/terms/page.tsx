import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-pk-text-secondary hover:text-pk-text mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-extrabold text-pk-text mb-2">Terms of Service</h1>
        <p className="text-sm text-pk-text-secondary mb-10">Last updated: March 2025</p>

        <div className="prose prose-sm max-w-none text-pk-text-secondary leading-relaxed space-y-6">
          <section>
            <h2 className="text-lg font-bold text-pk-text">1. Acceptance of Terms</h2>
            <p>By enrolling your child in PromptKids or using our platform, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">2. Services</h2>
            <p>PromptKids provides online AI education classes for students in Class 6&ndash;12. Our services include live online sessions, AI-powered learning tools (LearnBot, HomeworkAI), parent dashboards, and related educational content.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">3. Eligibility</h2>
            <p>Our programs are designed for students aged 11&ndash;18 (Class 6&ndash;12). A parent or legal guardian must register the student and is responsible for their child&apos;s use of the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">4. Free Trial</h2>
            <p>The first class is free with no payment or commitment required. Continued enrollment after the trial requires payment as per the selected program tier.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">5. AI Usage Policy</h2>
            <p>All AI interactions on our platform are supervised and logged. Students must not use our AI tools to generate content for academic dishonesty, produce harmful content, or bypass the learning process. HomeworkAI is designed to guide, not provide answers — misuse may result in restricted access.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">6. Intellectual Property</h2>
            <p>All course materials, platform features, and content are the property of PromptKids. Students and parents may not reproduce, distribute, or commercially use any materials without written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">7. Payments &amp; Refunds</h2>
            <p>Payment is due before the start of each program cycle. Refund requests made within 7 days of enrollment and before the 3rd session will be processed in full. After this period, refunds are provided on a pro-rata basis.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">8. Class Schedule</h2>
            <p>All classes are conducted online on Saturdays and Sundays. PromptKids reserves the right to reschedule classes with 24 hours&apos; notice. Makeup sessions will be arranged for any cancelled classes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">9. Limitation of Liability</h2>
            <p>PromptKids provides educational services on an &quot;as is&quot; basis. We do not guarantee specific academic outcomes. Our liability is limited to the fees paid for the current program cycle.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-pk-text">10. Contact</h2>
            <p>For questions about these terms, email <span className="text-pk-text font-medium">hello@promptkids.in</span> or visit our <Link href="/contact" className="text-pk-orange font-medium hover:text-pk-orange-dark">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
