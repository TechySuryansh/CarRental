# Debug Profile Data Issue

## Current Issue
Profile shows "Loading..." and navbar shows "Welcome, Owner" instead of actual user data.

## Debugging Steps

### 1. Check Browser Console
Open browser DevTools (F12) and check the Console tab for:

**Expected logs:**
```
NavbarOwner: Fetching user data...
NavbarOwner: Response: { success: true, user: {...} }
NavbarOwner: User set: { _id: '...', name: '...', email: '...' }

Fetching user data...
User data response: { success: true, user: {...} }
User set: { _id: '...', name: '...', email: '...' }
```

**If you see errors:**
- Check what the error message says
- Look for network errors (401, 404, 500, etc.)

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Refresh the page
3. Look for request to `/api/user/data`
4. Click on it and check:
   - **Status**: Should be 200
   - **Response**: Should have `{ success: true, user: {...} }`
   - **Headers**: Should have `Authorization: Bearer <token>`

### 3. Check Token
In browser console, run:
```javascript
console.log('Token:', localStorage.getItem('token'))
```

**Expected**: Should show a JWT token (long string with dots)
**If null**: You need to login again

### 4. Test API Directly
In browser console, run:
```javascript
fetch('http://localhost:3000/api/user/data', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(r => r.json())
.then(data => console.log('Direct API test:', data))
```

**Expected response:**
```json
{
  "success": true,
  "user": {
    "_id": "674c8a8f59c2a20013bf89c1",
    "name": "Your Name",
    "email": "your@email.com",
    "role": "owner"
  }
}
```

### 5. Check Backend Logs
In the terminal running the backend, you should see:
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Decoded token: { _id: '674c8a8f59c2a20013bf89c1', iat: 1733076687 }
User found: { _id: '674c8a8f59c2a20013bf89c1', name: 'Your Name', ... }
```

## Common Issues and Solutions

### Issue 1: "not authorized" error
**Cause**: Token is missing or invalid

**Solution:**
```javascript
// Clear storage and login again
localStorage.clear()
// Then login through the UI
```

### Issue 2: Network error / CORS error
**Cause**: Backend not running or CORS not configured

**Solution:**
1. Check backend is running: `cd server && npm start`
2. Verify CORS is enabled in `server/server.js`

### Issue 3: Token exists but still shows "Loading..."
**Cause**: Response format might be wrong

**Check backend response:**
```bash
# In terminal
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/user/data
```

Should return:
```json
{"success":true,"user":{...}}
```

### Issue 4: User data is null in response
**Cause**: User not found in database

**Solution:**
1. Check if user exists in MongoDB
2. Verify the user ID in token matches database
3. Try logging in again

## Quick Fix Checklist

- [ ] Backend is running on port 3000
- [ ] Frontend is running on port 5173
- [ ] Token exists in localStorage
- [ ] Token is valid (not expired)
- [ ] User exists in database
- [ ] `/api/user/data` endpoint returns 200
- [ ] Response has `success: true`
- [ ] Response has `user` object
- [ ] Console shows the debug logs

## Manual Test

### Test 1: Check if you're logged in
```javascript
// In browser console
const token = localStorage.getItem('token')
console.log('Logged in:', !!token)
console.log('Token:', token)
```

### Test 2: Decode token to see user ID
Go to https://jwt.io and paste your token to see:
```json
{
  "_id": "674c8a8f59c2a20013bf89c1",
  "iat": 1733076687
}
```

### Test 3: Check if user exists in database
In MongoDB Compass or Atlas:
```javascript
db.users.findOne({ _id: ObjectId("674c8a8f59c2a20013bf89c1") })
```

Should return your user document.

## Expected Flow

```
1. Page loads
   ↓
2. NavbarOwner mounts
   ↓
3. useEffect runs
   ↓
4. fetchUserData called
   ↓
5. API call to /api/user/data
   ↓
6. Token sent in Authorization header
   ↓
7. Backend verifies token
   ↓
8. Backend finds user
   ↓
9. Backend returns user data
   ↓
10. Frontend receives response
   ↓
11. User state updated
   ↓
12. UI re-renders with user name
```

## If Still Not Working

### Step 1: Verify backend endpoint works
```bash
# Get your token from localStorage
# Then test with curl:
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3000/api/user/data
```

### Step 2: Check if it's a frontend issue
If curl works but UI doesn't, the issue is in the frontend.

### Step 3: Check if it's a backend issue
If curl doesn't work, the issue is in the backend.

### Step 4: Try logging out and back in
```javascript
// In browser console
localStorage.clear()
// Then login again through UI
```

## What to Share for Help

If you need help, share:
1. Console logs (all of them)
2. Network tab screenshot of `/api/user/data` request
3. Backend terminal logs
4. Token (first 20 characters only)
5. Any error messages

## Next Steps After Fixing

Once you see your name:
1. ✅ Profile data is working
2. ✅ Try uploading a profile image
3. ✅ Check if image persists after refresh
4. ✅ Verify all owner features work
