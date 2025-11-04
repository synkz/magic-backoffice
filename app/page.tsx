import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2">Bienvenue</h1>
        <p className="text-gray-400 mb-8">
          {user
            ? "Vous êtes connecté. Accédez à votre tableau de bord."
            : "Connectez-vous pour accéder à votre tableau de bord."}
        </p>
        {user ? (
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Aller au dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Se connecter
          </Link>
        )}
      </div>
    </main>
  );
}
