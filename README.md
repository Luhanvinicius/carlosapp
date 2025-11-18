# App Unificado - Next.js

Sistema completo com frontend e backend unificados em Next.js.

## 🚀 Deploy no Vercel

### Configuração Inicial

1. **Importe este repositório no Vercel:**
   - Conecte seu repositório GitHub ao Vercel
   - O Vercel detectará automaticamente que é um projeto Next.js

2. **Configure as variáveis de ambiente:**
   - Vá em **Settings → Environment Variables**
   - Adicione:
     - `DATABASE_URL`: URL de conexão do PostgreSQL
     - `JWT_SECRET`: Chave secreta para assinar tokens JWT (obrigatório!)

3. **Deploy automático:**
   - A cada `git push`, o Vercel faz deploy automaticamente
   - Ou faça deploy manual via Dashboard

### ⚠️ Importante

- **JWT_SECRET é obrigatório** - Gere uma chave forte:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- Após adicionar variáveis, faça um **Redeploy**
- Veja o guia completo em `DEPLOY_VERCEL.md`

## 📦 Instalação Local

### Pré-requisitos

- **Node.js** 18+ instalado
- **PostgreSQL** instalado e rodando (ou acesso a um banco remoto como Neon, Supabase, etc.)
- **npm** ou **yarn**

### Passos para rodar localmente

1. **Clone o repositório** (se ainda não tiver):
   ```bash
   git clone <url-do-repositorio>
   cd carlaobtonline
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/carlaobtonline
   ```
   
   **Exemplos de DATABASE_URL:**
   - **PostgreSQL local**: `postgresql://postgres:senha@localhost:5432/carlaobtonline`
   - **Neon/Supabase**: `postgresql://user:pass@host.neon.tech:5432/db?sslmode=require`
   - **Outros serviços**: Consulte a documentação do seu provedor

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   - Abra seu navegador em: `http://localhost:3000`
   - A aplicação redirecionará para `/login` se não estiver autenticado

### ⚠️ Importante

- Certifique-se de que o banco de dados está acessível e possui as tabelas necessárias
- Se for a primeira vez rodando, você precisará criar as tabelas no banco (migrations/schema)
- O arquivo `.env.local` não deve ser commitado (já está no `.gitignore`)

## 🔧 Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Tailwind CSS 4** - Framework de estilos
- **JWT (jsonwebtoken)** - Autenticação com tokens
- **bcryptjs** - Hash de senhas
- **Recharts** - Gráficos e visualizações

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexão PostgreSQL | ✅ Sim |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | ✅ Sim (produção) |
| `JWT_EXPIRES_IN` | Tempo de expiração do access token (padrão: `7d`) | ❌ Não |
| `JWT_REFRESH_EXPIRES_IN` | Tempo de expiração do refresh token (padrão: `30d`) | ❌ Não |
| `NEXT_PUBLIC_API_URL` | URL base da API (padrão: `/api`) | ❌ Não |

### Exemplo de `.env.local`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/carlaobtonline
JWT_SECRET=sua-chave-secreta-super-segura-mude-em-producao
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

**⚠️ IMPORTANTE:** Em produção, gere uma chave secreta forte:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🏗️ Estrutura

- `/src/app` - Páginas e rotas da API
- `/src/components` - Componentes React
- `/src/lib` - Utilitários e serviços
- `/src/context` - Context API
- `/src/types` - Tipos TypeScript
