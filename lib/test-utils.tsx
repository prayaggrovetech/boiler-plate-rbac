import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

// Mock session for testing
export const mockSession: Session = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    roles: [
      {
        id: 'admin-role-id',
        name: 'admin',
        description: 'Administrator role',
        permissions: [
          {
            id: 'perm-1',
            name: 'manage:users',
            resource: 'users',
            action: 'manage',
            description: 'Manage users'
          },
          {
            id: 'perm-2',
            name: 'view:analytics',
            resource: 'analytics',
            action: 'view',
            description: 'View analytics'
          }
        ]
      }
    ],
    permissions: ['manage:users', 'view:analytics']
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
}

export const mockCustomerSession: Session = {
  user: {
    id: 'customer-user-id',
    email: 'customer@example.com',
    name: 'Customer User',
    roles: [
      {
        id: 'customer-role-id',
        name: 'customer',
        description: 'Customer role',
        permissions: [
          {
            id: 'perm-3',
            name: 'view:profile',
            resource: 'profile',
            action: 'view',
            description: 'View profile'
          }
        ]
      }
    ],
    permissions: ['view:profile']
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: Session | null
}

export function renderWithProviders(
  ui: React.ReactElement,
  { session = mockSession, ...renderOptions }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Mock API responses
export const mockApiResponse = {
  users: {
    users: [
      {
        id: 'user-1',
        email: 'user1@example.com',
        name: 'User One',
        roles: [{ id: 'role-1', name: 'customer', description: 'Customer role' }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: new Date().toISOString()
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 1,
      pages: 1
    }
  },
  roles: {
    roles: [
      {
        id: 'role-1',
        name: 'admin',
        description: 'Administrator role',
        permissions: [
          {
            id: 'perm-1',
            name: 'manage:users',
            resource: 'users',
            action: 'manage',
            description: 'Manage users'
          }
        ],
        users: [],
        userCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }
}

// Mock fetch for API testing
export function mockFetch(response: any, status = 200) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
      headers: new Headers(),
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn()
    } as Response)
  )
}

// Test database utilities
export const testDb = {
  async cleanup() {
    // In a real implementation, this would clean up test database
    console.log('Test database cleanup')
  },
  
  async seed() {
    // In a real implementation, this would seed test data
    console.log('Test database seeding')
  }
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'