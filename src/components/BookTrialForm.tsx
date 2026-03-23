"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookTrial } from "./BookTrialContext";

export default function BookTrialForm() {
  const { isOpen, close } = useBookTrial();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      close();
      router.push("/signup");
    }
  }, [isOpen, close, router]);

  return null;
}
