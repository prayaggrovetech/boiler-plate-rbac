# API Testing Scripts

This directory contains comprehensive testing scripts for the Micro SaaS Boilerplate API endpoints.

## 📁 Available Test Scripts

### 1. `test-individual-apis.sh`
**Purpose**: Basic API endpoint testing without authentication
- Tests public endpoints (health, CSRF, session)
- Tests unauthorized access to protected endpoints
- Provides manual testing commands for authenticated endpoints

**Usage**:
```bash
./scripts/test-individual-apis.sh
```

### 2. `test-authenticated-apis.sh`
**Purpose**: Comprehensive security and functionality testing
- Tests authentication and authorization
- Validates input handling and error responses
- Checks rate limiting and security headers
- Provides detailed manual testing instructions

**Usage**:
```bash
./scripts/test-authenticated-apis.sh
```

### 3. `test-scenarios.sh`
**Purpose**: Scenario-based testing covering specific use cases
- Security & Authorization scenarios
- Input validation scenarios
- Error handling scenarios
- Rate limiting scenarios
- RBAC permission scenarios

**Usage**:
```bash
./scripts/test-scenarios.sh
```

### 4. `manual-api-tests.md`
**Purpose**: Step-by-step manual testing guide
- Complete authentication flow instructions
- Detailed curl commands for all endpoints
- Expected results and troubleshooting guide
- Covers all CRUD operations with proper authentication

**Usage**: Follow the markdown guide for manual testing

## 🚀 Quick Start

### Run All Automated Tests
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run basic API tests
./scripts/test-individual-apis.sh

# Run security and functionality tests
./scripts/test-authenticated-apis.sh

# Run scenario-based tests
./scripts/test-scenarios.sh
```

### Manual Testing with Authentication
1. Follow `manual-api-tests.md` for complete testing
2. Get session tokens from browser after login
3. Test all authenticated endpoints with proper tokens

## 📊 Test Coverage

### ✅ Endpoints Tested

#### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/auth/csrf` - CSRF token
- `GET /api/auth/session` - Session info

#### Protected Endpoints (Admin Only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/[id]/roles` - Assign user roles
- `GET /api/roles` - List roles
- `POST /api/roles` - Create role
- `GET /api/roles/[id]` - Get specific role
- `PUT /api/roles/[id]` - Update role
- `DELETE /api/roles/[id]` - Delete role
- `GET /api/permissions` - List permissions
- `POST /api/permissions` - Create permission

### ✅ Test Scenarios Covered

#### Security Tests
- ✅ Authentication required for protected endpoints
- ✅ Authorization based on user roles
- ✅ CSRF token generation
- ✅ Session handling
- ✅ Rate limiting protection
- ✅ Input sanitization

#### Functionality Tests
- ✅ CRUD operations for users, roles, permissions
- ✅ User role assignment
- ✅ Pagination and search
- ✅ Data validation
- ✅ Error handling

#### Edge Cases
- ✅ Invalid JSON payloads
- ✅ Missing required fields
- ✅ Duplicate data creation
- ✅ Non-existent resource access
- ✅ Invalid HTTP methods
- ✅ Malformed URLs

## 🔧 Test Results Interpretation

### Expected Status Codes

| Scenario | Expected Status | Meaning |
|----------|----------------|---------|
| Successful operation | 200/201 | OK/Created |
| Unauthorized access | 401 | Authentication required |
| Insufficient permissions | 403 | Forbidden |
| Invalid input | 400 | Bad Request |
| Resource not found | 404 | Not Found |
| Rate limit exceeded | 429 | Too Many Requests |
| Server error | 500 | Internal Server Error |

### Success Indicators
- ✅ Public endpoints return 200
- ✅ Protected endpoints return 401 without auth
- ✅ Admin endpoints work with admin token
- ✅ Customer tokens can't access admin endpoints
- ✅ Invalid data is rejected with 400
- ✅ CRUD operations work correctly
- ✅ Rate limiting triggers after multiple requests

## 🐛 Troubleshooting

### Common Issues

1. **Server Not Running**
   ```bash
   # Start the development server
   npm run dev
   ```

2. **Database Not Seeded**
   ```bash
   # Seed the database with default users
   npm run db:seed
   ```

3. **Authentication Tokens Expired**
   - Get fresh tokens by logging in through the web interface
   - Copy session tokens from browser cookies

4. **Permission Denied Errors**
   - Verify you're using the correct user token (admin vs customer)
   - Check that the user has the required permissions

### Debugging Tips

1. **Check Server Logs**: Monitor the console output for detailed error messages
2. **Verify Database**: Ensure PostgreSQL is running and accessible
3. **Test Web Interface**: Verify the application works through the browser
4. **Check Network**: Ensure no firewall or proxy issues

## 📈 Extending Tests

### Adding New Test Cases

1. **Add to existing scripts**: Modify the shell scripts to include new endpoints
2. **Create new scenarios**: Add specific test scenarios to `test-scenarios.sh`
3. **Update manual guide**: Add new endpoints to `manual-api-tests.md`

### Test Script Structure

```bash
# Basic test pattern
response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$endpoint")
status_code=$(echo $response | tr -d '\n' | sed -E 's/.*HTTPSTATUS:([0-9]{3})$/\1/')
body=$(echo $response | sed -E 's/HTTPSTATUS\:[0-9]{3}$//')

# Validate response
if [ "$status_code" = "200" ]; then
    echo "✅ Test passed"
else
    echo "❌ Test failed: Expected 200, got $status_code"
fi
```

## 🎯 Best Practices

### When Running Tests

1. **Clean Environment**: Start with a fresh database seed
2. **Sequential Testing**: Run tests in order (basic → authenticated → scenarios)
3. **Monitor Logs**: Keep an eye on server console output
4. **Document Issues**: Note any unexpected behaviors for investigation

### Test Data Management

1. **Use Test Data**: Don't test with production data
2. **Clean Up**: Remove test users/roles after testing
3. **Consistent State**: Ensure database is in known state before testing

---

**🚀 These scripts provide comprehensive testing coverage for all API endpoints and security features of the Micro SaaS Boilerplate!**