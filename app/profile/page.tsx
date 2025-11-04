import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Récupérer le profil utilisateur
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mon profil</h1>
          <p className="text-gray-400">Gérez vos informations personnelles</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || user.email || ""}
                disabled
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">L&apos;email ne peut pas être modifié</p>
            </div>

            <ProfileForm initialFullName={profile?.full_name || ""} userId={user.id} />
          </div>
        </div>

        <div className="text-center">
          <a
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            ← Retour au dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

