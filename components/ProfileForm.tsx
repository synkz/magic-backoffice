"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface ProfileFormProps {
  initialFullName: string;
  userId: string;
}

export default function ProfileForm({ initialFullName, userId }: ProfileFormProps) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleUpdate() {
    setMessage(null);
    setMessageType(null);

    if (!fullName.trim()) {
      setMessage("Le nom complet ne peut pas être vide");
      setMessageType("error");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      // @ts-expect-error - Type inference issue with Supabase client
      .update({ full_name: fullName.trim() })
      .eq("id", userId);

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Profil mis à jour avec succès");
      setMessageType("success");
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
          Nom complet
        </label>
        <input
          id="full_name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Votre nom complet"
          disabled={isPending}
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        onClick={() => startTransition(handleUpdate)}
        disabled={isPending || fullName.trim() === initialFullName.trim()}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Mise à jour..." : "Mettre à jour le profil"}
      </button>

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

