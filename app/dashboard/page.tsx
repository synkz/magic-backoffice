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
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", user.id)
    .single();

  const email = profile?.email || user.email || "";
  const fullName = profile?.full_name || null;
  const displayText = fullName ? `${email} — ${fullName}` : `${email} — profil incomplet`;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Bonjour {displayText}</h1>
          </div>
          <AuthButton compact />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Profil</h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-medium">Email:</span> {email}</p>
            {fullName ? (
              <p><span className="font-medium">Nom complet:</span> {fullName}</p>
            ) : (
              <p className="text-gray-500 italic">Profil incomplet — <a href="/profile" className="text-blue-400 hover:underline">compléter le profil</a></p>
            )}
            <p><span className="font-medium">ID:</span> <span className="text-xs text-gray-500">{user.id}</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}


