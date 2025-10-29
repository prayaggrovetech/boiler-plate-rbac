import NextAuth, { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { getUserWithRoles, createUser, assignRoleToUser } from "@/lib/db/users"
import { transformDatabaseUser } from "@/lib/rbac/utils"

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate input
          const validatedFields = loginSchema.safeParse(credentials)
          if (!validatedFields.success) {
            return null
          }

          const { email, password } = validatedFields.data

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email },
            include: {
              userRoles: {
                include: {
                  role: {
                    include: {
                      rolePermissions: {
                        include: {
                          permission: true
                        }
                      }
                    }
                  }
                }
              }
            }
          })

          if (!user || !user.password) {
            return null
          }

          // Verify password
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (!passwordsMatch) {
            return null
          }

          // Transform user data to include roles
          const userWithRoles = transformDatabaseUser(user)

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            roles: userWithRoles.roles,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers, ensure user has a role assigned
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { userRoles: true }
          })

          // If user exists but has no roles, assign customer role
          if (existingUser && existingUser.userRoles.length === 0) {
            const customerRole = await prisma.role.findUnique({
              where: { name: "customer" }
            })
            
            if (customerRole) {
              await assignRoleToUser(existingUser.id, customerRole.id)
            }
          }
        }
        return true
      } catch (error) {
        console.error("SignIn callback error:", error)
        return false
      }
    },
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id as string
        token.name = user.name || null
        token.email = user.email || null
        token.image = user.image || null
        
        // For credentials provider, roles are already attached
        if (account?.provider === "credentials" && "roles" in user) {
          token.roles = user.roles as any[]
        } else {
          // For OAuth providers, fetch roles from database
          const userWithRoles = await getUserWithRoles(user.id!)
          if (userWithRoles) {
            const transformedUser = transformDatabaseUser(userWithRoles)
            token.roles = transformedUser.roles as any[]
          }
        }
      }

      // Handle session update trigger
      if (trigger === "update") {
        // Fetch fresh user data from database
        if (token.id) {
          const freshUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            }
          })

          if (freshUser) {
            token.name = freshUser.name
            token.email = freshUser.email
            token.image = freshUser.image
          }
        }
      }

      // Refresh roles on each request (optional - can be optimized with caching)
      if (token.id && !token.roles) {
        const userWithRoles = await getUserWithRoles(token.id as string)
        if (userWithRoles) {
          const transformedUser = transformDatabaseUser(userWithRoles)
          token.roles = transformedUser.roles
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.name = (token.name as string) || ""
        session.user.email = (token.email as string) || ""
        session.user.image = (token.image as string) || null
        session.user.roles = (token.roles as any[]) || []
        
        // Add permissions to session for easy access
        const permissions = new Set<string>()
        session.user.roles.forEach((role: any) => {
          role.permissions?.forEach((permission: any) => {
            permissions.add(permission.name)
          })
        })
        session.user.permissions = Array.from(permissions)
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  events: {
    async createUser({ user }) {
      try {
        // Assign default customer role to new users
        const customerRole = await prisma.role.findUnique({
          where: { name: "customer" }
        })
        
        if (customerRole && user.id) {
          await assignRoleToUser(user.id, customerRole.id)
        }
      } catch (error) {
        console.error("Error assigning default role:", error)
      }
    },
    async signIn({ user, account, isNewUser }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`)
    },
    async signOut() {
      console.log(`User signed out`)
    }
  },
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)