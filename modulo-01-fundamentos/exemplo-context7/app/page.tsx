"use client";

import { authClient } from "@/lib/auth-client";

function GithubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 .7a11.3 11.3 0 0 0-3.58 22.02c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.12 1.17a10.9 10.9 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.21 5.64.41.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" /></svg>;
}

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#d7e6d5,transparent_38%),#f5f1e8] px-6 py-12">
      <section className="w-full max-w-lg border border-[#c7d1c2] bg-[#fbfaf5] p-8 shadow-[12px_12px_0_#c7d1c2] sm:p-12">
        <p className="mb-10 text-sm font-bold uppercase tracking-[0.2em] text-[#477157]">Demo Better Auth</p>
        <h1 className="text-5xl leading-[0.95] text-[#17211b]">Hello World</h1>
        <p className="mt-5 text-lg leading-7 text-[#536258]">Uma home mínima para testar autenticação social com GitHub.</p>
        <div className="mt-10 border-t border-[#dce3d8] pt-7">
          {isPending ? <p className="text-[#536258]">Verificando sessão...</p> : session ? (
            <div className="space-y-5"><p className="text-lg">Logado como <strong>{session.user.email || session.user.name}</strong></p><button onClick={() => authClient.signOut()} className="border border-[#17211b] px-5 py-3 font-sans text-sm font-bold transition hover:bg-[#17211b] hover:text-white">Sair</button></div>
          ) : (
            <div className="space-y-5"><p className="text-lg">Você não está logado.</p><button onClick={handleSignIn} className="inline-flex items-center gap-3 bg-[#17211b] px-5 py-3 font-sans text-sm font-bold text-white transition hover:bg-[#477157]"><GithubIcon /> Entrar com GitHub</button></div>
          )}
        </div>
      </section>
    </main>
  );
}
