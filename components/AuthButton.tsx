"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface AuthButtonProps {
  compact?: boolean;
}

export default function AuthButton({ compact = false }: AuthButtonProps) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  const getCallbackUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/auth/callback`;
    }
    return "http://localhost:3000/auth/callback";
  };

  async function signInWithOtp() {
    setMessage(null);
    setMessageType(null);
    
    if (!email) {
      setMessage("Veuillez entrer une adresse email");
      setMessageType("error");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getCallbackUrl(),
      },
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Si un compte existe, un lien magique a été envoyé par email.");
      setMessageType("success");
      setEmail("");
    }
  }

  async function signInWithGitHub() {
    setMessage(null);
    setMessageType(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getCallbackUrl(),
      },
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  }

  async function signInWithGoogle() {
    setMessage(null);
    setMessageType(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getCallbackUrl(),
      },
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  }

  async function signOut() {
    setMessage(null);
    setMessageType(null);
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  if (compact) {
    return (
      <button
        onClick={() => startTransition(signOut)}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
      >
        Se déconnecter
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          disabled={isPending}
        />
        <button
          onClick={() => startTransition(signInWithOtp)}
          disabled={isPending || !email}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Envoi..." : "Envoyer le lien magique"}
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">ou</span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => startTransition(signInWithGitHub)}
          disabled={isPending}
          className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuer avec GitHub
        </button>
        <button
          onClick={() => startTransition(signInWithGoogle)}
          disabled={isPending}
          className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuer avec Google
        </button>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            messageType === "error"
              ? "bg-red-900/50 text-red-200 border border-red-800"
              : "bg-green-900/50 text-green-200 border border-green-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}


