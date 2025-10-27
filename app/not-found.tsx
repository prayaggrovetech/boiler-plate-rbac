"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileQuestion className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Page Not Found</CardTitle>
          <CardDescription className="text-base">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-gray-300 mb-2">404</h2>
            <p className="text-gray-600">
              Don't worry, it happens to the best of us. Let's get you back on track.
            </p>
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
              Need help? Check out our{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                support page
              </Link>{' '}
              or{' '}
              <Link href="/about" className="text-blue-600 hover:underline">
                learn more about us
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}