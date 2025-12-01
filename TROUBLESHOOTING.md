# Troubleshooting Guide

## Common Issues and Solutions

### 1. Backend Won't Start

#### Issue: "Cannot find module"
```bash
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd server
npm install
```

#### Issue: "MongoDB connection failed"
```bash
MongooseError: Could not connect to MongoDB
```

**Solution:**
- Check `MONGODB_URI` in `server/.env`
- Verify MongoDB Atlas is accessible
- Check network/firewall settings
- Ensure IP whitelist includes your IP

#### Issue: "Port 3000 already in use"
```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in server/.env
PORT=3001
```

### 2. Frontend Won't Start

#### Issue: "Cannot find module 'vite'"
```bash
Error: Cannot find module 'vite'
```

**Solution:**
```bash
cd client
npm install
```

#### Issue: "VITE_BACKEND_URL is undefined"
```bash
undefined/api/user/login
```

**Solution:**
- Check `client/.env` exists
- Verify `VITE_BACKEND_URL=http://localhost:3000`
- Restart Vite dev server after changing .env

### 3. Authentication Issues

#### Issue: "Token not found" or "Unauthorized"
```javascript
Error: Request failed with status code 401
```

**Solution:**
```javascript
// Check if token exists
console.log(localStorage.getItem('token'));

// If null, user needs to login again
// Clear and re-login
localStorage.clear();
// Then login again
```

#### Issue: "JWT malformed"
```bash
JsonWebTokenError: jwt malformed
```

**Solution:**
- Token corrupted in localStorage
- Clear localStorage and login again
- Check JWT_SECRET is set in backend .env

#### Issue: User logged in but still shows as logged out
```javascript
// Redux state not updating
```

**Solution:**
```javascript
// Check Redux DevTools
// Verify token in localStorage
// Check if AuthSlice is properly configured
// Ensure Provider wraps App in main.jsx
```

### 4. API Connection Issues

#### Issue: "Network Error" or "ERR_CONNECTION_REFUSED"
```javascript
Error: Network Error
```

**Solution:**
1. Check backend is running on port 3000
2. Verify `VITE_BACKEND_URL` in client/.env
3. Check CORS is enabled in backend
4. Verify no firewall blocking

#### Issue: CORS Error
```bash
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```javascript
// In server/server.js, ensure:
import cors from "cors"
app.use(cors())

// Or specify origin:
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

### 5. Data Not Loading

#### Issue: Cars page shows "No cars found"
```javascript
// Empty array returned
```

**Solution:**
1. Check if cars exist in database
2. Verify `isAvailable: true` on cars
3. Check `owner` field is not null
4. Test API endpoint directly:
```bash
curl http://localhost:3000/api/owner/all-cars
```

#### Issue: Bookings not showing
```javascript
// Empty bookings array
```

**Solution:**
1. Verify user is logged in
2. Check token is valid
3. Ensure bookings exist for this user
4. Test API endpoint:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/booking/user-bookings
```

### 6. Image Upload Issues

#### Issue: "Image upload failed"
```javascript
Error: Failed to upload image
```

**Solution:**
1. Check ImageKit credentials in `server/.env`:
   - IMAGE_PUBLIC_KEY
   - IMAGE_PRIVATE_KEY
   - IMAGE_URL_ENDPOINT
2. Verify file size < 5MB
3. Check file type is image (jpg, png, etc.)
4. Ensure multer middleware is working

#### Issue: Images not displaying
```javascript
// Broken image icon
```

**Solution:**
1. Check image URL in database
2. Verify ImageKit URL is accessible
3. Check CORS on ImageKit
4. Inspect network tab for 404 errors

### 7. Booking Creation Issues

#### Issue: "Car not available for selected dates"
```javascript
Error: Car not available for the selected dates
```

**Solution:**
1. Check if dates overlap with existing booking
2. Verify car `isAvailable: true`
3. Ensure dates are in correct format
4. Check date validation logic

#### Issue: Price calculation wrong
```javascript
// Incorrect total price
```

**Solution:**
```javascript
// Check calculation in bookingController.js
const noOfDays = Math.ceil((returned - picked) / (1000*60*60*24)) + 1;
const price = carData.pricePerDay * noOfDays;
```

### 8. Owner Dashboard Issues

#### Issue: Dashboard shows 0 for all stats
```javascript
// All counts are 0
```

**Solution:**
1. Verify user role is "owner"
2. Check cars have correct owner ID
3. Ensure bookings reference correct owner
4. Test query in MongoDB:
```javascript
db.cars.find({ owner: ObjectId("USER_ID") })
```

#### Issue: "Not authorized" error
```javascript
Error: not authorized
```

**Solution:**
1. Check user role in database
2. Verify role check in controller
3. Ensure token contains correct user data

### 9. Redux State Issues

#### Issue: State not persisting on refresh
```javascript
// User logged out on page refresh
```

**Solution:**
```javascript
// Check AuthSlice initialState:
initialState: {
  user: localStorage.getItem('token') || null,
  // ...
}
```

#### Issue: Actions not dispatching
```javascript
// No state changes
```

**Solution:**
1. Check Redux DevTools
2. Verify action creators are imported
3. Ensure dispatch is called correctly
4. Check reducer is handling action

### 10. Build/Production Issues

#### Issue: Build fails
```bash
npm run build
Error: ...
```

**Solution:**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install

# Check for TypeScript errors
npm run lint

# Build again
npm run build
```

#### Issue: Environment variables not working in production
```javascript
// undefined in production
```

**Solution:**
- Ensure env vars are set in hosting platform
- For Vite, must start with `VITE_`
- Rebuild after changing env vars
- Check build logs for errors

## Debugging Tips

### 1. Check Browser Console
```javascript
// Open DevTools (F12)
// Look for errors in Console tab
// Check Network tab for failed requests
```

### 2. Check Backend Logs
```bash
# Backend should log errors
console.log(error.message);
```

### 3. Test API Endpoints Directly
```bash
# Using curl
curl http://localhost:3000/api/owner/all-cars

# Using Postman or Thunder Client
GET http://localhost:3000/api/owner/all-cars
```

### 4. Check Database
```javascript
// Using MongoDB Compass or Atlas UI
// Verify data exists
// Check field names match schema
```

### 5. Use Redux DevTools
```javascript
// Install Redux DevTools extension
// Monitor state changes
// Time-travel debugging
```

### 6. Add Debug Logs
```javascript
// In components
console.log('API Response:', response.data);
console.log('Current State:', state);

// In backend
console.log('Request Body:', req.body);
console.log('User:', req.user);
```

## Quick Fixes Checklist

When something doesn't work:

- [ ] Is the backend running?
- [ ] Is the frontend running?
- [ ] Are environment variables set correctly?
- [ ] Is the user logged in (for protected routes)?
- [ ] Check browser console for errors
- [ ] Check backend terminal for errors
- [ ] Check Network tab for failed requests
- [ ] Verify data exists in database
- [ ] Clear localStorage and try again
- [ ] Restart both servers
- [ ] Clear browser cache
- [ ] Check if ports are correct

## Getting Help

If issues persist:

1. Check error message carefully
2. Search error in documentation
3. Review ARCHITECTURE.md for understanding
4. Check API_INTEGRATION.md for endpoint details
5. Review code in similar working components
6. Add console.logs to trace execution
7. Test with minimal example
8. Check if issue is frontend or backend

## Common Error Messages

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| 401 Unauthorized | Missing/invalid token | Login again |
| 404 Not Found | Wrong endpoint/ID | Check URL |
| 500 Internal Server Error | Backend error | Check server logs |
| Network Error | Backend not running | Start backend |
| CORS Error | CORS not configured | Enable CORS |
| Cannot read property of undefined | Data not loaded | Add loading state |
| Token expired | JWT expired | Login again |
| Validation Error | Invalid data | Check input |

## Prevention Tips

1. **Always check authentication** before protected operations
2. **Add loading states** for async operations
3. **Handle errors gracefully** with try-catch
4. **Validate input** before sending to backend
5. **Use TypeScript** for better type safety (optional)
6. **Write tests** for critical flows
7. **Monitor console** during development
8. **Keep dependencies updated**
9. **Use environment variables** for configuration
10. **Document changes** as you make them
