"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shield,
  Users,
  BookOpen,
  Loader2,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";

const steps = [
  { label: "Parent Info", icon: User },
  { label: "Child Details", icon: GraduationCap },
  { label: "Schedule", icon: Calendar },
  { label: "Verify OTP", icon: Shield },
  { label: "Done", icon: CheckCircle2 },
];

const classOptions = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];
const batchOptions = [
  "Saturday Morning (10 AM)",
  "Saturday Afternoon (2 PM)",
  "Sunday Morning (10 AM)",
  "Sunday Afternoon (2 PM)",
];
const sourceOptions = [
  "Instagram",
  "Google Search",
  "Friend / Referral",
  "School Notice",
  "WhatsApp Group",
  "Other",
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI-Powered Curriculum",
    desc: "Learn ChatGPT, Midjourney, coding & more with hands-on projects.",
  },
  {
    icon: Users,
    title: "Live Expert Classes",
    desc: "Small batch sizes with personal attention from industry mentors.",
  },
  {
    icon: BookOpen,
    title: "Real-World Projects",
    desc: "Build apps, create art, and solve problems using AI tools.",
  },
  {
    icon: Shield,
    title: "Safe & Age-Appropriate",
    desc: "Curated content designed specifically for students in Class 6-12.",
  },
];

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    childName: "",
    childClass: "",
    batch: "",
    source: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0)
      return (
        form.parentName.trim().length >= 2 &&
        form.phone.replace(/\D/g, "").length === 10
      );
    if (step === 1)
      return form.childName.trim().length >= 2 && form.childClass !== "";
    if (step === 2) return form.batch !== "";
    return true;
  };

  const next = () => {
    if (step < 4 && canNext()) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0 && step < 3) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    const supabase = getSupabase();
    const cleanPhone = form.phone.replace(/\D/g, "");

    try {
      // 1. Save booking
      await supabase.from("trial_bookings").insert({
        parent_name: form.parentName,
        phone: cleanPhone,
        child_name: form.childName,
        child_class: form.childClass,
        batch: form.batch,
        source: form.source || null,
      });

      // 2. Send OTP
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${cleanPhone}`,
      });

      if (error) {
        setSubmitError(error.message);
        setSubmitting(false);
        return;
      }

      // Move to OTP step
      setStep(3);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
    }

    setSubmitting(false);
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const supabase = getSupabase();
      const cleanPhone = form.phone.replace(/\D/g, "");
      const { error } = await supabase.auth.verifyOtp({
        phone: `+91${cleanPhone}`,
        token: otpCode,
        type: "sms",
      });
      if (error) throw error;

      // Link booking to user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("trial_bookings")
          .update({ user_id: user.id })
          .eq("phone", cleanPhone)
          .is("user_id", null);
      }

      // Move to success step
      setStep(4);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid OTP";
      setOtpError(message);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
    setOtpLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== "") && index === 5) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpLoading(true);
    try {
      const supabase = getSupabase();
      const cleanPhone = form.phone.replace(/\D/g, "");
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${cleanPhone}`,
      });
      if (error) {
        setOtpError(error.message);
      } else {
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
      }
    } catch {
      setOtpError("Failed to resend OTP");
    }
    setOtpLoading(false);
  };

  // Progress percentage for the form steps
  const progressSteps = step >= 4 ? 3 : Math.min(step, 3);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-pk-navy relative flex-col justify-between p-10 xl:p-14 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-pk-orange blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-pk-blue blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pk-orange to-pk-orange-dark flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Prompt<span className="text-pk-orange">Kids</span>
            </span>
          </Link>

          {/* Tagline */}
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
            Future-proof your child{" "}
            <span className="text-pk-orange">with AI skills</span>
          </h1>
          <p className="text-base text-white/60 mb-10 max-w-md">
            India&apos;s first AI learning platform for school students. Book a
            free trial class today.
          </p>

          {/* Benefits */}
          <div className="space-y-5">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-pk-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.title}</p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 mt-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-white/80 italic leading-relaxed mb-4">
              &ldquo;My daughter built her first AI chatbot in just 2 weeks!
              She&apos;s now more confident with technology than most adults I
              know. PromptKids made it so easy and fun.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pk-orange/20 flex items-center justify-center">
                <span className="text-sm font-bold text-pk-orange">RP</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Ritu Patel
                </p>
                <p className="text-xs text-white/40">
                  Parent of Class 9 student
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header (shown only on small screens) */}
      <div className="lg:hidden bg-pk-navy px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pk-orange to-pk-orange-dark flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Prompt<span className="text-pk-orange">Kids</span>
          </span>
        </Link>
        <p className="text-sm text-white/60">
          Book a free AI trial class for your child
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center px-6 py-10 lg:py-0">
          <div className="w-full max-w-md">
            {/* Step indicator */}
            {step < 4 && (
              <div className="mb-8">
                <div className="flex items-center gap-1.5 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1">
                      <div className="h-1.5 rounded-full overflow-hidden bg-pk-gray-border/60">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            i < progressSteps
                              ? "bg-pk-green w-full"
                              : i === progressSteps
                              ? "bg-pk-orange w-full"
                              : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => {
                    const s = steps[i];
                    return (
                      <div
                        key={s.label}
                        className={`flex items-center gap-1 ${
                          i <= progressSteps
                            ? "text-pk-text"
                            : "text-pk-gray"
                        }`}
                      >
                        <s.icon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-semibold">
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 0: Parent Info */}
            <div
              className={`transition-all duration-300 ${
                step === 0
                  ? "opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {step === 0 && (
                <>
                  <h2 className="text-2xl font-bold text-pk-text mb-1">
                    Let&apos;s get started
                  </h2>
                  <p className="text-sm text-pk-text-secondary mb-8">
                    Tell us about yourself so we can reach you.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2">
                        Your Name
                      </label>
                      <div className="flex items-center gap-3 bg-pk-gray-light rounded-xl px-4 py-3.5 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
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
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2">
                        Mobile Number
                      </label>
                      <div className="flex items-center gap-3 bg-pk-gray-light rounded-xl px-4 py-3.5 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
                        <Phone className="w-4 h-4 text-pk-gray flex-shrink-0" />
                        <span className="text-sm text-pk-text-secondary font-medium flex-shrink-0">
                          +91
                        </span>
                        <div className="w-px h-5 bg-pk-gray-border flex-shrink-0" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            update(
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          placeholder="10 digit number"
                          className="flex-1 bg-transparent text-sm outline-none text-pk-text placeholder:text-pk-gray"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Step 1: Child Details */}
            <div
              className={`transition-all duration-300 ${
                step === 1
                  ? "opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-pk-text mb-1">
                    About your child
                  </h2>
                  <p className="text-sm text-pk-text-secondary mb-8">
                    This helps us place them in the right batch.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2">
                        Child&apos;s Name
                      </label>
                      <div className="flex items-center gap-3 bg-pk-gray-light rounded-xl px-4 py-3.5 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
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
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2">
                        Class / Grade
                      </label>
                      <div className="grid grid-cols-4 gap-2.5">
                        {classOptions.map((c) => (
                          <button
                            key={c}
                            onClick={() => update("childClass", c)}
                            className={`py-3 rounded-xl text-[13px] font-semibold border transition-all ${
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
                </>
              )}
            </div>

            {/* Step 2: Schedule */}
            <div
              className={`transition-all duration-300 ${
                step === 2
                  ? "opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-pk-text mb-1">
                    Pick a batch
                  </h2>
                  <p className="text-sm text-pk-text-secondary mb-8">
                    Choose a time that works for your family.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2.5">
                        Preferred Timing
                      </label>
                      <div className="space-y-2.5">
                        {batchOptions.map((b) => (
                          <button
                            key={b}
                            onClick={() => update("batch", b)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all ${
                              form.batch === b
                                ? "bg-pk-orange/10 border-pk-orange text-pk-text font-semibold"
                                : "bg-pk-gray-light border-pk-gray-border text-pk-text-secondary hover:border-pk-gray"
                            }`}
                          >
                            <Calendar
                              className={`w-4 h-4 flex-shrink-0 ${
                                form.batch === b
                                  ? "text-pk-orange"
                                  : "text-pk-gray"
                              }`}
                            />
                            {b}
                            {form.batch === b && (
                              <CheckCircle2 className="w-4 h-4 text-pk-orange ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-pk-text-secondary mb-2.5">
                        How did you hear about us?{" "}
                        <span className="font-normal text-pk-gray">
                          (optional)
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {sourceOptions.map((s) => (
                          <button
                            key={s}
                            onClick={() => update("source", s)}
                            className={`px-3.5 py-2 rounded-lg text-[12px] font-medium border transition-all ${
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

                    {submitError && (
                      <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Step 3: OTP Verification */}
            <div
              className={`transition-all duration-300 ${
                step === 3
                  ? "opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {step === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-pk-orange/10 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-pk-orange" />
                  </div>
                  <h2 className="text-2xl font-bold text-pk-text mb-2">
                    Verify your number
                  </h2>
                  <p className="text-sm text-pk-text-secondary mb-8">
                    Enter the 6-digit OTP sent to{" "}
                    <span className="font-semibold text-pk-text">
                      +91 {form.phone}
                    </span>
                  </p>

                  {otpError && (
                    <div className="mb-5 flex items-center justify-center gap-2 text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        disabled={otpLoading}
                        autoFocus={i === 0}
                        className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                          digit
                            ? "border-pk-orange bg-pk-orange/5 text-pk-text"
                            : "border-pk-gray-border bg-pk-gray-light text-pk-text focus:border-pk-orange/40"
                        } ${otpLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      />
                    ))}
                  </div>

                  {otpLoading && (
                    <div className="flex items-center justify-center gap-2 text-sm text-pk-text-secondary mb-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  )}

                  <button
                    onClick={handleResendOtp}
                    disabled={otpLoading}
                    className="text-sm text-pk-blue hover:text-pk-blue-dark font-medium transition-colors disabled:opacity-50"
                  >
                    Didn&apos;t receive OTP? Resend
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="block mx-auto mt-4 text-xs text-pk-gray hover:text-pk-text-secondary transition-colors"
                  >
                    Go back to edit details
                  </button>
                </div>
              )}
            </div>

            {/* Step 4: Success */}
            <div
              className={`transition-all duration-300 ${
                step === 4
                  ? "opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {step === 4 && (
                <div className="text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-pk-green/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-pk-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-pk-text mb-2">
                    You&apos;re all set!
                  </h2>
                  <p className="text-sm text-pk-text-secondary mb-8 max-w-sm mx-auto leading-relaxed">
                    Your trial class has been booked and your account is
                    verified. Welcome to PromptKids!
                  </p>

                  <div className="bg-pk-gray-light rounded-xl border border-pk-gray-border p-5 text-left max-w-sm mx-auto mb-8">
                    <h4 className="text-xs font-semibold text-pk-text-secondary uppercase tracking-wide mb-3">
                      Booking Summary
                    </h4>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-pk-text-secondary">Student</span>
                        <span className="font-semibold text-pk-text">
                          {form.childName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pk-text-secondary">Grade</span>
                        <span className="font-semibold text-pk-text">
                          {form.childClass}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pk-text-secondary">Batch</span>
                        <span className="font-semibold text-pk-text">
                          {form.batch}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pk-text-secondary">Phone</span>
                        <span className="font-semibold text-pk-text">
                          +91 {form.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-pk-navy text-white hover:bg-pk-navy-light transition-colors active:scale-[0.97]"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer Buttons for steps 0-2 */}
            {step < 3 && (
              <div className="mt-8 flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={prev}
                    className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-pk-text-secondary hover:text-pk-text rounded-xl hover:bg-pk-gray-light transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
                <button
                  onClick={step === 2 ? handleSubmit : next}
                  disabled={!canNext() || submitting}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                    canNext() && !submitting
                      ? "bg-pk-orange text-white hover:bg-pk-orange-dark"
                      : "bg-pk-gray-border text-pk-gray cursor-not-allowed"
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Booking...
                    </>
                  ) : step === 2 ? (
                    <>
                      Book My Free Class
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Login link */}
            {step < 4 && (
              <p className="text-center text-sm text-pk-text-secondary mt-8">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-pk-blue font-semibold hover:text-pk-blue-dark transition-colors"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
