import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AuthButton from "@/components/AuthButton";

export default async function LoginPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Se connecter</h1>
          <p className="text-sm text-gray-400">
            Connectez-vous avec un lien magique ou GitHub
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <AuthButton />
        </div>

        <p className="text-xs text-center text-gray-500">
          Le lien magique vous sera envoyé par email. Vous pouvez aussi vous connecter avec GitHub ou Google si configurés.
        </p>
      </div>
    </main>
  );
}


