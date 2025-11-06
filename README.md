# Magic Backoffice

Application Next.js avec intégration Supabase pour l'authentification.

## Prérequis

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

## Installation

1. **Cloner le projet et installer les dépendances**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

2. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.example .env.local
```

Puis remplissez les valeurs avec vos identifiants Supabase :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

### Obtenir vos identifiants Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans **Settings** > **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Développement

Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
src/
├── app/
│   ├── actions/
│   │   └── auth.ts          # Actions serveur pour l'authentification
│   ├── dashboard/
│   │   └── page.tsx         # Page dashboard (protégée)
│   ├── login/
│   │   └── page.tsx         # Page de connexion
│   └── ...
├── lib/
│   ├── supabase.ts          # Client Supabase côté client
│   └── supabase-server.ts   # Client Supabase côté serveur
└── middleware.ts            # Middleware pour protéger les routes
```

## Fonctionnalités

- ✅ Authentification avec email/mot de passe
- ✅ Inscription de nouveaux utilisateurs
- ✅ Déconnexion
- ✅ Protection des routes avec middleware
- ✅ Redirection automatique selon l'état de connexion

## Routes

- `/` - Page d'accueil
- `/login` - Page de connexion/inscription
- `/dashboard` - Page dashboard (protégée, nécessite une connexion)

## Déploiement

### Vercel

1. Poussez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement dans les paramètres du projet Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Déployez !

## Technologies utilisées

- [Next.js](https://nextjs.org) - Framework React
- [Supabase](https://supabase.com) - Backend as a Service
- [TypeScript](https://www.typescriptlang.org) - Typage statique
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS

## Documentation

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Supabase Auth avec Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
