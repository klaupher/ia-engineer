# GitHub Auth Demo

Demo mínimo de Next.js App Router com Better Auth, GitHub OAuth e SQLite local.

## Configuração

1. Crie um OAuth App no GitHub. Use `http://localhost:3000/api/auth/callback/github` como callback.
2. Copie `.env.example` para `.env.local` e preencha `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` e `BETTER_AUTH_SECRET`.
3. Instale as dependências, migre o banco e inicie o servidor:

```bash
npm install
npx auth@latest migrate
npm run dev
```

Abra http://localhost:3000. O arquivo `better-auth.sqlite` será criado na raiz e armazenará usuários e sessões.
