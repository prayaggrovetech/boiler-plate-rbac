"use client"

import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Shield, 
  Clock, 
  LogIn, 
  LogOut, 
  UserPlus,
  Key
} from "lucide-react"
import Link from "next/link"

/**
 * Demo component showcasing authentication features
 */
export function AuthDemo() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Authentication System Demo</h1>
        <p className="text-muted-foreground">
          Demonstration of NextAuth.js integration with credentials and OAuth providers.
        </p>
      </div>

      {/* Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Status
          </CardTitle>
          <CardDescription>Current session and user information</CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="space-y-4">
              <Alert>
                <User className="h-4 w-4" />
                <AlertDescription>
                  You are currently signed in as <strong>{session.user?.email}</strong>
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.user?.image || undefined} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{session.user?.name || "Unknown User"}</h3>
                  <p className="text-sm text-gray-600">{session.user?.email}</p>
                  {session.user?.roles && (
                    <div className="flex gap-1 mt-2">
                      {session.user.roles.map((role: any) => (
                        <Badge key={role.id} variant="secondary" className="text-xs">
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Session Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>User ID:</span>
                      <span className="font-mono text-xs">{session.user?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Verified:</span>
                      <Badge variant={session.user?.emailVerified ? "success" : "warning"}>
                        {session.user?.emailVerified ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {session.user?.permissions && (
                  <div>
                    <h4 className="font-medium mb-2">Permissions ({session.user.permissions.length})</h4>
                    <div className="max-h-24 overflow-y-auto">
                      <div className="flex flex-wrap gap-1">
                        {session.user.permissions.slice(0, 8).map((permission: string) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {session.user.permissions.length > 8 && (
                          <Badge variant="outline" className="text-xs">
                            +{session.user.permissions.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => signOut()} variant="outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Alert variant="warning">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  You are not currently signed in. Sign in to access protected features.
                </AlertDescription>
              </Alert>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Authentication Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Available Authentication Methods</CardTitle>
          <CardDescription>Different ways to authenticate with the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuthMethod
              icon={<Mail className="h-6 w-6 text-blue-600" />}
              title="Email & Password"
              description="Traditional credential-based authentication"
              features={[
                "Secure password hashing with bcrypt",
                "Email validation and verification",
                "Password strength requirements",
                "Forgot password functionality"
              ]}
              action={
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              }
            />

            <AuthMethod
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
              title="Google OAuth"
              description="Sign in with your Google account"
              features={[
                "One-click authentication",
                "No password required",
                "Automatic account linking",
                "Secure OAuth 2.0 flow"
              ]}
              action={
                <Button 
                  size="sm" 
                  onClick={() => signIn("google")}
                  disabled={!!session}
                >
                  {session ? "Already Signed In" : "Sign In with Google"}
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Security Features
          </CardTitle>
          <CardDescription>Built-in security measures and best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SecurityFeature
              title="Password Security"
              description="Bcrypt hashing with salt rounds for secure password storage"
            />
            <SecurityFeature
              title="Session Management"
              description="JWT tokens with automatic expiration and refresh"
            />
            <SecurityFeature
              title="CSRF Protection"
              description="Built-in CSRF protection for all authentication requests"
            />
            <SecurityFeature
              title="Rate Limiting"
              description="Protection against brute force attacks and abuse"
            />
            <SecurityFeature
              title="Secure Cookies"
              description="HttpOnly, Secure, and SameSite cookie configuration"
            />
            <SecurityFeature
              title="OAuth Security"
              description="Secure OAuth 2.0 implementation with state validation"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {!session && (
        <Card>
          <CardHeader>
            <CardTitle>Try Authentication</CardTitle>
            <CardDescription>Test the authentication system with demo accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <User className="h-4 w-4" />
              <AlertDescription>
                <strong>Demo Accounts:</strong><br />
                Admin: admin@example.com / admin123<br />
                Customer: customer@example.com / customer123
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/login">Try Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/forgot-password">Reset Password</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface AuthMethodProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  action: React.ReactNode
}

function AuthMethod({ icon, title, description, features, action }: AuthMethodProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <ul className="space-y-1 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-center">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
            {feature}
          </li>
        ))}
      </ul>
      
      {action}
    </div>
  )
}

interface SecurityFeatureProps {
  title: string
  description: string
}

function SecurityFeature({ title, description }: SecurityFeatureProps) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}