"use client"

import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false
  })
  const { toast } = useToast()

  const execute = useCallback(async (url: string, options: ApiOptions = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred')
      }

      setState({ data, error: null, loading: false })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState({ data: null, error: errorMessage, loading: false })
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage
      })
      
      throw error
    }
  }, [toast])

  return {
    ...state,
    execute
  }
}

// Specific hooks for common operations
export function useUsers() {
  const api = useApi()

  const fetchUsers = useCallback(async (params?: {
    page?: number
    limit?: number
    search?: string
    role?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.role) searchParams.set('role', params.role)

    return api.execute(`/api/admin/users?${searchParams.toString()}`)
  }, [api])

  const createUser = useCallback(async (userData: {
    name: string
    email: string
    password: string
    roleIds?: string[]
  }) => {
    return api.execute('/api/admin/users', {
      method: 'POST',
      body: userData
    })
  }, [api])

  const updateUser = useCallback(async (id: string, userData: {
    name?: string
    email?: string
    roleIds?: string[]
    isActive?: boolean
  }) => {
    return api.execute(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: userData
    })
  }, [api])

  const deleteUser = useCallback(async (id: string) => {
    return api.execute(`/api/admin/users/${id}`, {
      method: 'DELETE'
    })
  }, [api])

  return {
    ...api,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}

export function useRoles() {
  const api = useApi()

  const fetchRoles = useCallback(async () => {
    return api.execute('/api/admin/roles')
  }, [api])

  const createRole = useCallback(async (roleData: {
    name: string
    description?: string
    permissionIds?: string[]
  }) => {
    return api.execute('/api/admin/roles', {
      method: 'POST',
      body: roleData
    })
  }, [api])

  return {
    ...api,
    fetchRoles,
    createRole
  }
}

export function usePermissions() {
  const api = useApi()

  const fetchPermissions = useCallback(async () => {
    return api.execute('/api/admin/permissions')
  }, [api])

  return {
    ...api,
    fetchPermissions
  }
}

export function useAnalytics() {
  const api = useApi()

  const fetchAnalytics = useCallback(async () => {
    return api.execute('/api/admin/analytics')
  }, [api])

  return {
    ...api,
    fetchAnalytics
  }
}