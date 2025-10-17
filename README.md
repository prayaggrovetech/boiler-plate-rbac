# Micro SaaS Boilerplate

A production-ready micro SaaS boilerplate built with Next.js 14+, TypeScript, TailwindCSS, and NextAuth.js v5+.

## Features

- 🔐 **Dynamic RBAC System** - Role-based access control with database-stored permissions
- 🚀 **Next.js 14+ App Router** - Modern React framework with TypeScript
- 🎨 **TailwindCSS** - Utility-first CSS framework with custom design system
- 🔑 **NextAuth.js v5+** - Authentication with multiple providers (Credentials, Google)
- 🗄️ **PostgreSQL + Prisma** - Type-safe database operations
- 🐳 **Docker Support** - Containerized deployment ready
- 🧪 **Testing Setup** - Jest for unit tests, Playwright for E2E

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm/npm/yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Set up your PostgreSQL database and update the `DATABASE_URL` in `.env.local`
5. Run the database setup script: `./scripts/setup-db.sh`
   - Or manually run:
     - `npx prisma generate`
     - `npx prisma db push`
     - `npm run db:seed`
6. Start development server: `npm run dev`

### Default Users

After seeding, you can login with:
- **Admin**: admin@example.com / admin123
- **Customer**: customer@example.com / customer123

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages  
│   ├── (public)/          # Public marketing pages
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/               # Database schema and migrations
└── tests/                # Test files
```

## Development

This project is built following a spec-driven development approach. See the `.kiro/specs/` directory for detailed requirements, design, and implementation tasks.

## License

MIT