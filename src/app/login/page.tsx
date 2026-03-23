"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useBookTrial } from "@/components/BookTrialContext";

export default function LoginPage() {
  const { open: openBookTrial } = useBookTrial();
  const [step, setStep] = useState<"phone" | "otp" | "welcome">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSendOtp = useCallback(() => {
    if (phone.replace(/\D/g, "").length === 10) {
      setStep("otp");
      setResendTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [phone]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newOtp.every((d) => d !== "") && index === 5) {
      setTimeout(() => setStep("welcome"), 500);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(30);
    otpRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-pk-navy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-pk-blue/[0.06] blur-[120px] -top-[10%] -left-[10%]" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-pk-orange/[0.04] blur-[100px] bottom-[10%] right-[5%]" />

      <div className="w-full max-w-sm relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/60 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="font-mono text-sm font-bold text-pk-blue bg-pk-blue/8 px-1.5 py-0.5 rounded">{`>_`}</span>
            <span className="text-[15px] font-bold text-pk-navy">
              Prompt<span className="text-pk-orange">Kids</span>
            </span>
          </div>

          {/* Step: Phone */}
          {step === "phone" && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-xl font-extrabold text-pk-text mb-1">Welcome back!</h1>
                <p className="text-sm text-pk-text-secondary">Enter your mobile number to login</p>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-pk-text-secondary mb-2">Mobile Number</label>
                <div className="flex items-center gap-2 bg-pk-gray-light rounded-xl px-4 py-3.5 border border-pk-gray-border focus-within:border-pk-orange/40 transition-colors">
                  <Phone className="w-4 h-4 text-pk-gray flex-shrink-0" />
                  <span className="text-sm text-pk-text font-medium flex-shrink-0">+91</span>
                  <div className="w-px h-5 bg-pk-gray-border flex-shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10 digit number"
                    className="flex-1 bg-transparent text-[15px] outline-none text-pk-text placeholder:text-pk-gray font-medium tracking-wide"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  />
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={phone.replace(/\D/g, "").length !== 10}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                  phone.replace(/\D/g, "").length === 10
                    ? "bg-pk-orange text-white hover:bg-pk-orange-dark"
                    : "bg-pk-gray-border text-pk-gray cursor-not-allowed"
                }`}
              >
                Send OTP <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-5 pt-5 border-t border-pk-gray-border text-center">
                <p className="text-xs text-pk-text-secondary">
                  New here?{" "}
                  <button onClick={openBookTrial} className="text-pk-orange font-semibold hover:text-pk-orange-dark">
                    Book a free trial class
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-xl font-extrabold text-pk-text mb-1">Enter OTP</h1>
                <p className="text-sm text-pk-text-secondary">
                  Sent to <span className="font-semibold text-pk-text">+91 {phone}</span>
                </p>
              </div>

              {/* OTP input boxes */}
              <div className="flex justify-center gap-2.5 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                      digit
                        ? "border-pk-orange bg-pk-orange/5 text-pk-text"
                        : "border-pk-gray-border bg-pk-gray-light text-pk-text focus:border-pk-orange/40"
                    }`}
                  />
                ))}
              </div>

              {/* Resend */}
              <div className="text-center mb-5">
                {resendTimer > 0 ? (
                  <p className="text-xs text-pk-text-secondary">
                    Resend OTP in <span className="font-semibold text-pk-text tabular-nums">{resendTimer}s</span>
                  </p>
                ) : (
                  <button onClick={handleResend} className="text-xs font-semibold text-pk-orange hover:text-pk-orange-dark">
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Change number */}
              <button
                onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); }}
                className="w-full text-center text-xs text-pk-text-secondary hover:text-pk-text"
              >
                Change mobile number
              </button>
            </div>
          )}

          {/* Step: Welcome */}
          {step === "welcome" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-pk-green/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-pk-green" />
              </div>
              <h1 className="text-xl font-extrabold text-pk-text mb-1">Welcome back!</h1>
              <p className="text-sm text-pk-text-secondary mb-6">
                Redirecting to your dashboard...
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pk-orange animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 rounded-full bg-pk-orange animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-pk-orange animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Student-focused messaging */}
        {step === "phone" && (
          <p className="text-center text-[11px] text-white/25 mt-6">
            For students &amp; parents of PromptKids
          </p>
        )}
      </div>
    </div>
  );
}
