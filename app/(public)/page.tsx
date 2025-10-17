import type { Metadata } from "next"
import { PublicLayout } from "@/components/layouts/public-layout"

export const metadata: Metadata = {
  title: "Home",
  description: "Build your SaaS faster with our production-ready boilerplate featuring Next.js 14+, TypeScript, dynamic RBAC, and modern authentication.",
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Zap, Users, Code, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Production Ready
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your SaaS
            <span className="text-blue-600"> Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Production-ready micro SaaS boilerplate with Next.js 14+, TypeScript, 
            dynamic RBAC system, and everything you need to launch quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices for scalable SaaS applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Dynamic RBAC"
              description="Role-based access control with database-stored permissions. Add new roles without code changes."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-blue-600" />}
              title="Next.js 14+"
              description="Built with the latest Next.js App Router, TypeScript, and modern React patterns."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="Multi-Auth"
              description="NextAuth.js v5+ with credentials and OAuth providers. Secure and flexible authentication."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8 text-blue-600" />}
              title="Type Safe"
              description="Full TypeScript support with Prisma ORM for type-safe database operations."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-blue-600" />}
              title="Production Ready"
              description="Docker support, testing setup, and deployment configurations included."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Secure by Default"
              description="Built-in security best practices, middleware protection, and audit logging."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your needs. All plans include core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="$9"
              period="per month"
              description="Perfect for small projects and personal use"
              features={[
                "Up to 3 users",
                "Basic dashboard",
                "Email support",
                "Core features",
                "Mobile app access"
              ]}
              buttonText="Start Free Trial"
              buttonVariant="outline"
            />
            <PricingCard
              name="Professional"
              price="$29"
              period="per month"
              description="Best for growing teams and businesses"
              features={[
                "Up to 25 users",
                "Advanced analytics",
                "Priority support",
                "Custom integrations",
                "Advanced permissions",
                "API access"
              ]}
              buttonText="Get Started"
              buttonVariant="default"
              popular
            />
            <PricingCard
              name="Enterprise"
              price="$99"
              period="per month"
              description="For large organizations with advanced needs"
              features={[
                "Unlimited users",
                "Custom features",
                "24/7 phone support",
                "On-premise deployment",
                "Advanced security",
                "Custom SLA"
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building amazing SaaS applications with our boilerplate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Start Building Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular?: boolean
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false
}: PricingCardProps) {
  return (
    <Card className={`relative ${popular ? 'border-blue-600 shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-600">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-600">/{period}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full" 
          variant={buttonVariant}
          asChild
        >
          <Link href="/signup">{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}