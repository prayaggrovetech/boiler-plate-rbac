# Micro SaaS Boilerplate

A production-ready SaaS boilerplate built with Next.js 14, TypeScript, and dynamic Role-Based Access Control (RBAC). This boilerplate provides a complete foundation for building scalable SaaS applications with enterprise-grade security and user management.

## 🚀 Features

### Core Features
- **Next.js 14** with App Router and TypeScript
- **Dynamic RBAC System** with database-stored roles and permissions
- **Multi-Provider Authentication** (Credentials + Google OAuth)
- **Role-Specific Dashboards** (Admin, Manager, Customer)
- **Complete Admin Interface** for user and role management
- **Security-First Design** with input validation, rate limiting, and XSS protection

### Authentication & Authorization
- NextAuth.js v5 integration
- JWT-based sessions with role attachment
- Route-level permission checking
- Middleware-based access control
- Password hashing with bcrypt

### User Interface
- **TailwindCSS** for styling
- **Radix UI** components
- Responsive design with mobile support
- Dark/light mode ready
- Accessible components (WCAG compliant)
- Toast notifications and error handling

### Database & Backend
- **Prisma ORM** with PostgreSQL
- Database migrations and seeding
- Type-safe database queries
- RESTful API endpoints
- Input validation with Zod schemas

### Security Features
- Rate limiting for API endpoints
- Input sanitization and XSS protection
- SQL injection prevention
- Secure HTTP headers
- CORS configuration
- File upload validation

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-saas-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/micro_saas_db"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Default Users

After seeding, you can log in with these default accounts:

- **Admin**: `admin@example.com` / `admin123`
- **Customer**: `customer@example.com` / `customer123`

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (public)/          # Public pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── auth/              # Authentication components
│   ├── layouts/           # Layout components
│   ├── rbac/              # RBAC-aware components
│   └── ui/                # Base UI components
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication configuration
│   ├── db/                # Database utilities
│   ├── middleware/        # Route protection middleware
│   ├── rbac/              # RBAC system utilities
│   ├── security/          # Security utilities
│   └── validations/       # Input validation schemas
├── prisma/                # Database schema and migrations
├── tests/                 # Test files
└── types/                 # TypeScript type definitions
```

## 🎯 Usage

### Role-Based Access Control

The RBAC system allows you to:

1. **Create custom roles** with specific permissions
2. **Assign roles to users** through the admin interface
3. **Control access** to routes and features based on permissions
4. **Dynamic permission checking** on both client and server

### Adding New Permissions

1. Add the permission to the database via the admin interface or seed script
2. Use the permission in your components:
   ```tsx
   import { useHasPermission } from '@/components/rbac'
   
   function MyComponent() {
     const { hasPermission } = useHasPermission('manage:posts')
     
     if (!hasPermission) return null
     
     return <AdminFeature />
   }
   ```

### Creating Protected Routes

1. Add route permissions to `lib/rbac/routes.ts`
2. The middleware will automatically protect the route
3. Use RBAC components for conditional rendering

### API Development

Create new API endpoints with built-in security:

```typescript
import { auth } from '@/lib/auth/config'
import { PermissionChecker } from '@/lib/rbac/permissions'

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.roles) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!PermissionChecker.hasPermission(session.user.roles, 'view:data')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  // Your API logic here
}
```

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e
```

## 🚀 Deployment

### Environment Setup

1. Set production environment variables
2. Configure your database
3. Set up OAuth providers (if using)

### Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t micro-saas-app .

# Run container
docker run -p 3000:3000 micro-saas-app
```

## 🔧 Configuration

### Database Configuration

The application uses Prisma with PostgreSQL. Key configuration files:

- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Initial data seeding
- `lib/db/index.ts` - Database connection

### Authentication Configuration

NextAuth.js configuration in `lib/auth/config.ts`:

- JWT strategy with role attachment
- Multiple provider support
- Session management
- Role-based callbacks

### Security Configuration

Security features in `lib/security/`:

- Rate limiting configuration
- Input validation rules
- Security headers
- CORS settings

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current session

### User Management

- `GET /api/users` - List users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/[id]/roles` - Assign roles (admin only)

### Role Management

- `GET /api/roles` - List roles (admin only)
- `POST /api/roles` - Create role (admin only)
- `PUT /api/roles/[id]` - Update role (admin only)
- `DELETE /api/roles/[id]` - Delete role (admin only)

### Permissions

- `GET /api/permissions` - List permissions (admin only)
- `POST /api/permissions` - Create permission (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Check the [documentation](docs/)
- Open an [issue](issues/) for bugs
- Join our [community](community/) for discussions

## 🎉 Acknowledgments

Built with these amazing technologies:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**Ready to build your next SaaS application? Start with this boilerplate and focus on your unique business logic!** 🚀