import type { Metadata } from "next"
import { PublicLayout } from "@/components/layouts/public-layout"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team for questions about our SaaS boilerplate, technical support, or partnership opportunities.",
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/ui/form-field"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  HelpCircle,
  Users,
  Zap
} from "lucide-react"

export default function ContactPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              We're Here to
              <span className="text-blue-600"> Help</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our SaaS boilerplate? Need help getting started? 
              Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <ContactOption
              icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
              title="General Inquiries"
              description="Questions about features, pricing, or getting started"
              contact="hello@microsaas.com"
              action="Send Email"
            />
            <ContactOption
              icon={<Users className="h-8 w-8 text-green-600" />}
              title="Sales & Partnerships"
              description="Enterprise solutions and partnership opportunities"
              contact="sales@microsaas.com"
              action="Contact Sales"
            />
            <ContactOption
              icon={<HelpCircle className="h-8 w-8 text-purple-600" />}
              title="Technical Support"
              description="Implementation help and technical questions"
              contact="support@microsaas.com"
              action="Get Support"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="First Name" required>
                        <Input placeholder="John" />
                      </FormField>
                      <FormField label="Last Name" required>
                        <Input placeholder="Doe" />
                      </FormField>
                    </div>
                    
                    <FormField label="Email Address" required>
                      <Input type="email" placeholder="john@example.com" />
                    </FormField>
                    
                    <FormField label="Company" description="Optional">
                      <Input placeholder="Your Company" />
                    </FormField>
                    
                    <FormField label="Subject" required>
                      <Input placeholder="How can we help you?" />
                    </FormField>
                    
                    <FormField label="Message" required>
                      <Textarea 
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px]"
                      />
                    </FormField>
                    
                    <Button className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <ContactInfo
                  icon={<Mail className="h-6 w-6 text-blue-600" />}
                  title="Email Us"
                  details={["hello@microsaas.com", "support@microsaas.com"]}
                  description="We typically respond within 24 hours"
                />
                
                <ContactInfo
                  icon={<Phone className="h-6 w-6 text-green-600" />}
                  title="Call Us"
                  details={["+1 (555) 123-4567"]}
                  description="Monday to Friday, 9 AM to 6 PM EST"
                />
                
                <ContactInfo
                  icon={<MapPin className="h-6 w-6 text-purple-600" />}
                  title="Visit Us"
                  details={["123 Tech Street", "San Francisco, CA 94105"]}
                  description="By appointment only"
                />
                
                <ContactInfo
                  icon={<Clock className="h-6 w-6 text-orange-600" />}
                  title="Business Hours"
                  details={["Monday - Friday: 9 AM - 6 PM EST", "Saturday - Sunday: Closed"]}
                  description="Emergency support available 24/7"
                />
              </div>

              {/* FAQ Link */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <HelpCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Frequently Asked Questions
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Check our FAQ section for quick answers to common questions.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Response Times
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing timely support for all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ResponseTime
              icon={<Zap className="h-8 w-8 text-yellow-600" />}
              title="General Inquiries"
              time="< 24 hours"
              description="Most questions answered within a few hours"
            />
            <ResponseTime
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="Sales Questions"
              time="< 4 hours"
              description="Sales team responds during business hours"
            />
            <ResponseTime
              icon={<HelpCircle className="h-8 w-8 text-green-600" />}
              title="Technical Support"
              time="< 12 hours"
              description="Priority support for technical issues"
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

interface ContactOptionProps {
  icon: React.ReactNode
  title: string
  description: string
  contact: string
  action: string
}

function ContactOption({ icon, title, description, contact, action }: ContactOptionProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium text-gray-900 mb-4">{contact}</p>
        <Button variant="outline" size="sm">
          {action}
        </Button>
      </CardContent>
    </Card>
  )
}

interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  details: string[]
  description: string
}

function ContactInfo({ icon, title, details, description }: ContactInfoProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-900">{detail}</p>
        ))}
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
  )
}

interface ResponseTimeProps {
  icon: React.ReactNode
  title: string
  time: string
  description: string
}

function ResponseTime({ icon, title, time, description }: ResponseTimeProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className="mx-auto mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-2xl font-bold text-blue-600 mb-2">{time}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}