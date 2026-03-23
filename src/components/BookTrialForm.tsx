"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Phone, User, GraduationCap, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { useBookTrial } from "./BookTrialContext";
import { supabase } from "@/lib/supabase";

const steps = [
  { label: "Parent Info", icon: User },
  { label: "Child Details", icon: GraduationCap },
  { label: "Schedule", icon: Calendar },
  { label: "Done", icon: CheckCircle2 },
];

const classOptions = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const batchOptions = ["Saturday Morning (10 AM)", "Saturday Afternoon (2 PM)", "Sunday Morning (10 AM)", "Sunday Afternoon (2 PM)"];
const sourceOptions = ["Instagram", "Google Search", "Friend / Referral", "School Notice", "WhatsApp Group", "Other"];

export default function BookTrialForm() {
  const { isOpen, close } = useBookTrial();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    childName: "",
    childClass: "",
    batch: "",
    source: "",
  });

  if (!isOpen) return null;

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0) return form.parentName.trim().length >= 2 && form.phone.replace(/\D/g, "").length === 10;
    if (step === 1) return form.childName.trim().length >= 2 && form.childClass !== "";
    if (step === 2) return form.batch !== "";
    return true;
  };

  const next = () => {
    if (step < 3 && canNext()) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0 && step < 3) setStep(step - 1);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await supabase.from("trial_bookings").insert({
        parent_name: form.parentName,
        phone: form.phone,
        child_name: form.childName,
        child_class: form.childClass,
        batch: form.batch,
        source: form.source || null,
      });
    } catch {
      // silently continue — booking confirmation shown regardless
    }
    setSubmitting(false);
    next();
  };

  const handleClose = () => {
    close();
    // Reset after close animation
    setTimeout(() => {
      setStep(0);
      setForm({ parentName: "", phone: "", childName: "", childClass: "", batch: "", source: "" });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeSlideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={handleClose} aria-label="Close form" className="absolute top-4 right-4 p-1.5 rounded-lg text-pk-gray hover:bg-pk-gray-light hover:text-pk-text transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        {step < 3 && (
          <div className="px-6 pt-6 pb-0">
            <div className="flex items-center gap-1">
              {steps.slice(0, 3).map((s, i) => (
                <div key={s.label} className="flex-1">
                  <div className="h-1 rounded-full overflow-hidden bg-pk-gray-border/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        i < step ? "bg-pk-green w-full" : i === step ? "bg-pk-orange w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <div className={`flex items-center gap-1 mt-2 ${
                    i <= step ? "text-pk-text" : "text-pk-gray"
                  }`}>
                    <s.icon className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="px-6 pt-6 pb-6">

          {/* Step 0: Parent Info */}
          {step === 0 && (
            <div>
              <h3 className="text-lg font-bold text-pk-text mb-1">Let&apos;s get started</h3>
              <p className="text-sm text-pk-text-secondary mb-6">Tell us about yourself so we can reach you.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Your Name</label>
                  <div className="flex items-center gap-2 bg-pk-gray-light rounded-xl px-4 py-3 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
                    <User className="w-4 h-4 text-pk-gray flex-shrink-0" />
                    <input
                      type="text"
                      value={form.parentName}
                      onChange={(e) => update("parentName", e.target.value)}
                      placeholder="Enter your full name"
                      className="flex-1 bg-transparent text-sm outline-none text-pk-text placeholder:text-pk-gray"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Mobile Number</label>
                  <div className="flex items-center gap-2 bg-pk-gray-light rounded-xl px-4 py-3 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
                    <Phone className="w-4 h-4 text-pk-gray flex-shrink-0" />
                    <span className="text-sm text-pk-text-secondary font-medium flex-shrink-0">+91</span>
                    <div className="w-px h-5 bg-pk-gray-border flex-shrink-0" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10 digit number"
                      className="flex-1 bg-transparent text-sm outline-none text-pk-text placeholder:text-pk-gray"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Child Details */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-pk-text mb-1">About your child</h3>
              <p className="text-sm text-pk-text-secondary mb-6">This helps us place them in the right batch.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Child&apos;s Name</label>
                  <div className="flex items-center gap-2 bg-pk-gray-light rounded-xl px-4 py-3 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
                    <User className="w-4 h-4 text-pk-gray flex-shrink-0" />
                    <input
                      type="text"
                      value={form.childName}
                      onChange={(e) => update("childName", e.target.value)}
                      placeholder="Enter child's name"
                      className="flex-1 bg-transparent text-sm outline-none text-pk-text placeholder:text-pk-gray"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-1.5">Class / Grade</label>
                  <div className="grid grid-cols-4 gap-2">
                    {classOptions.map((c) => (
                      <button
                        key={c}
                        onClick={() => update("childClass", c)}
                        className={`py-2.5 rounded-xl text-[12px] font-semibold border transition-all ${
                          form.childClass === c
                            ? "bg-pk-orange/10 border-pk-orange text-pk-orange"
                            : "bg-pk-gray-light border-pk-gray-border text-pk-text-secondary hover:border-pk-gray"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-pk-text mb-1">Pick a batch</h3>
              <p className="text-sm text-pk-text-secondary mb-6">Choose a time that works for your family.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-2">Preferred Timing</label>
                  <div className="space-y-2">
                    {batchOptions.map((b) => (
                      <button
                        key={b}
                        onClick={() => update("batch", b)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                          form.batch === b
                            ? "bg-pk-orange/10 border-pk-orange text-pk-text font-semibold"
                            : "bg-pk-gray-light border-pk-gray-border text-pk-text-secondary hover:border-pk-gray"
                        }`}
                      >
                        <Calendar className={`w-4 h-4 flex-shrink-0 ${form.batch === b ? "text-pk-orange" : "text-pk-gray"}`} />
                        {b}
                        {form.batch === b && <CheckCircle2 className="w-4 h-4 text-pk-orange ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pk-text-secondary mb-2">How did you hear about us?</label>
                  <div className="flex flex-wrap gap-2">
                    {sourceOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => update("source", s)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                          form.source === s
                            ? "bg-pk-blue/10 border-pk-blue text-pk-blue"
                            : "bg-pk-gray-light border-pk-gray-border text-pk-text-secondary hover:border-pk-gray"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-pk-green/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-pk-green" />
              </div>
              <h3 className="text-xl font-bold text-pk-text mb-2">You&apos;re all set!</h3>
              <p className="text-sm text-pk-text-secondary mb-6 max-w-xs mx-auto leading-relaxed">
                We&apos;ll call you on <span className="font-semibold text-pk-text">+91 {form.phone}</span> within 24 hours to confirm {form.childName}&apos;s free trial class.
              </p>

              <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-4 text-left max-w-xs mx-auto mb-6">
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-pk-text-secondary">Student</span>
                    <span className="font-semibold text-pk-text">{form.childName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pk-text-secondary">Grade</span>
                    <span className="font-semibold text-pk-text">{form.childClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pk-text-secondary">Batch</span>
                    <span className="font-semibold text-pk-text">{form.batch}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[12px] text-pk-text-secondary">
                <Sparkles className="w-3.5 h-3.5 text-pk-orange" />
                <span>No payment required. First class is completely free.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        {step < 3 && (
          <div className="px-6 pb-6 flex items-center gap-3">
            {step > 0 && (
              <button onClick={prev} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-pk-text-secondary hover:text-pk-text rounded-xl hover:bg-pk-gray-light transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={step === 2 ? handleSubmit : next}
              disabled={!canNext() || submitting}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                canNext()
                  ? "bg-pk-orange text-white hover:bg-pk-orange-dark"
                  : "bg-pk-gray-border text-pk-gray cursor-not-allowed"
              }`}
            >
              {step === 2 ? "Book My Free Class" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Close button on success */}
        {step === 3 && (
          <div className="px-6 pb-6">
            <button onClick={handleClose} className="w-full py-3 rounded-xl text-sm font-semibold bg-pk-navy text-white hover:bg-pk-navy-light transition-colors active:scale-[0.97]">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
