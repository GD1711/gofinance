# 🚀 Guia Completo: Enviar Projeto para GitHub

Este guia te ajuda a enviar seu projeto **gofinance** para o GitHub de forma automatizada.

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Git** - [Download aqui](https://git-scm.com/downloads)
2. **GitHub CLI (gh)** - [Download aqui](https://cli.github.com/)

### Instalar GitHub CLI no Windows

Escolha um dos métodos abaixo:

**Via winget (recomendado):**
```powershell
winget install --id GitHub.cli
```

**Via Chocolatey:**
```powershell
choco install gh
```

**Via Instalador:**
Baixe em [cli.github.com](https://cli.github.com/)

---

## 🎯 Método 1: Script Automatizado (Recomendado)

### No Windows (PowerShell):

1. Abra o PowerShell na pasta do projeto:
   ```powershell
   cd c:\Users\gusta\goapp
   ```

2. Execute o script:
   ```powershell
   .\setup-github.ps1
   ```

3. Siga as instruções na tela

### No Git Bash / Linux / macOS:

1. Navegue até a pasta do projeto:
   ```bash
   cd /caminho/para/goapp
   ```

2. Dê permissão de execução:
   ```bash
   chmod +x setup-github.sh
   ```

3. Execute o script:
   ```bash
   ./setup-github.sh
   ```

---

## 🔧 Método 2: Passo a Passo Manual

Se preferir fazer manualmente, siga estes passos:

### 1️⃣ Configurar Git (primeira vez)

```bash
git config --global user.email "gustavobap0612@gmail.com"
git config --global user.name "Seu Nome Aqui"
```

### 2️⃣ Inicializar repositório Git

```bash
cd c:\Users\gusta\goapp
git init
```

### 3️⃣ Adicionar arquivos

```bash
git add .
```

### 4️⃣ Fazer primeiro commit

```bash
git commit -m "Primeiro commit do projeto gofinance"
```

### 5️⃣ Autenticar no GitHub

```bash
gh auth login
```

Escolha:
- **What account do you want to log into?** → GitHub.com
- **What is your preferred protocol?** → HTTPS
- **Authenticate Git with your GitHub credentials?** → Yes
- **How would you like to authenticate?** → Login with a web browser

### 6️⃣ Criar repositório e enviar código

```bash
gh repo create gofinance --public --source=. --remote=origin --push
```

---

## 🔑 Método 3: Usando Token Pessoal

### Criar Token no GitHub:

1. Acesse: https://github.com/settings/tokens
2. Clique em **Generate new token** → **Generate new token (classic)**
3. Configure:
   - **Note:** "GoFinance Token"
   - **Expiration:** 90 days (ou o que preferir)
   - **Scopes:** Marque:
     - ✅ `repo` (todos)
     - ✅ `workflow`
     - ✅ `admin:org` > `read:org`
4. Clique em **Generate token**
5. **COPIE O TOKEN** (você só verá uma vez!)

### Usar o Token:

```bash
# Fazer login com token
echo SEU_TOKEN_AQUI | gh auth login --with-token

# Criar e enviar repositório
gh repo create gofinance --public --source=. --remote=origin --push
```

---

## 📁 O que será enviado para o GitHub?

Todos os arquivos e pastas do projeto, incluindo:

- ✅ Código-fonte (src/)
- ✅ Configurações (tsconfig.json, package.json, etc)
- ✅ Documentação (todos os .md)
- ✅ Assets públicos (public/)
- ❌ node_modules/ (ignorado pelo .gitignore)
- ❌ .next/ (ignorado pelo .gitignore)

---

## 🔄 Próximos Passos: Atualizar o Código

Depois que o repositório estiver no GitHub, para enviar novas mudanças:

```bash
# 1. Adicionar arquivos modificados
git add .

# 2. Fazer commit com mensagem descritiva
git commit -m "Descrição da mudança"

# 3. Enviar para o GitHub
git push
```

---

## 🖥️ Clonar em Outra Máquina

Para trabalhar no projeto em outro computador:

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/gofinance.git

# Entrar na pasta
cd gofinance

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

---

## 📊 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Ver repositórios remotos
git remote -v

# Ver diferenças antes de commitar
git diff

# Desfazer último commit (mantém arquivos modificados)
git reset --soft HEAD~1

# Ver branches
git branch -a

# Criar nova branch
git checkout -b nome-da-branch
```

---

## ❓ Problemas Comuns

### "fatal: not a git repository"
**Solução:** Execute `git init` na pasta do projeto

### "Repository not found" ou "403 Forbidden"
**Solução:** Verifique autenticação com `gh auth status` e faça login novamente

### "Repositório já existe"
**Solução:** 
```bash
# Conectar ao repositório existente
git remote add origin https://github.com/SEU_USUARIO/gofinance.git
git push -u origin main
```

### Script PowerShell não executa
**Solução:** Execute no PowerShell como Administrador:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 🎓 Referências

- [Documentação do Git](https://git-scm.com/doc)
- [GitHub CLI Docs](https://cli.github.com/manual/)
- [GitHub Guides](https://guides.github.com/)

---

## 📧 Informações do Projeto

- **Nome do Repositório:** gofinance
- **Email GitHub:** gustavobap0612@gmail.com
- **Visibilidade:** Público
- **Branch Principal:** main

---

**Criado por:** GitHub Copilot  
**Data:** 30/01/2026  
**Versão:** 1.0
