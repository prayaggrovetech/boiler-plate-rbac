#!/bin/bash

# Individual API Testing Script
# Test specific endpoints with curl commands

BASE_URL="http://localhost:3000"
API_BASE="$BASE_URL/api"

echo "🧪 Individual API Tests"
echo "======================"

echo ""
echo "1. Testing Health Check:"
curl -X GET "$API_BASE/health" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "2. Testing CSRF Token:"
curl -X GET "$BASE_URL/api/auth/csrf" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "3. Testing Session (Unauthenticated):"
curl -X GET "$BASE_URL/api/auth/session" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "4. Testing Unauthorized Access to Users:"
curl -X GET "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "5. Testing Unauthorized Access to Roles:"
curl -X GET "$API_BASE/roles" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "6. Testing Unauthorized Access to Permissions:"
curl -X GET "$API_BASE/permissions" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "7. Testing Invalid JSON to Users Endpoint:"
curl -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d "invalid json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "8. Testing Non-existent Endpoint:"
curl -X GET "$API_BASE/nonexistent" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Response received"

echo ""
echo "9. Testing Rate Limiting (Multiple Requests):"
for i in {1..3}; do
  echo "Request $i:"
  curl -X GET "$API_BASE/users" \
    -H "Content-Type: application/json" \
    -w "\nStatus Code: %{http_code}\n" \
    -s | jq '.' 2>/dev/null || echo "Response received"
  echo ""
done

echo ""
echo "🔐 To test authenticated endpoints, you need to:"
echo "1. Login through the web interface at $BASE_URL/login"
echo "2. Use browser dev tools to get the session cookie"
echo "3. Use the cookie in your curl requests like this:"
echo ""
echo "Example authenticated request:"
echo "curl -X GET '$API_BASE/users' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Cookie: next-auth.session-token=YOUR_SESSION_TOKEN' \\"
echo "  -w '\\nStatus Code: %{http_code}\\n' \\"
echo "  -s | jq '.'"

echo ""
echo "📝 Manual Testing Commands:"
echo "=========================="

echo ""
echo "# Test creating a user (requires admin session):"
echo "curl -X POST '$API_BASE/users' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Cookie: next-auth.session-token=YOUR_ADMIN_TOKEN' \\"
echo "  -d '{
    \"email\": \"newuser@example.com\",
    \"name\": \"New User\",
    \"password\": \"password123\",
    \"roles\": [\"customer\"]
  }' \\"
echo "  -w '\\nStatus Code: %{http_code}\\n' \\"
echo "  -s | jq '.'"

echo ""
echo "# Test creating a role (requires admin session):"
echo "curl -X POST '$API_BASE/roles' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Cookie: next-auth.session-token=YOUR_ADMIN_TOKEN' \\"
echo "  -d '{
    \"name\": \"editor\",
    \"description\": \"Editor role\",
    \"permissions\": [\"view:profile\", \"edit:content\"]
  }' \\"
echo "  -w '\\nStatus Code: %{http_code}\\n' \\"
echo "  -s | jq '.'"

echo ""
echo "# Test creating a permission (requires admin session):"
echo "curl -X POST '$API_BASE/permissions' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Cookie: next-auth.session-token=YOUR_ADMIN_TOKEN' \\"
echo "  -d '{
    \"name\": \"edit:content\",
    \"resource\": \"content\",
    \"action\": \"edit\",
    \"description\": \"Edit content permission\"
  }' \\"
echo "  -w '\\nStatus Code: %{http_code}\\n' \\"
echo "  -s | jq '.'"

echo ""
echo "✅ Individual API tests completed!"