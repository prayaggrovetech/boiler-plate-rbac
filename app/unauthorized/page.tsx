"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Access Denied</CardTitle>
          <CardDescription className="text-base">
            You don't have permission to access this page or resource.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-gray-300 mb-2">401</h2>
            <p className="text-gray-600">
              This area is restricted. Please contact your administrator if you believe this is an error.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-800 mb-2">What you can do:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Check if you're signed in to the correct account</li>
              <li>• Contact your administrator for access</li>
              <li>• Return to a page you have access to</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.back()}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button 
              asChild
              className="flex-1"
              size="lg"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}