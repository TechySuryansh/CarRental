# Car Rental App - Setup Guide

## Quick Start

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 2. Configure Environment Variables

#### Backend (`server/.env`)
Your backend `.env` is already configured with:
- MongoDB connection
- JWT secret
- ImageKit credentials

#### Frontend (`client/.env`)
Your frontend `.env` is already configured with:
- Backend URL: http://localhost:3000
- Currency: USD

### 3. Start the Application

#### Terminal 1 - Start Backend
```bash
cd server
npm start
```
Backend will run on: http://localhost:3000

#### Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```
Frontend will run on: http://localhost:5173 (or the port Vite assigns)

### 4. Test the Integration

#### As a User:
1. Open http://localhost:5173
2. Click "Login" and create an account
3. Browse cars at `/cars`
4. Click on a car to view details
5. Select dates and book a car
6. View your bookings at `/my-bookings`

#### As an Owner:
1. Change your role to "owner" (you can do this via MongoDB or create an API call)
2. Navigate to `/owner` to access the dashboard
3. Add cars via `/owner/add-car`
4. Manage your cars at `/owner/manage-cars`
5. View and manage bookings at `/owner/manage-bookings`

## API Integration Summary

### What's Connected:

✅ **User Authentication**
- Login/Register with JWT tokens
- Token stored in localStorage
- Auto-injected in API requests

✅ **Car Browsing**
- Homepage featured cars
- All cars page with search
- Individual car details

✅ **Booking System**
- Create bookings
- View user bookings
- Owner booking management

✅ **Owner Dashboard**
- Statistics (cars, bookings, revenue)
- Add/Edit/Delete cars
- Toggle car availability
- Manage booking status

### Key Files:

- **API Service**: `client/src/services/api.js`
- **Redux Auth**: `client/src/redux/Slices/AuthSlice.js`
- **Backend Routes**: `server/routes/*.js`
- **Controllers**: `server/controllers/*.js`

## Troubleshooting

### Backend not connecting?
- Check MongoDB connection string in `server/.env`
- Ensure MongoDB is running
- Check port 3000 is not in use

### Frontend not loading data?
- Verify `VITE_BACKEND_URL` in `client/.env`
- Check browser console for errors
- Ensure backend is running

### Authentication issues?
- Clear localStorage
- Check JWT_SECRET is set in backend
- Verify token is being sent in requests

## Next Steps

1. Test all user flows
2. Add more cars via owner dashboard
3. Test booking creation and management
4. Verify all CRUD operations work

## Database Schema

The app uses MongoDB with three main collections:
- **users**: User accounts and authentication
- **cars**: Car listings with owner references
- **bookings**: Rental bookings linking users, cars, and owners

All relationships are properly established and populated in API responses.
