import { z } from "zod"

// Role validation
export const createRoleSchema = z.object({
  name: z
    .string()
    .min(1, "Role name is required")
    .max(50, "Role name is too long")
    .regex(/^[a-z0-9_-]+$/, "Role name can only contain lowercase letters, numbers, hyphens, and underscores")
    .refine((name) => !['admin', 'customer', 'manager'].includes(name), {
      message: "Cannot create role with reserved name"
    }),
  description: z
    .string()
    .max(255, "Description is too long")
    .optional(),
  permissions: z
    .array(z.string())
    .optional()
})

export const updateRoleSchema = z.object({
  name: z
    .string()
    .min(1, "Role name is required")
    .max(50, "Role name is too long")
    .regex(/^[a-z0-9_-]+$/, "Role name can only contain lowercase letters, numbers, hyphens, and underscores")
    .optional(),
  description: z
    .string()
    .max(255, "Description is too long")
    .optional(),
  permissions: z
    .array(z.string())
    .optional()
})

// Permission validation
export const createPermissionSchema = z.object({
  name: z
    .string()
    .min(1, "Permission name is required")
    .max(100, "Permission name is too long")
    .regex(/^[a-z]+:[a-z_]+$/, "Permission name must be in format 'action:resource'"),
  resource: z
    .string()
    .min(1, "Resource is required")
    .max(50, "Resource name is too long")
    .regex(/^[a-z_]+$/, "Resource can only contain lowercase letters and underscores"),
  action: z
    .string()
    .min(1, "Action is required")
    .max(50, "Action name is too long")
    .regex(/^[a-z_]+$/, "Action can only contain lowercase letters and underscores"),
  description: z
    .string()
    .max(255, "Description is too long")
    .optional()
})

// User validation
export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
  roles: z
    .array(z.string())
    .optional()
})

export const updateUserSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long")
    .optional(),
  name: z
    .string()
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long")
    .optional()
})

// Role assignment validation
export const assignRolesSchema = z.object({
  roleIds: z
    .array(z.string().uuid("Invalid role ID"))
    .min(0, "At least one role must be selected")
})

// Query validation
export const userQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .transform(Number)
    .refine((n) => n > 0, "Page must be greater than 0")
    .optional()
    .default("1"),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .transform(Number)
    .refine((n) => n > 0 && n <= 100, "Limit must be between 1 and 100")
    .optional()
    .default("10"),
  search: z
    .string()
    .max(100, "Search term is too long")
    .optional(),
  role: z
    .string()
    .max(50, "Role filter is too long")
    .optional()
})

// Types
export type CreateRoleInput = z.infer<typeof createRoleSchema>
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>
export type CreatePermissionInput = z.infer<typeof createPermissionSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type AssignRolesInput = z.infer<typeof assignRolesSchema>
export type UserQueryInput = z.infer<typeof userQuerySchema>