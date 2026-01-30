# Script de Configuracao Automatica do GitHub para gofinance
# Autor: GitHub Copilot
# Data: 30/01/2026

Write-Host "Iniciando configuracao do Git e GitHub..." -ForegroundColor Cyan
Write-Host ""

# Variaveis configuraveis
$REPO_NAME = "gofinance"
$COMMIT_MESSAGE = "Primeiro commit do projeto gofinance - App de gestao financeira"
$GITHUB_EMAIL = "gustavobap0612@gmail.com"

# Verificar se ja e um repositorio Git
if (Test-Path ".git") {
    Write-Host "Repositorio Git ja existe" -ForegroundColor Green
} else {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "Git inicializado" -ForegroundColor Green
}

Write-Host ""

# Configurar email e nome (se nao estiver configurado)
Write-Host "Configurando Git..." -ForegroundColor Yellow
$currentEmail = git config user.email
if ([string]::IsNullOrEmpty($currentEmail)) {
    git config user.email "$GITHUB_EMAIL"
    Write-Host "Email configurado: $GITHUB_EMAIL" -ForegroundColor Green
} else {
    Write-Host "Email ja configurado: $currentEmail" -ForegroundColor Green
}

$currentName = git config user.name
if ([string]::IsNullOrEmpty($currentName)) {
    $userName = Read-Host "Digite seu nome para o Git (ex: Gustavo Silva)"
    git config user.name "$userName"
    Write-Host "Nome configurado: $userName" -ForegroundColor Green
} else {
    Write-Host "Nome ja configurado: $currentName" -ForegroundColor Green
}

Write-Host ""

# Verificar se GitHub CLI esta instalado
Write-Host "Verificando GitHub CLI (gh)..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if ($null -eq $ghInstalled) {
    Write-Host "GitHub CLI nao esta instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instalacao rapida:" -ForegroundColor Yellow
    Write-Host "   Via winget: winget install --id GitHub.cli" -ForegroundColor White
    Write-Host "   Via Chocolatey: choco install gh" -ForegroundColor White
    Write-Host "   Download: https://cli.github.com/" -ForegroundColor White
    Write-Host ""
    Write-Host "Apos instalar, execute este script novamente." -ForegroundColor Cyan
    exit
} else {
    Write-Host "GitHub CLI instalado" -ForegroundColor Green
}

Write-Host ""

# Verificar autenticacao no GitHub
Write-Host "Verificando autenticacao..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Nao autenticado no GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Escolha o metodo de autenticacao:" -ForegroundColor Yellow
    Write-Host "1) Login via navegador (recomendado)" -ForegroundColor White
    Write-Host "2) Login com token pessoal" -ForegroundColor White
    $choice = Read-Host "Digite 1 ou 2"
    
    if ($choice -eq "1") {
        gh auth login
    } else {
        Write-Host ""
        Write-Host "Para criar um token:" -ForegroundColor Cyan
        Write-Host "   1. Acesse: https://github.com/settings/tokens" -ForegroundColor White
        Write-Host "   2. Clique em 'Generate new token' > 'Generate new token (classic)'" -ForegroundColor White
        Write-Host "   3. Marque: repo, workflow, admin:org" -ForegroundColor White
        Write-Host "   4. Copie o token gerado" -ForegroundColor White
        Write-Host ""
        $token = Read-Host "Cole seu token aqui" -MaskInput
        $token | gh auth login --with-token
    }
} else {
    Write-Host "Ja autenticado no GitHub" -ForegroundColor Green
}

Write-Host ""

# Adicionar arquivos
Write-Host "Adicionando arquivos ao staging..." -ForegroundColor Yellow
git add .
Write-Host "Arquivos adicionados" -ForegroundColor Green

Write-Host ""

# Verificar se ha algo para commitar
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "Nenhuma alteracao para commitar" -ForegroundColor Yellow
} else {
    Write-Host "Criando commit..." -ForegroundColor Yellow
    git commit -m "$COMMIT_MESSAGE"
    Write-Host "Commit criado" -ForegroundColor Green
}

Write-Host ""

# Verificar se o repositorio remoto ja existe
$remoteExists = git remote get-url origin 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Repositorio remoto ja configurado: $remoteExists" -ForegroundColor Yellow
    Write-Host "Enviando para o GitHub..." -ForegroundColor Yellow
    git push -u origin main
} else {
    # Criar repositorio no GitHub e fazer push
    Write-Host "Criando repositorio '$REPO_NAME' no GitHub..." -ForegroundColor Yellow
    Write-Host "   Repositorio: publico" -ForegroundColor Gray
    Write-Host "   Branch: main" -ForegroundColor Gray
    Write-Host ""
    
    gh repo create $REPO_NAME --public --source=. --remote=origin --push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCESSO! Repositorio criado e codigo enviado!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Seu repositorio esta em:" -ForegroundColor Cyan
        Write-Host "   https://github.com/$(gh api user --jq .login)/$REPO_NAME" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "Erro ao criar repositorio" -ForegroundColor Red
        Write-Host "Possiveis causas:" -ForegroundColor Yellow
        Write-Host "   - Repositorio com este nome ja existe" -ForegroundColor Gray
        Write-Host "   - Sem permissoes adequadas" -ForegroundColor Gray
        Write-Host "   - Problemas de rede" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Processo concluido!" -ForegroundColor Cyan
Write-Host ""
