# Manual API Testing Guide

This guide provides step-by-step instructions for manually testing all API endpoints with authentication.

## Prerequisites

1. **Server Running**: Make sure the development server is running at `http://localhost:3000`
2. **Database Seeded**: Ensure the database has been seeded with default users
3. **Browser**: Use Chrome/Firefox with developer tools

## Step 1: Get Authentication Tokens

### Admin Token
1. Open browser and go to: `http://localhost:3000/login`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Open Developer Tools (F12) → Application/Storage → Cookies
4. Copy the value of `next-auth.session-token`
5. Save it as `ADMIN_TOKEN`

### Customer Token
1. Logout and login again with:
   - Email: `customer@example.com`
   - Password: `customer123`
2. Copy the `next-auth.session-token` value
3. Save it as `CUSTOMER_TOKEN`

## Step 2: Test Public Endpoints

### Health Check
```bash
curl -X GET 'http://localhost:3000/api/health' \
  -H 'Content-Type: application/json' \
  -s | jq '.'
```
**Expected**: Status 200, health information

### CSRF Token
```bash
curl -X GET 'http://localhost:3000/api/auth/csrf' \
  -H 'Content-Type: application/json' \
  -s | jq '.'
```
**Expected**: Status 200, CSRF token

### Session (Unauthenticated)
```bash
curl -X GET 'http://localhost:3000/api/auth/session' \
  -H 'Content-Type: application/json' \
  -s | jq '.'
```
**Expected**: Status 200, `null` response

## Step 3: Test Unauthorized Access

### Users Endpoint (No Auth)
```bash
curl -X GET 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 401, "Unauthorized" error

### Roles Endpoint (No Auth)
```bash
curl -X GET 'http://localhost:3000/api/roles' \
  -H 'Content-Type: application/json' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 401, "Unauthorized" error

## Step 4: Test Admin Endpoints (Replace ADMIN_TOKEN)

### Get Users
```bash
curl -X GET 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, list of users with pagination

### Get Users with Pagination
```bash
curl -X GET 'http://localhost:3000/api/users?page=1&limit=5' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, paginated user list

### Search Users
```bash
curl -X GET 'http://localhost:3000/api/users?search=admin' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, filtered user list

### Create New User
```bash
curl -X POST 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "email": "newuser@example.com",
    "name": "New Test User",
    "password": "password123",
    "roles": ["customer"]
  }' \
  -s | jq '.'
```
**Expected**: Status 201, created user object

### Try Creating Duplicate User
```bash
curl -X POST 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "email": "newuser@example.com",
    "name": "Duplicate User",
    "password": "password123"
  }' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, "User already exists" error

### Create User with Invalid Data
```bash
curl -X POST 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "email": "invalid-email",
    "name": "",
    "password": "123"
  }' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, validation errors

## Step 5: Test Roles API

### Get All Roles
```bash
curl -X GET 'http://localhost:3000/api/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, list of roles with permissions

### Create New Role
```bash
curl -X POST 'http://localhost:3000/api/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "name": "editor",
    "description": "Content Editor Role",
    "permissions": ["view:profile"]
  }' \
  -s | jq '.'
```
**Expected**: Status 201, created role object

### Get Specific Role (Replace ROLE_ID from previous response)
```bash
curl -X GET 'http://localhost:3000/api/roles/ROLE_ID' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, role details

### Update Role
```bash
curl -X PUT 'http://localhost:3000/api/roles/ROLE_ID' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "description": "Updated Editor Role",
    "permissions": ["view:profile", "view:analytics"]
  }' \
  -s | jq '.'
```
**Expected**: Status 200, updated role object

### Try Creating Role with Invalid Name
```bash
curl -X POST 'http://localhost:3000/api/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "name": "Invalid Role Name!",
    "description": "Invalid"
  }' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, validation error

### Delete Role (Non-system role only)
```bash
curl -X DELETE 'http://localhost:3000/api/roles/ROLE_ID' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 200, success message

## Step 6: Test Permissions API

### Get All Permissions
```bash
curl -X GET 'http://localhost:3000/api/permissions' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -s | jq '.'
```
**Expected**: Status 200, list of permissions grouped by resource

### Create New Permission
```bash
curl -X POST 'http://localhost:3000/api/permissions' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "name": "edit:posts",
    "resource": "posts",
    "action": "edit",
    "description": "Edit blog posts"
  }' \
  -s | jq '.'
```
**Expected**: Status 201, created permission object

### Try Creating Permission with Invalid Format
```bash
curl -X POST 'http://localhost:3000/api/permissions' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "name": "invalid_format",
    "resource": "posts",
    "action": "edit"
  }' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, validation error (name should be action:resource format)

## Step 7: Test User Role Assignment

### Assign Roles to User (Replace USER_ID and ROLE_ID)
```bash
curl -X PUT 'http://localhost:3000/api/users/USER_ID/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "roleIds": ["ROLE_ID"]
  }' \
  -s | jq '.'
```
**Expected**: Status 200, updated user with new roles

### Try Assigning Invalid Role ID
```bash
curl -X PUT 'http://localhost:3000/api/users/USER_ID/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d '{
    "roleIds": ["invalid-role-id"]
  }' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, "One or more roles not found" error

## Step 8: Test Customer Access (Replace CUSTOMER_TOKEN)

### Customer Trying to Access Admin Endpoints
```bash
curl -X GET 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=CUSTOMER_TOKEN' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 403, "Insufficient permissions" error

```bash
curl -X GET 'http://localhost:3000/api/roles' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=CUSTOMER_TOKEN' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 403, "Insufficient permissions" error

## Step 9: Test Error Handling

### Invalid JSON
```bash
curl -X POST 'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -d 'invalid json' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 400, JSON parsing error

### Non-existent Endpoint
```bash
curl -X GET 'http://localhost:3000/api/nonexistent' \
  -H 'Content-Type: application/json' \
  -w '\nStatus: %{http_code}\n' \
  -s
```
**Expected**: Status 404, not found error

### Non-existent Resource ID
```bash
curl -X GET 'http://localhost:3000/api/roles/nonexistent-id' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: next-auth.session-token=ADMIN_TOKEN' \
  -w '\nStatus: %{http_code}\n' \
  -s | jq '.'
```
**Expected**: Status 404, "Role not found" error

## Step 10: Test Rate Limiting

### Multiple Rapid Requests (Run this multiple times quickly)
```bash
for i in {1..10}; do
  echo "Request $i:"
  curl -X GET 'http://localhost:3000/api/users' \
    -H 'Content-Type: application/json' \
    -w '\nStatus: %{http_code}\n' \
    -s | head -1
  echo ""
done
```
**Expected**: Eventually get Status 429 (Too Many Requests) with rate limit headers

## Expected Results Summary

| Test Category | Expected Behavior |
|---------------|-------------------|
| **Public Endpoints** | Health check works, CSRF tokens generated |
| **Authentication** | Protected endpoints return 401 without auth |
| **Authorization** | Admin endpoints work with admin token, fail with customer token |
| **CRUD Operations** | Create, read, update, delete work with proper permissions |
| **Input Validation** | Invalid data rejected with 400 status |
| **Error Handling** | Proper error responses for various failure scenarios |
| **Rate Limiting** | 429 status after too many requests |
| **Security** | No sensitive data leaked, proper CORS headers |

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if session token is correct and not expired
2. **403 Forbidden**: User doesn't have required permissions for the endpoint
3. **400 Bad Request**: Check JSON syntax and required fields
4. **404 Not Found**: Verify endpoint URL and resource IDs
5. **500 Internal Server Error**: Check server logs for application errors

### Getting Fresh Tokens

If tokens expire, repeat Step 1 to get fresh authentication tokens.

### Checking Server Logs

Monitor the server console for detailed error messages and request logs.

---

**✅ This completes the comprehensive API testing. All endpoints should work as expected with proper authentication and authorization!**