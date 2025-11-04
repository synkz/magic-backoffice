import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AuthButton from "@/components/AuthButton";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Récupérer le profil utilisateur
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", user.id)
    .single();

  // Si le profil n'existe pas, le créer automatiquement
  if (profileError && (profileError.code === 'PGRST116' || profileError.code === '42P01')) {
    // Profil n'existe pas, le créer
    const { error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email || "",
      });

    if (insertError) {
      console.error("Error creating profile:", insertError);
    }

    // Réessayer de récupérer le profil
    const { data: newProfile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    const email = newProfile?.email || user.email || "";
    const fullName = newProfile?.full_name || null;

    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bonjour {email} — {fullName || "profil incomplet"}
              </h1>
            </div>
            <AuthButton compact />
          </div>

          {!fullName && (
            <div className="bg-blue-900/50 border border-blue-800 rounded-lg p-4 text-blue-200">
              <p className="mb-2">
                Votre profil n&apos;est pas complet. Veuillez ajouter votre nom complet pour finaliser votre profil.
              </p>
              <a
                href="/profile"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
              >
                Compléter mon profil →
              </a>
            </div>
          )}
        </div>
      </main>
    );
  }

  const email = profile?.email || user.email || "";
  const fullName = profile?.full_name || null;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bonjour {email} — {fullName || "profil incomplet"}
            </h1>
          </div>
          <AuthButton compact />
        </div>

        {!fullName && (
          <div className="bg-blue-900/50 border border-blue-800 rounded-lg p-4 text-blue-200">
            <p className="mb-2">
              Votre profil n&apos;est pas complet. Veuillez ajouter votre nom complet pour finaliser votre profil.
            </p>
            <a
              href="/profile"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
            >
              Compléter mon profil →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}


