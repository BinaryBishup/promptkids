"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Clock, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { useBookTrial } from "@/components/BookTrialContext";
import { getSupabase } from "@/lib/supabase";

export default function ContactPage() {
  const { open: openBookTrial } = useBookTrial();
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await getSupabase().from("contact_messages").insert({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
      });
      setSubmitted(true);
    } catch {
      // silently handle
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-pk-text-secondary hover:text-pk-text mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <span className="eyebrow mb-4 block">Contact Us</span>
            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-pk-text tracking-[-0.02em] mb-4">
              Have a question?
              <br />We&apos;d love to hear from you.
            </h1>
            <p className="text-[15px] text-pk-text-secondary leading-relaxed mb-8">
              Whether you&apos;re a parent exploring options, a school looking to partner, or just curious — reach out and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@promptkids.in", color: "text-pk-green", bg: "bg-pk-green/8" },
                { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210", color: "text-pk-blue", bg: "bg-pk-blue/8" },
                { icon: Clock, label: "Class Schedule", value: "Saturdays & Sundays (Online)", color: "text-pk-orange", bg: "bg-pk-orange/8" },
                { icon: MapPin, label: "Based in", value: "Gurugram, Haryana, India", color: "text-pk-purple", bg: "bg-pk-purple/8" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${item.bg} flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-[11px] text-pk-text-secondary font-semibold uppercase tracking-wider">{item.label}</div>
                    <div className="text-[14px] text-pk-text font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="bg-pk-gray-light rounded-2xl border border-pk-gray-border p-6 sm:p-8">
            <h2 className="text-lg font-bold text-pk-text mb-1">Send us a message</h2>
            <p className="text-sm text-pk-text-secondary mb-6">We typically respond within a few hours.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-pk-green/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-pk-green" />
                </div>
                <h3 className="text-lg font-bold text-pk-text mb-1">Message sent!</h3>
                <p className="text-sm text-pk-text-secondary">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Your Name</label>
                  <input type="text" required value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="w-full px-4 py-2.5 bg-white rounded-xl border border-pk-gray-border text-sm outline-none focus:border-pk-orange/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Email</label>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" className="w-full px-4 py-2.5 bg-white rounded-xl border border-pk-gray-border text-sm outline-none focus:border-pk-orange/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Phone (optional)</label>
                  <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 bg-white rounded-xl border border-pk-gray-border text-sm outline-none focus:border-pk-orange/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Message</label>
                  <textarea rows={4} required value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us what you'd like to know..." className="w-full px-4 py-2.5 bg-white rounded-xl border border-pk-gray-border text-sm outline-none focus:border-pk-orange/40 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-pk-orange text-white text-sm font-semibold rounded-xl hover:bg-pk-orange-dark transition-colors active:scale-[0.97] disabled:opacity-60">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-pk-gray-border text-center">
              <p className="text-sm text-pk-text-secondary mb-2">Want to book a free trial instead?</p>
              <button onClick={openBookTrial} className="inline-flex items-center gap-1.5 text-sm font-semibold text-pk-orange hover:text-pk-orange-dark">
                <MessageSquare className="w-4 h-4" /> Book Free Trial Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
