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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb04_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb04_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-medium">Production Ready • Trusted by 10k+ developers</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
            Build Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              SaaS Empire
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-600 font-light">in record time</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most advanced micro SaaS boilerplate with <span className="text-blue-600 font-semibold">Next.js 14+</span>,
            <span className="text-purple-600 font-semibold"> dynamic RBAC</span>, and
            <span className="text-pink-600 font-semibold"> enterprise-grade security</span>.
            Ship faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Zap className="mr-2 h-5 w-5" />
                Start Building Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300">
                <Globe className="mr-2 h-5 w-5" />
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10k+</div>
              <div className="text-gray-500 text-sm">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-500 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-500 text-sm">Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-500 text-sm">Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Code className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Enterprise Grade Technology</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need
              <span className="block text-3xl md:text-4xl text-gray-600 font-light mt-2">to dominate your market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built with cutting-edge technologies and battle-tested patterns.
              From authentication to deployment, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <ModernFeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Dynamic RBAC"
              description="Database-driven role-based access control. Create new roles and permissions without touching code."
              gradient="from-blue-500 to-cyan-500"
              delay="0"
            />
            <ModernFeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Next.js 14+"
              description="Latest App Router, Server Components, and React 18 features for maximum performance."
              gradient="from-purple-500 to-pink-500"
              delay="100"
            />
            <ModernFeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Multi-Auth"
              description="NextAuth.js v5 with OAuth providers, magic links, and enterprise SSO support."
              gradient="from-green-500 to-emerald-500"
              delay="200"
            />
            <ModernFeatureCard
              icon={<Code className="h-8 w-8" />}
              title="Type Safe"
              description="End-to-end TypeScript with Prisma ORM for bulletproof database operations."
              gradient="from-orange-500 to-red-500"
              delay="300"
            />
            <ModernFeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Production Ready"
              description="Docker, CI/CD, monitoring, and deployment configs for instant scaling."
              gradient="from-indigo-500 to-purple-500"
              delay="400"
            />
            <ModernFeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Enterprise Security"
              description="OWASP compliance, audit logging, rate limiting, and advanced threat protection."
              gradient="from-teal-500 to-blue-500"
              delay="500"
            />
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Powered by Industry Leaders</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-gray-700">Next.js</div>
              <div className="text-lg font-semibold text-gray-700">TypeScript</div>
              <div className="text-lg font-semibold text-gray-700">Prisma</div>
              <div className="text-lg font-semibold text-gray-700">Tailwind CSS</div>
              <div className="text-lg font-semibold text-gray-700">NextAuth.js</div>
              <div className="text-lg font-semibold text-gray-700">Docker</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Launch Special • 50% Off First Year</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              No hidden fees, no surprises. Choose the plan that scales with your ambitions.
              All plans include our core features and 24/7 support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ModernPricingCard
              name="Starter"
              price="$9"
              originalPrice="$18"
              period="per month"
              description="Perfect for indie hackers and small projects"
              features={[
                "Up to 3 team members",
                "Core dashboard features",
                "Email support",
                "Basic analytics",
                "Mobile responsive",
                "SSL certificate"
              ]}
              buttonText="Start Free Trial"
              buttonVariant="outline"
              gradient="from-blue-500/20 to-cyan-500/20"
            />
            <ModernPricingCard
              name="Professional"
              price="$29"
              originalPrice="$58"
              period="per month"
              description="Best for growing teams and scaling businesses"
              features={[
                "Up to 25 team members",
                "Advanced analytics & reports",
                "Priority support",
                "Custom integrations",
                "Advanced RBAC",
                "API access",
                "White-label options",
                "Advanced security"
              ]}
              buttonText="Get Started"
              buttonVariant="default"
              popular
              gradient="from-purple-500/20 to-pink-500/20"
            />
            <ModernPricingCard
              name="Enterprise"
              price="$99"
              originalPrice="$198"
              period="per month"
              description="For large organizations with advanced needs"
              features={[
                "Unlimited team members",
                "Custom feature development",
                "24/7 phone support",
                "On-premise deployment",
                "Enterprise security",
                "Custom SLA",
                "Dedicated success manager",
                "Advanced compliance"
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
              gradient="from-green-500/20 to-emerald-500/20"
            />
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Build the
              <span className="block text-yellow-300">Next Big Thing?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Join <span className="font-bold text-yellow-300">10,000+</span> developers who chose our boilerplate
              to launch their SaaS dreams. Your empire starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Empire Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Talk to Our Experts
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-white/60 text-sm">Developer Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">10k+</div>
                <div className="text-white/60 text-sm">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">$2M+</div>
                <div className="text-white/60 text-sm">Revenue Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">150+</div>
                <div className="text-white/60 text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

interface ModernFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay: string
}

function ModernFeatureCard({ icon, title, description, gradient, delay }: ModernFeatureCardProps) {
  return (
    <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up`} style={{ animationDelay: `${delay}ms` }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <CardHeader className="relative z-10 text-center pb-4">
        <div className={`mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 text-center">
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

interface ModernPricingCardProps {
  name: string
  price: string
  originalPrice: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular?: boolean
  gradient: string
}

function ModernPricingCard({
  name,
  price,
  originalPrice,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
  gradient
}: ModernPricingCardProps) {
  return (
    <Card className={`relative overflow-hidden border-0 bg-white/5 backdrop-blur-sm ${popular ? 'ring-2 ring-purple-400 shadow-2xl shadow-purple-500/25 scale-105' : 'hover:bg-white/10'} transition-all duration-300 hover:scale-105`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`}></div>

      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center relative z-10 pb-6">
        <CardTitle className="text-2xl font-bold text-white mb-2">{name}</CardTitle>
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-5xl font-bold text-white">{price}</span>
            <div className="text-left">
              <div className="text-white/60 line-through text-lg">{originalPrice}</div>
              <div className="text-white/80 text-sm">/{period}</div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <span className="text-green-300 text-sm font-medium">50% OFF</span>
          </div>
        </div>
        <CardDescription className="text-white/70 text-base">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-white/90 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Link href="/signup">
          <Button
            className={`w-full py-3 font-semibold transition-all duration-300 ${buttonVariant === 'default'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25'
              : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
              }`}
            variant={buttonVariant}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}