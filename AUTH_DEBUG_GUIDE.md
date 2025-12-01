# Authentication Debugging Guide

## Issue: "Not Authorized" Error

### What Was Fixed

**Problem**: The auth middleware was using `jwt.decode()` instead of `jwt.verify()`
- `jwt.decode()` - Only decodes the token WITHOUT verifying signature
- `jwt.verify()` - Decodes AND verifies the token signature

**Solution**: Updated `server/middleware/auth.js` to:
1. Use `jwt.verify()` instead of `jwt.decode()`
2. Better error messages for debugging
3. Handle missing authorization header
4. Properly extract user ID from decoded token

### How to Debug Authentication Issues

#### 1. Check if User is Logged In (Frontend)

Open browser console and run:
```javascript
// Check if token exists
console.log('Token:', localStorage.getItem('token'))

// Check Redux state
// (Open Redux DevTools)
```

**Expected**: Should show a JWT token string

**If null**: User needs to login

#### 2. Check Token Format

The token should look like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRjOGE4ZjU5YzJhMjAwMTNiZjg5YzEiLCJpYXQiOjE3MzMwNzY2ODd9.xYz...
```

Three parts separated by dots (`.`)

#### 3. Decode Token (for debugging)

Visit https://jwt.io and paste your token to see the payload:
```json
{
  "_id": "674c8a8f59c2a20013bf89c1",
  "iat": 1733076687
}
```

**Check**: Does `_id` exist in the payload?

#### 4. Check API Request Headers

Open browser DevTools → Network tab → Find the failing request → Headers:

**Should see**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**If missing**: API service not adding token

#### 5. Check Backend Logs

In the terminal running the backend, you should see:
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Decoded token: { _id: '674c8a8f59c2a20013bf89c1', iat: 1733076687 }
User found: { _id: '674c8a8f59c2a20013bf89c1', name: 'John', email: 'john@example.com', role: 'user' }
```

**If you see**: "not authorized - ..." → Check the specific error message

### Common Issues and Solutions

#### Issue 1: "not authorized - no token"
**Cause**: Authorization header missing or doesn't start with "Bearer"

**Solution**:
```javascript
// Check API service in client/src/services/api.js
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Must have "Bearer " prefix
    }
    return config;
  }
);
```

#### Issue 2: "not authorized - token missing"
**Cause**: Token is empty string or undefined

**Solution**: User needs to login again
```javascript
// Clear and re-login
localStorage.clear();
// Then login through the UI
```

#### Issue 3: "not authorized - invalid token"
**Cause**: Token signature verification failed

**Possible reasons**:
1. JWT_SECRET changed on backend
2. Token was manually edited
3. Token corrupted

**Solution**: Login again to get a new token

#### Issue 4: "not authorized - user not found"
**Cause**: User ID in token doesn't exist in database

**Solution**: 
1. Check if user was deleted from database
2. Login again to get fresh token

#### Issue 5: "jwt malformed"
**Cause**: Token format is invalid

**Solution**: Clear localStorage and login again

#### Issue 6: "jwt expired"
**Cause**: Token has expired (if expiration was set)

**Solution**: Login again

### Testing Authentication

#### Test 1: Login Flow
```bash
# 1. Register/Login
POST http://localhost:3000/api/user/login
Body: { "email": "test@example.com", "password": "password123" }

# Expected Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# 2. Copy the token
```

#### Test 2: Protected Route
```bash
# Use the token from Test 1
GET http://localhost:3000/api/user/data
Headers: Authorization: Bearer YOUR_TOKEN_HERE

# Expected Response:
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

#### Test 3: Owner Route
```bash
# First, change user role to "owner" in database
# Then test owner endpoint
GET http://localhost:3000/api/owner/dashboard-data
Headers: Authorization: Bearer YOUR_TOKEN_HERE

# Expected Response:
{
  "success": true,
  "dashboardData": { ... }
}
```

### Quick Fixes

#### Fix 1: Clear Everything and Start Fresh
```javascript
// In browser console
localStorage.clear();
// Then login again through UI
```

#### Fix 2: Check Environment Variables
```bash
# In server/.env
JWT_SECRET=your_secret_here  # Must be set!
```

#### Fix 3: Restart Backend
```bash
# Stop server (Ctrl+C)
# Start again
cd server
npm start
```

#### Fix 4: Check User Role
```javascript
// In MongoDB or MongoDB Compass
db.users.findOne({ email: "your@email.com" })

// Check the "role" field
// For owner features, role must be "owner"
```

### Debugging Checklist

When you get "not authorized":

- [ ] Check if token exists in localStorage
- [ ] Check if token is being sent in request headers
- [ ] Check backend logs for specific error message
- [ ] Verify JWT_SECRET is set in server/.env
- [ ] Try logging in again
- [ ] Check if user exists in database
- [ ] Verify token format (3 parts separated by dots)
- [ ] Check if Authorization header has "Bearer " prefix
- [ ] Restart backend server
- [ ] Clear browser cache/localStorage

### Token Lifecycle

```
1. User Login
   ↓
2. Backend generates JWT with user._id
   ↓
3. Token sent to frontend
   ↓
4. Frontend stores in localStorage
   ↓
5. Frontend adds to all API requests
   ↓
6. Backend verifies token
   ↓
7. Backend extracts user._id
   ↓
8. Backend fetches user from database
   ↓
9. User attached to req.user
   ↓
10. Controller can access req.user
```

### Manual Testing

#### Test in Browser Console:
```javascript
// 1. Check token
const token = localStorage.getItem('token');
console.log('Token:', token);

// 2. Test API call manually
fetch('http://localhost:3000/api/user/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(data => console.log('Response:', data));
```

#### Test with curl:
```bash
# Replace YOUR_TOKEN with actual token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/user/data
```

### Expected Backend Logs

**Successful authentication**:
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Decoded token: { _id: '674c8a8f59c2a20013bf89c1', iat: 1733076687 }
User found: { _id: '674c8a8f59c2a20013bf89c1', name: 'John', ... }
```

**Failed authentication**:
```
Auth error: jwt malformed
```
or
```
Auth error: invalid signature
```

### Prevention Tips

1. **Never edit tokens manually** - Always get fresh tokens from login
2. **Set JWT_SECRET** - Must be set in environment variables
3. **Use HTTPS in production** - Prevents token interception
4. **Add token expiration** - For better security (optional)
5. **Handle 401 errors** - Redirect to login when token expires

### Next Steps

If authentication still fails after these fixes:
1. Check the specific error message in backend logs
2. Verify the token payload at jwt.io
3. Ensure JWT_SECRET matches between token creation and verification
4. Try creating a new user and logging in with that
5. Check if the issue is specific to owner routes (role check)
