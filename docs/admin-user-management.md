# Admin User Management Guide

## Overview

This guide explains how administrators can create and manage other admin users with specific roles and module access in the system.

## Creating Admin Users

### Step-by-Step Process

1. **Access User Management**
   - Navigate to `/dashboard` (admin dashboard)
   - Click on "Manage Users" or go directly to `/admin/users`

2. **Create New User**
   - Click the "Create User" button
   - Fill in the required information:
     - **Email**: User's email address (must be unique)
     - **Name**: Full name of the user
     - **Password**: Secure password (minimum 6 characters)
     - **Confirm Password**: Re-enter the password

3. **Assign Roles**
   - In the "Assign Roles" section, select appropriate roles:
     - **Admin**: Full system access (recommended for admin users)
     - **Manager**: Team management capabilities
     - **Customer**: Basic user access

4. **Complete Creation**
   - Click "Create User" to finalize
   - The new user will receive their credentials and can log in immediately

## Available Roles & Permissions

### Admin Role
- **Full System Access**: Complete control over all system features
- **User Management**: Create, edit, delete users
- **Role Management**: Create and modify roles and permissions
- **System Settings**: Configure system-wide settings
- **Analytics**: View all system analytics and reports

### Manager Role
- **Team Management**: Manage team members and assignments
- **Project Oversight**: Monitor project progress
- **Performance Reviews**: Conduct team performance evaluations
- **Limited User Management**: Manage users within their scope

### Customer Role
- **Profile Management**: Manage own profile and settings
- **Subscription Management**: View and manage billing
- **Usage Analytics**: View personal usage statistics
- **Support Access**: Access customer support features

## Role-Based Module Access

### Admin Modules
- User Management (`/admin/users`)
- Role Management (`/admin/roles`)
- System Settings (`/admin/settings`)
- Analytics Dashboard
- Security Logs
- System Health Monitoring

### Manager Modules
- Team Dashboard (`/manager/dashboard`)
- Team Management (`/manager/team`)
- Project Management (`/manager/projects`)
- Performance Reviews (`/manager/reviews`)
- Reports (`/manager/reports`)

### Customer Modules
- Personal Dashboard (`/dashboard`)
- Profile Management (`/customer/profile`)
- Billing & Subscription (`/customer/billing`)
- Usage Analytics (`/customer/analytics`)
- Support Center (`/customer/support`)

## Permission System

### Permission Structure
Permissions follow the format: `action:resource`

Examples:
- `manage:users` - Can create, edit, delete users
- `view:analytics` - Can view analytics data
- `create:roles` - Can create new roles
- `manage:settings` - Can modify system settings

### Custom Roles
Administrators can create custom roles with specific permission combinations:

1. Go to `/admin/roles`
2. Click "Create Role"
3. Define role name and description
4. Select specific permissions from available options
5. Save the role

## Best Practices

### Security Guidelines
1. **Strong Passwords**: Enforce minimum 8-character passwords with mixed case, numbers, and symbols
2. **Principle of Least Privilege**: Only assign necessary permissions
3. **Regular Audits**: Review user roles and permissions quarterly
4. **Account Monitoring**: Monitor admin account activities

### Admin User Creation
1. **Verify Identity**: Confirm the identity of users before granting admin access
2. **Document Access**: Keep records of who has admin access and why
3. **Temporary Access**: Use time-limited roles for temporary admin needs
4. **Multi-Factor Authentication**: Enable MFA for all admin accounts (when available)

### Role Management
1. **Role Naming**: Use clear, descriptive role names
2. **Permission Grouping**: Group related permissions logically
3. **Regular Review**: Review and update roles as business needs change
4. **Testing**: Test new roles in a safe environment before deployment

## API Endpoints

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "email": "admin@example.com",
  "name": "Admin User",
  "password": "securepassword123",
  "roles": ["admin"]
}
```

### Get Users
```http
GET /api/users?page=1&limit=10&search=admin&role=admin
```

### Update User Roles
```http
PUT /api/users/{userId}/roles
Content-Type: application/json

{
  "roles": ["admin", "manager"]
}
```

## Troubleshooting

### Common Issues

1. **User Creation Fails**
   - Check if email already exists
   - Verify password meets requirements
   - Ensure you have `manage:users` permission

2. **Role Assignment Issues**
   - Verify role exists in the system
   - Check if you have permission to assign the role
   - Ensure role has necessary permissions

3. **Access Denied**
   - Verify user has correct roles assigned
   - Check if permissions are properly configured
   - Review middleware and route protection

### Error Messages

- `"User already exists"` - Email is already registered
- `"Insufficient permissions"` - Current user lacks required permissions
- `"Invalid input"` - Form validation failed
- `"Role not found"` - Specified role doesn't exist

## Support

For additional help with admin user management:

1. Check the system logs for detailed error messages
2. Review the role and permission configuration
3. Contact system administrator for advanced troubleshooting
4. Refer to the API documentation for programmatic access

---

**Note**: This system uses role-based access control (RBAC) to ensure secure and granular permission management. Always follow security best practices when creating admin users.