import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { Role } from "@/lib/rbac/types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roles: Role[]
      permissions: string[]
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    roles?: Role[]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    roles: Role[]
  }
}