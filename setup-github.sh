#!/bin/bash
# Script de Configuração Automática do GitHub para gofinance
# Autor: GitHub Copilot
# Data: 30/01/2026

echo "🚀 Iniciando configuração do Git e GitHub..."
echo ""

# Variáveis configuráveis
REPO_NAME="gofinance"
COMMIT_MESSAGE="Primeiro commit do projeto gofinance - App de gestão financeira"
GITHUB_EMAIL="gustavobap0612@gmail.com"

# Verificar se já é um repositório Git
if [ -d ".git" ]; then
    echo "✅ Repositório Git já existe"
else
    echo "📁 Inicializando repositório Git..."
    git init
    echo "✅ Git inicializado"
fi

echo ""

# Configurar email e nome (se não estiver configurado)
echo "⚙️ Configurando Git..."
CURRENT_EMAIL=$(git config user.email)
if [ -z "$CURRENT_EMAIL" ]; then
    git config user.email "$GITHUB_EMAIL"
    echo "✅ Email configurado: $GITHUB_EMAIL"
else
    echo "✅ Email já configurado: $CURRENT_EMAIL"
fi

CURRENT_NAME=$(git config user.name)
if [ -z "$CURRENT_NAME" ]; then
    read -p "Digite seu nome para o Git (ex: Gustavo Silva): " USER_NAME
    git config user.name "$USER_NAME"
    echo "✅ Nome configurado: $USER_NAME"
else
    echo "✅ Nome já configurado: $CURRENT_NAME"
fi

echo ""

# Verificar se GitHub CLI está instalado
echo "🔍 Verificando GitHub CLI (gh)..."
if ! command -v gh &> /dev/null; then
    echo "⚠️ GitHub CLI não está instalado!"
    echo ""
    echo "📦 Instalação rápida:"
    echo "   Windows: winget install --id GitHub.cli"
    echo "   macOS: brew install gh"
    echo "   Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo ""
    echo "Após instalar, execute este script novamente."
    exit 1
else
    echo "✅ GitHub CLI instalado"
fi

echo ""

# Verificar autenticação no GitHub
echo "🔐 Verificando autenticação..."
if ! gh auth status &> /dev/null; then
    echo "⚠️ Não autenticado no GitHub"
    echo ""
    echo "Escolha o método de autenticação:"
    echo "1) Login via navegador (recomendado)"
    echo "2) Login com token pessoal"
    read -p "Digite 1 ou 2: " CHOICE
    
    if [ "$CHOICE" == "1" ]; then
        gh auth login
    else
        echo ""
        echo "📝 Para criar um token:"
        echo "   1. Acesse: https://github.com/settings/tokens"
        echo "   2. Clique em 'Generate new token' > 'Generate new token (classic)'"
        echo "   3. Marque: repo, workflow, admin:org"
        echo "   4. Copie o token gerado"
        echo ""
        read -sp "Cole seu token aqui: " TOKEN
        echo ""
        echo "$TOKEN" | gh auth login --with-token
    fi
else
    echo "✅ Já autenticado no GitHub"
fi

echo ""

# Adicionar arquivos
echo "📦 Adicionando arquivos ao staging..."
git add .
echo "✅ Arquivos adicionados"

echo ""

# Verificar se há algo para commitar
if [ -z "$(git status --porcelain)" ]; then
    echo "ℹ️ Nenhuma alteração para commitar"
else
    echo "💾 Criando commit..."
    git commit -m "$COMMIT_MESSAGE"
    echo "✅ Commit criado"
fi

echo ""

# Verificar se o repositório remoto já existe
if git remote get-url origin &> /dev/null; then
    REMOTE_URL=$(git remote get-url origin)
    echo "ℹ️ Repositório remoto já configurado: $REMOTE_URL"
    echo "📤 Enviando para o GitHub..."
    git push -u origin main
else
    # Criar repositório no GitHub e fazer push
    echo "🎯 Criando repositório '$REPO_NAME' no GitHub..."
    echo "   Repositório: público"
    echo "   Branch: main"
    echo ""
    
    if gh repo create $REPO_NAME --public --source=. --remote=origin --push; then
        echo ""
        echo "✅ SUCESSO! Repositório criado e código enviado!"
        echo ""
        echo "🔗 Seu repositório está em:"
        GITHUB_USER=$(gh api user --jq .login)
        echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
    else
        echo ""
        echo "❌ Erro ao criar repositório"
        echo "Possíveis causas:"
        echo "   - Repositório com este nome já existe"
        echo "   - Sem permissões adequadas"
        echo "   - Problemas de rede"
    fi
fi

echo ""
echo "🎉 Processo concluído!"
echo ""
