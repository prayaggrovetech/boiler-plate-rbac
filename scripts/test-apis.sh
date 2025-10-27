#!/bin/bash

# API Testing Script for Micro SaaS Boilerplate
# This script tests all API endpoints with various scenarios

BASE_URL="http://localhost:3000"
API_BASE="$BASE_URL/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$status" = "PASS" ]; then
        echo -e "${GREEN}✓ PASS${NC}: $message"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    elif [ "$status" = "FAIL" ]; then
        echo -e "${RED}✗ FAIL${NC}: $message"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    elif [ "$status" = "INFO" ]; then
        echo -e "${BLUE}ℹ INFO${NC}: $message"
    elif [ "$status" = "WARN" ]; then
        echo -e "${YELLOW}⚠ WARN${NC}: $message"
    fi
}

# Function to test HTTP response
test_response() {
    local expected_status=$1
    local actual_status=$2
    local test_name=$3
    local response_body=$4
    
    if [ "$actual_status" -eq "$expected_status" ]; then
        print_status "PASS" "$test_name (Status: $actual_status)"
        if [ ! -z "$response_body" ] && [ "$response_body" != "null" ]; then
            echo "    Response: $(echo $response_body | jq -r '.' 2>/dev/null || echo $response_body)"
        fi
    else
        print_status "FAIL" "$test_name (Expected: $expected_status, Got: $actual_status)"
        if [ ! -z "$response_body" ]; then
            echo "    Response: $(echo $response_body | jq -r '.' 2>/dev/null || echo $response_body)"
        fi
    fi
}

# Function to get session cookie
get_session_cookie() {
    local email=$1
    local password=$2
    
    # First, get CSRF token
    local csrf_response=$(curl -s -c /tmp/cookies.txt "$BASE_URL/api/auth/csrf")
    local csrf_token=$(echo $csrf_response | jq -r '.csrfToken' 2>/dev/null)
    
    # Login and get session
    local login_response=$(curl -s -b /tmp/cookies.txt -c /tmp/cookies.txt \
        -X POST "$BASE_URL/api/auth/callback/credentials" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "email=$email&password=$password&csrfToken=$csrf_token")
    
    # Extract session cookie
    local session_cookie=$(grep "next-auth.session-token" /tmp/cookies.txt | awk '{print $7}' 2>/dev/null)
    echo $session_cookie
}

# Function to make authenticated request
auth_request() {
    local method=$1
    local endpoint=$2
    local session_cookie=$3
    local data=$4
    
    if [ -z "$data" ]; then
        curl -s -w "\n%{http_code}" \
            -X "$method" \
            -H "Cookie: next-auth.session-token=$session_cookie" \
            -H "Content-Type: application/json" \
            "$API_BASE$endpoint"
    else
        curl -s -w "\n%{http_code}" \
            -X "$method" \
            -H "Cookie: next-auth.session-token=$session_cookie" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$API_BASE$endpoint"
    fi
}

echo "🚀 Starting API Tests for Micro SaaS Boilerplate"
echo "=================================================="

# Test 1: Health Check
print_status "INFO" "Testing Health Check Endpoint"
health_response=$(curl -s -w "\n%{http_code}" "$API_BASE/health")
health_body=$(echo "$health_response" | head -n -1)
health_status=$(echo "$health_response" | tail -n 1)
test_response 200 "$health_status" "Health check endpoint" "$health_body"

echo ""
print_status "INFO" "Testing Authentication Endpoints"

# Test 2: CSRF Token
csrf_response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/auth/csrf")
csrf_body=$(echo "$csrf_response" | head -n -1)
csrf_status=$(echo "$csrf_response" | tail -n 1)
test_response 200 "$csrf_status" "CSRF token endpoint" "$csrf_body"

# Test 3: Session without authentication
session_response=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/auth/session")
session_body=$(echo "$session_response" | head -n -1)
session_status=$(echo "$session_response" | tail -n 1)
test_response 200 "$session_status" "Session endpoint (unauthenticated)" "$session_body"

echo ""
print_status "INFO" "Testing API Endpoints Without Authentication"

# Test 4: Unauthorized access to protected endpoints
endpoints=("/users" "/roles" "/permissions")
for endpoint in "${endpoints[@]}"; do
    unauth_response=$(curl -s -w "\n%{http_code}" "$API_BASE$endpoint")
    unauth_status=$(echo "$unauth_response" | tail -n 1)
    test_response 401 "$unauth_status" "Unauthorized access to $endpoint"
done

echo ""
print_status "INFO" "Getting Admin Session for Authenticated Tests"

# Get admin session cookie (assuming seeded data exists)
admin_cookie=$(get_session_cookie "admin@example.com" "admin123")

if [ -z "$admin_cookie" ]; then
    print_status "WARN" "Could not get admin session cookie. Skipping authenticated tests."
    print_status "INFO" "Make sure the database is seeded with default users."
else
    print_status "PASS" "Admin session obtained successfully"
    
    echo ""
    print_status "INFO" "Testing Users API with Admin Authentication"
    
    # Test 5: Get users (admin)
    users_response=$(auth_request "GET" "/users" "$admin_cookie")
    users_body=$(echo "$users_response" | head -n -1)
    users_status=$(echo "$users_response" | tail -n 1)
    test_response 200 "$users_status" "Get users (admin)" "$users_body"
    
    # Test 6: Get users with pagination
    users_page_response=$(auth_request "GET" "/users?page=1&limit=5" "$admin_cookie")
    users_page_status=$(echo "$users_page_response" | tail -n 1)
    test_response 200 "$users_page_status" "Get users with pagination"
    
    # Test 7: Search users
    users_search_response=$(auth_request "GET" "/users?search=admin" "$admin_cookie")
    users_search_status=$(echo "$users_search_response" | tail -n 1)
    test_response 200 "$users_search_status" "Search users"
    
    # Test 8: Create new user
    new_user_data='{
        "email": "testuser@example.com",
        "name": "Test User",
        "password": "testpass123",
        "roles": ["customer"]
    }'
    create_user_response=$(auth_request "POST" "/users" "$admin_cookie" "$new_user_data")
    create_user_body=$(echo "$create_user_response" | head -n -1)
    create_user_status=$(echo "$create_user_response" | tail -n 1)
    test_response 201 "$create_user_status" "Create new user" "$create_user_body"
    
    # Extract created user ID for further tests
    created_user_id=$(echo "$create_user_body" | jq -r '.user.id' 2>/dev/null)
    
    # Test 9: Create user with duplicate email
    duplicate_user_response=$(auth_request "POST" "/users" "$admin_cookie" "$new_user_data")
    duplicate_user_status=$(echo "$duplicate_user_response" | tail -n 1)
    test_response 400 "$duplicate_user_status" "Create user with duplicate email"
    
    # Test 10: Create user with invalid data
    invalid_user_data='{"email": "invalid-email", "name": "", "password": "123"}'
    invalid_user_response=$(auth_request "POST" "/users" "$admin_cookie" "$invalid_user_data")
    invalid_user_status=$(echo "$invalid_user_response" | tail -n 1)
    test_response 400 "$invalid_user_status" "Create user with invalid data"
    
    echo ""
    print_status "INFO" "Testing Roles API with Admin Authentication"
    
    # Test 11: Get roles
    roles_response=$(auth_request "GET" "/roles" "$admin_cookie")
    roles_body=$(echo "$roles_response" | head -n -1)
    roles_status=$(echo "$roles_response" | tail -n 1)
    test_response 200 "$roles_status" "Get roles" "$roles_body"
    
    # Test 12: Create new role
    new_role_data='{
        "name": "testrole",
        "description": "Test Role for API Testing",
        "permissions": ["view:profile"]
    }'
    create_role_response=$(auth_request "POST" "/roles" "$admin_cookie" "$new_role_data")
    create_role_body=$(echo "$create_role_response" | head -n -1)
    create_role_status=$(echo "$create_role_response" | tail -n 1)
    test_response 201 "$create_role_status" "Create new role" "$create_role_body"
    
    # Extract created role ID
    created_role_id=$(echo "$create_role_body" | jq -r '.role.id' 2>/dev/null)
    
    # Test 13: Create role with duplicate name
    duplicate_role_response=$(auth_request "POST" "/roles" "$admin_cookie" "$new_role_data")
    duplicate_role_status=$(echo "$duplicate_role_response" | tail -n 1)
    test_response 400 "$duplicate_role_status" "Create role with duplicate name"
    
    # Test 14: Create role with invalid name
    invalid_role_data='{"name": "Invalid Role Name!", "description": "Invalid"}'
    invalid_role_response=$(auth_request "POST" "/roles" "$admin_cookie" "$invalid_role_data")
    invalid_role_status=$(echo "$invalid_role_response" | tail -n 1)
    test_response 400 "$invalid_role_status" "Create role with invalid name"
    
    if [ ! -z "$created_role_id" ] && [ "$created_role_id" != "null" ]; then
        # Test 15: Get specific role
        get_role_response=$(auth_request "GET" "/roles/$created_role_id" "$admin_cookie")
        get_role_status=$(echo "$get_role_response" | tail -n 1)
        test_response 200 "$get_role_status" "Get specific role"
        
        # Test 16: Update role
        update_role_data='{
            "description": "Updated Test Role Description",
            "permissions": ["view:profile", "view:analytics"]
        }'
        update_role_response=$(auth_request "PUT" "/roles/$created_role_id" "$admin_cookie" "$update_role_data")
        update_role_status=$(echo "$update_role_response" | tail -n 1)
        test_response 200 "$update_role_status" "Update role"
        
        # Test 17: Delete role
        delete_role_response=$(auth_request "DELETE" "/roles/$created_role_id" "$admin_cookie")
        delete_role_status=$(echo "$delete_role_response" | tail -n 1)
        test_response 200 "$delete_role_status" "Delete role"
    fi
    
    # Test 18: Try to delete system role (should fail)
    # First, get admin role ID
    admin_role_id=$(echo "$roles_body" | jq -r '.roles[] | select(.name=="admin") | .id' 2>/dev/null)
    if [ ! -z "$admin_role_id" ] && [ "$admin_role_id" != "null" ]; then
        delete_system_role_response=$(auth_request "DELETE" "/roles/$admin_role_id" "$admin_cookie")
        delete_system_role_status=$(echo "$delete_system_role_response" | tail -n 1)
        test_response 400 "$delete_system_role_status" "Delete system role (should fail)"
    fi
    
    echo ""
    print_status "INFO" "Testing Permissions API"
    
    # Test 19: Get permissions
    permissions_response=$(auth_request "GET" "/permissions" "$admin_cookie")
    permissions_body=$(echo "$permissions_response" | head -n -1)
    permissions_status=$(echo "$permissions_response" | tail -n 1)
    test_response 200 "$permissions_status" "Get permissions" "$permissions_body"
    
    # Test 20: Create new permission
    new_permission_data='{
        "name": "test:resource",
        "resource": "resource",
        "action": "test",
        "description": "Test permission for API testing"
    }'
    create_permission_response=$(auth_request "POST" "/permissions" "$admin_cookie" "$new_permission_data")
    create_permission_status=$(echo "$create_permission_response" | tail -n 1)
    test_response 201 "$create_permission_status" "Create new permission"
    
    # Test 21: Create permission with invalid format
    invalid_permission_data='{"name": "invalid_format", "resource": "test", "action": "test"}'
    invalid_permission_response=$(auth_request "POST" "/permissions" "$admin_cookie" "$invalid_permission_data")
    invalid_permission_status=$(echo "$invalid_permission_response" | tail -n 1)
    test_response 400 "$invalid_permission_status" "Create permission with invalid format"
    
    if [ ! -z "$created_user_id" ] && [ "$created_user_id" != "null" ]; then
        echo ""
        print_status "INFO" "Testing User Role Assignment"
        
        # Get customer role ID
        customer_role_id=$(echo "$roles_body" | jq -r '.roles[] | select(.name=="customer") | .id' 2>/dev/null)
        
        if [ ! -z "$customer_role_id" ] && [ "$customer_role_id" != "null" ]; then
            # Test 22: Assign roles to user
            assign_roles_data="{\"roleIds\": [\"$customer_role_id\"]}"
            assign_roles_response=$(auth_request "PUT" "/users/$created_user_id/roles" "$admin_cookie" "$assign_roles_data")
            assign_roles_status=$(echo "$assign_roles_response" | tail -n 1)
            test_response 200 "$assign_roles_status" "Assign roles to user"
            
            # Test 23: Assign invalid role ID
            invalid_assign_data='{"roleIds": ["invalid-role-id"]}'
            invalid_assign_response=$(auth_request "PUT" "/users/$created_user_id/roles" "$admin_cookie" "$invalid_assign_data")
            invalid_assign_status=$(echo "$invalid_assign_response" | tail -n 1)
            test_response 400 "$invalid_assign_status" "Assign invalid role ID"
        fi
    fi
fi

echo ""
print_status "INFO" "Testing Customer Session"

# Get customer session
customer_cookie=$(get_session_cookie "customer@example.com" "customer123")

if [ ! -z "$customer_cookie" ]; then
    print_status "PASS" "Customer session obtained successfully"
    
    # Test 24: Customer trying to access admin endpoints (should fail)
    customer_users_response=$(auth_request "GET" "/users" "$customer_cookie")
    customer_users_status=$(echo "$customer_users_response" | tail -n 1)
    test_response 403 "$customer_users_status" "Customer accessing admin endpoint (should fail)"
    
    customer_roles_response=$(auth_request "GET" "/roles" "$customer_cookie")
    customer_roles_status=$(echo "$customer_roles_response" | tail -n 1)
    test_response 403 "$customer_roles_status" "Customer accessing roles endpoint (should fail)"
else
    print_status "WARN" "Could not get customer session cookie"
fi

echo ""
print_status "INFO" "Testing Rate Limiting"

# Test 25: Rate limiting (make multiple rapid requests)
for i in {1..6}; do
    rate_limit_response=$(curl -s -w "\n%{http_code}" "$API_BASE/users")
    rate_limit_status=$(echo "$rate_limit_response" | tail -n 1)
    
    if [ $i -le 5 ]; then
        # First 5 should be 401 (unauthorized)
        test_response 401 "$rate_limit_status" "Rate limit test $i/6 (unauthorized)"
    else
        # 6th might be rate limited (429) or still unauthorized (401)
        if [ "$rate_limit_status" -eq 429 ]; then
            test_response 429 "$rate_limit_status" "Rate limit test $i/6 (rate limited)"
        else
            test_response 401 "$rate_limit_status" "Rate limit test $i/6 (still unauthorized)"
        fi
    fi
done

echo ""
print_status "INFO" "Testing Error Handling"

# Test 26: Non-existent endpoints
not_found_response=$(curl -s -w "\n%{http_code}" "$API_BASE/nonexistent")
not_found_status=$(echo "$not_found_response" | tail -n 1)
test_response 404 "$not_found_status" "Non-existent endpoint"

# Test 27: Invalid JSON
if [ ! -z "$admin_cookie" ]; then
    invalid_json_response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Cookie: next-auth.session-token=$admin_cookie" \
        -H "Content-Type: application/json" \
        -d "invalid json" \
        "$API_BASE/users")
    invalid_json_status=$(echo "$invalid_json_response" | tail -n 1)
    test_response 400 "$invalid_json_status" "Invalid JSON payload"
fi

# Cleanup
rm -f /tmp/cookies.txt

echo ""
echo "=================================================="
echo "🏁 API Testing Complete!"
echo "=================================================="
echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the output above.${NC}"
    exit 1
fi