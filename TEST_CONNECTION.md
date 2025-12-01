# Test Backend Connection

## Issue
Server is running but frontend gets `ERR_CONNECTION_REFUSED`

## Quick Tests

### Test 1: Check if server is actually running
Open a new browser tab and go to:
```
http://localhost:3000/
```

**Expected**: Should show "Server is Running"
**If it doesn't work**: Server is not actually running or running on different port

### Test 2: Check what port the server is on
In your backend terminal, look for:
```
Server running on port XXXX
```

Is it 3000 or something else?

### Test 3: Test API endpoint directly
Open a new browser tab and go to:
```
http://localhost:3000/api/user/data
```

**Expected**: Should show an error about authorization (that's OK, means server is responding)
**If connection refused**: Server not running or firewall blocking

### Test 4: Check if another process is using port 3000
Run in terminal:
```bash
lsof -i :3000
```

or

```bash
netstat -an | grep 3000
```

### Test 5: Restart both servers

#### Stop backend (Ctrl+C in backend terminal)
#### Stop frontend (Ctrl+C in frontend terminal)

#### Start backend first:
```bash
cd server
npm start
```

Wait for "Server running on port 3000"

#### Then start frontend:
```bash
cd client
npm run dev
```

### Test 6: Check if .env is being read
In your backend terminal, add this temporarily to server.js:
```javascript
console.log('PORT:', process.env.PORT || 3000)
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set')
```

Restart server and check output.

### Test 7: Try different port
In `server/.env`, add:
```
PORT=3001
```

In `client/.env`, change to:
```
VITE_BACKEND_URL=http://localhost:3001
```

Restart both servers.

## Common Causes

### 1. Server crashed silently
Check backend terminal for errors

### 2. Wrong port
Server might be on different port than 3000

### 3. Firewall blocking
macOS firewall might be blocking connections

### 4. Another app using port 3000
Kill the other process:
```bash
lsof -i :3000
kill -9 <PID>
```

### 5. Frontend not restarted after .env change
Restart Vite dev server (Ctrl+C then npm run dev)

### 6. CORS issue
Check browser console for CORS errors (different from connection refused)

## What to Check

1. ✅ Backend terminal shows "Server running on port 3000"
2. ✅ `http://localhost:3000/` works in browser
3. ✅ No errors in backend terminal
4. ✅ Frontend .env has correct URL
5. ✅ Frontend was restarted after .env changes
6. ✅ No firewall blocking port 3000

## If Still Not Working

Share:
1. Screenshot of backend terminal
2. Screenshot of frontend terminal
3. What happens when you visit http://localhost:3000/ in browser
4. Output of: `lsof -i :3000`
