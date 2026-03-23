export function ChatGPTLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10a37f"/>
    </svg>
  );
}

export function ClaudeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M16.098 10.267l-3.81 7.129h-2.64l3.81-7.13h2.64zm-5.433 7.129L14.478 10.267h-2.64l-3.81 7.13h2.637zm8.06-7.129l-3.81 7.129h-2.64l3.81-7.13h2.64zM7.853 10.267L4.044 17.396h-2.64l3.81-7.13h2.64zm12.695 0l-3.81 7.129h-2.64l3.81-7.13h2.64z" fill="#d97757"/>
    </svg>
  );
}

export function PerplexityLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="#1a7f64" strokeWidth="1.5" fill="none"/>
      <path d="M12 2v20M4 7l8 5 8-5M4 17l8-5 8 5" stroke="#1a7f64" strokeWidth="1.5"/>
    </svg>
  );
}

export function CanvaLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00c4cc"/>
      <path d="M14.5 8.5c-.8-.8-2.2-.8-3 0l-3 3c-.8.8-.8 2.2 0 3l.5.5c.8.8 2.2.8 3 0l3-3c.8-.8.8-2.2 0-3l-.5-.5z" fill="white"/>
      <circle cx="15" cy="9" r="1.5" fill="white"/>
    </svg>
  );
}

import { useId } from "react";

export function GeminiLogo({ className = "w-4 h-4" }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={`url(#${id})`}/>
      <path d="M12 6c-1.1 0-2 .9-2 2v2.5L7.5 12 10 13.5V16c0 1.1.9 2 2 2s2-.9 2-2v-2.5l2.5-1.5L14 10.5V8c0-1.1-.9-2-2-2z" fill="white"/>
      <defs>
        <linearGradient id={id} x1="2" y1="2" x2="22" y2="22">
          <stop stopColor="#4285f4"/>
          <stop offset="0.5" stopColor="#9b72cb"/>
          <stop offset="1" stopColor="#d96570"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NotebookLMLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" fill="#fbbf24"/>
      <path d="M8 6h8M8 10h8M8 14h5" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="17" r="4" fill="#ea580c"/>
      <path d="M15.5 17l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MidjourneyLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1a1a2e"/>
      <path d="M7 17c1-4 3-8 5-10s4-1 5 2-1 7-3 9-4 1-5-1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="8" r="1.5" fill="#8b5cf6"/>
    </svg>
  );
}

export function GammaLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 8v8l9 5 9-5V8l-9-5z" fill="#e11d48"/>
      <path d="M12 3v18M3 8l9 5 9-5" stroke="white" strokeWidth="1" opacity="0.5"/>
      <path d="M8 10l4 2.5L16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function BoltLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#2563eb"/>
      <path d="M13 4L7 13h4l-1 7 6-9h-4l1-7z" fill="white"/>
    </svg>
  );
}

export function V0Logo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0a0a0a"/>
      <path d="M8 8l4 8 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17" cy="16" r="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function ZapierLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z" fill="#ff4a00"/>
    </svg>
  );
}

// Map tool name → logo component
export const toolLogoMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ChatGPT: ChatGPTLogo,
  Claude: ClaudeLogo,
  Perplexity: PerplexityLogo,
  "Canva AI": CanvaLogo,
  Gemini: GeminiLogo,
  NotebookLM: NotebookLMLogo,
  Midjourney: MidjourneyLogo,
  Gamma: GammaLogo,
  Bolt: BoltLogo,
  v0: V0Logo,
  Zapier: ZapierLogo,
};

export function ToolIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const Logo = toolLogoMap[name];
  if (!Logo) return <span className={`${className} rounded bg-gray-300`} />;
  return <Logo className={className} />;
}
