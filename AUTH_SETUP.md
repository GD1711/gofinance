# 🔐 AUTENTICAÇÃO - SETUP GOOGLE OAUTH

## ✅ Implementado

### 1. NextAuth.js v5 (Auth.js)
- ✅ Instalado: `next-auth@beta`
- ✅ Configuração: `src/auth.ts`
- ✅ API Route: `src/app/api/auth/[...nextauth]/route.ts`
- ✅ Provider: Google OAuth 2.0

### 2. Componentes Criados
- ✅ **ProfileModal** - Modal de perfil com glassmorphism
- ✅ **LoginPage** - Página de login com botão Google
- ✅ **SessionProvider** - Wrapper global no layout

### 3. Features
- ✅ Avatar do Google (não editável)
- ✅ Nome e email da conta Google
- ✅ Configurações editáveis:
  - Meta de poupança (5-30%)
  - Alertas financeiros (on/off)
  - Tema (dark/light/system)
- ✅ Logout
- ✅ Redirect automático para /login se não autenticado

---

## 🚀 PRÓXIMOS PASSOS

### 1️⃣ Configure as credenciais do Google

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Crie um novo projeto ou selecione existente
3. Vá em "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
4. Configure:
   - Application type: **Web application**
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://seu-dominio.com/api/auth/callback/google` (produção)

5. Copie **Client ID** e **Client Secret**

### 2️⃣ Crie o arquivo `.env.local`

```bash
# Copie o .env.local.example
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
NEXTAUTH_SECRET=gere-um-secret-forte-aqui
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=seu-google-client-id-aqui
GOOGLE_CLIENT_SECRET=seu-google-client-secret-aqui
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3️⃣ Reinicie o servidor

```bash
npm run dev
```

### 4️⃣ Teste o fluxo

1. Acesse: http://localhost:3000
2. Será redirecionado para /login
3. Clique em "Continuar com Google"
4. Autorize o acesso
5. Será redirecionado para o dashboard
6. Clique no avatar → Modal de perfil abre

---

## 📦 Estrutura Criada

```
src/
├── auth.ts                          # Configuração NextAuth
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts                 # API handlers
│   ├── login/
│   │   └── page.tsx                 # Página de login
│   ├── page.tsx                     # Dashboard (protegido)
│   └── layout.tsx                   # SessionProvider
└── ui/components/
    └── ProfileModal.tsx             # Modal de perfil
```

---

## 🔒 Segurança Implementada

✅ **OAuth 2.0** - Padrão da indústria
✅ **JWT assinado** - Token seguro
✅ **Email verificado** - Garantido pelo Google
✅ **Sem senhas** - Zero risco de vazamento
✅ **Sessão expirável** - 30 dias (configurável)
✅ **Redirect automático** - Protege rotas privadas

---

## 🎨 UX Implementada

✅ **Avatar clicável** - Header → Modal
✅ **Modal glassmorphism** - Efeito liquid-glass
✅ **Click fora fecha** - Backdrop dismissible
✅ **Loading state** - Durante autenticação
✅ **Redirect automático** - Para /login ou /

---

## 🚀 Escalável para:

- ✅ Planos (Free/Pro)
- ✅ Múltiplos logins (GitHub, Microsoft)
- ✅ B2B (SSO corporativo)
- ✅ Exportar dados
- ✅ Gerenciar assinatura
- ✅ 2FA (futuro)

---

## ⚠️ IMPORTANTE

**NÃO commite o `.env.local`!**

Já está no `.gitignore`, mas garanta que:
```gitignore
.env*.local
.env
```

Está no seu `.gitignore`.

---

## 🎯 Pronto para produção?

Quando for para produção:

1. Configure domínio real no Google Console
2. Atualize `NEXTAUTH_URL` no Vercel/hosting
3. Adicione redirect URI de produção
4. Gere novo `NEXTAUTH_SECRET` (nunca reuse o de dev)
