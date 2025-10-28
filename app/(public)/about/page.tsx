import type { Metadata } from "next"
import { PublicLayout } from "@/components/layouts/public-layout"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our modern SaaS boilerplate built with Next.js, TypeScript, and dynamic RBAC system.",
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Zap, 
  Users, 
  Code, 
  Globe, 
  Database,
  Lock,
  Smartphone,
  BarChart3,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              About Our Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Built for Modern
              <span className="text-blue-600 dark:text-blue-400"> SaaS Development</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our micro SaaS boilerplate combines the latest technologies with proven 
              architectural patterns to help you build scalable, secure applications faster than ever.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technologies and best practices for performance, 
              security, and developer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon={<Code className="h-8 w-8 text-blue-600" />}
              title="Next.js 14+"
              description="Latest App Router with React Server Components, streaming, and optimized performance."
              technologies={["React 18+", "TypeScript", "App Router", "Server Components"]}
            />
            <TechCard
              icon={<Database className="h-8 w-8 text-green-600" />}
              title="Database & ORM"
              description="PostgreSQL with Prisma ORM for type-safe database operations and migrations."
              technologies={["PostgreSQL", "Prisma ORM", "Type Safety", "Migrations"]}
            />
            <TechCard
              icon={<Lock className="h-8 w-8 text-purple-600" />}
              title="Authentication"
              description="NextAuth.js v5+ with multiple providers and session management."
              technologies={["NextAuth.js v5+", "JWT", "OAuth", "Session Management"]}
            />
            <TechCard
              icon={<Shield className="h-8 w-8 text-red-600" />}
              title="Security & RBAC"
              description="Dynamic role-based access control with middleware protection."
              technologies={["Dynamic RBAC", "Middleware", "Permissions", "Audit Logs"]}
            />
            <TechCard
              icon={<Smartphone className="h-8 w-8 text-indigo-600" />}
              title="UI & Design"
              description="TailwindCSS with Radix UI components for accessible, responsive design."
              technologies={["TailwindCSS", "Radix UI", "Responsive", "Accessible"]}
            />
            <TechCard
              icon={<Globe className="h-8 w-8 text-orange-600" />}
              title="Deployment"
              description="Docker support with multi-stage builds and production optimizations."
              technologies={["Docker", "Multi-stage", "Production Ready", "CI/CD"]}
            />
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every feature is designed with scalability, security, and developer 
              experience in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Dynamic Role-Based Access Control
              </h3>
              <div className="space-y-4">
                <FeaturePoint
                  title="Database-Driven Permissions"
                  description="Roles and permissions stored in database, no code changes needed for new access levels."
                />
                <FeaturePoint
                  title="Middleware Protection"
                  description="Route-level protection with automatic redirects and API endpoint security."
                />
                <FeaturePoint
                  title="React Hooks & Components"
                  description="Client-side permission checking with useHasPermission and PermissionGate components."
                />
                <FeaturePoint
                  title="Hierarchical Permissions"
                  description="Support for complex permission structures with inheritance and overrides."
                />
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
                  <span className="font-medium text-foreground">Admin Dashboard</span>
                  <Badge variant="success">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded">
                  <span className="font-medium text-foreground">User Management</span>
                  <Badge variant="warning">Manager+</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded">
                  <span className="font-medium text-foreground">Profile Settings</span>
                  <Badge variant="success">All Users</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded">
                  <span className="font-medium text-foreground">System Settings</span>
                  <Badge variant="destructive">Admin Only</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scalable Architecture
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed with clean architecture principles for maintainability and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ArchitectureLayer
              title="Presentation Layer"
              description="React components with TypeScript and responsive design"
              items={["Next.js Pages", "React Components", "TailwindCSS", "Responsive UI"]}
            />
            <ArchitectureLayer
              title="Business Logic"
              description="RBAC system, authentication, and application logic"
              items={["Permission Checking", "Role Management", "Auth Flows", "Validation"]}
            />
            <ArchitectureLayer
              title="Data Access"
              description="Type-safe database operations with Prisma ORM"
              items={["Prisma Client", "Query Optimization", "Migrations", "Type Safety"]}
            />
            <ArchitectureLayer
              title="Infrastructure"
              description="Security, monitoring, and deployment infrastructure"
              items={["Middleware", "Docker", "Monitoring", "CI/CD"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Building Your SaaS Today
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Get access to the complete boilerplate with documentation, examples, and ongoing updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-900" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

interface TechCardProps {
  icon: React.ReactNode
  title: string
  description: string
  technologies: string[]
}

function TechCard({ icon, title, description, technologies }: TechCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface FeaturePointProps {
  title: string
  description: string
}

function FeaturePoint({ title, description }: FeaturePointProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

interface ArchitectureLayerProps {
  title: string
  description: string
  items: string[]
}

function ArchitectureLayer({ title, description, items }: ArchitectureLayerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}