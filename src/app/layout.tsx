import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { BookTrialProvider } from "@/components/BookTrialContext";
import BookTrialForm from "@/components/BookTrialForm";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PromptKids — India's Smartest AI Class for Kids | Gurugram",
  description:
    "India's smartest extra class for Class 6–12. PromptKids teaches children in Gurugram how to use AI tools to study smarter, score better, and think bigger.",
  keywords: "AI for kids, prompt engineering, Gurugram, AI classes, PromptKids, AI education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${jetbrains.variable} ${nunito.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <BookTrialProvider>
          {children}
          <BookTrialForm />
        </BookTrialProvider>
      </body>
    </html>
  );
}
