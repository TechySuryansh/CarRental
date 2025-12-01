# API Integration Documentation

## Overview
This document describes the complete frontend-backend integration for the Car Rental application.

## Backend API Endpoints

### User APIs
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `GET /api/user/data` - Get user data (protected)

### Car APIs
- `GET /api/owner/all-cars` - Get all available cars (public)
- `GET /api/owner/cars` - Get owner's cars (protected)
- `POST /api/owner/add-car` - Add new car (protected, multipart)
- `POST /api/owner/toggle-car` - Toggle car availability (protected)
- `POST /api/owner/delete-car` - Delete car (protected)

### Owner APIs
- `POST /api/owner/change-role` - Change user role to owner (protected)
- `GET /api/owner/dashboard-data` - Get dashboard statistics (protected)
- `POST /api/owner/update-image` - Update user image (protected, multipart)

### Booking APIs
- `POST /api/booking/check-availability` - Check car availability
- `POST /api/booking/create-booking` - Create new booking (protected)
- `GET /api/booking/user-bookings` - Get user bookings (protected)
- `GET /api/booking/owner-bookings` - Get owner bookings (protected)
- `POST /api/booking/change-booking-status` - Update booking status (protected)

## Frontend Integration

### API Service Layer
Location: `client/src/services/api.js`

The centralized API service provides:
- Axios instance with base URL configuration
- Automatic token injection for authenticated requests
- Organized API methods by domain (user, car, owner, booking)

### Pages Connected to Backend

#### 1. Cars Page (`client/src/pages/Cars.jsx`)
- Fetches all available cars from backend
- Implements search/filter functionality
- Displays loading state

#### 2. Car Details Page (`client/src/pages/CarDetails.jsx`)
- Fetches individual car details
- Handles booking creation
- Validates user authentication before booking
- Calculates rental dates

#### 3. My Bookings Page (`client/src/pages/MyBookings.jsx`)
- Fetches user's bookings
- Displays booking status
- Shows rental period and pricing

#### 4. Owner Dashboard (`client/src/pages/owner/Dashboard.jsx`)
- Fetches dashboard statistics
- Displays total cars, bookings, revenue
- Shows recent bookings

#### 5. Add Car Page (`client/src/pages/owner/AddCar.jsx`)
- Handles car creation with image upload
- Uses FormData for multipart requests

#### 6. Manage Cars Page (`client/src/pages/owner/ManageCars.jsx`)
- Fetches owner's cars
- Toggle car availability
- Delete cars

#### 7. Manage Bookings Page (`client/src/pages/owner/ManageBookings.jsx`)
- Fetches owner's bookings
- Update booking status (approve/reject/complete)
- Filter bookings by status

### Components Connected to Backend

#### Featured Section (`client/src/components/FeaturedSection.jsx`)
- Displays featured cars on homepage
- Fetches first 6 available cars

#### Login Component (`client/src/components/Login.jsx`)
- Already integrated with Redux
- Handles login and registration

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGE_PUBLIC_KEY=your_imagekit_public_key
IMAGE_PRIVATE_KEY=your_imagekit_private_key
IMAGE_URL_ENDPOINT=your_imagekit_url
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=USD
```

## Authentication Flow

1. User logs in via Login component
2. Backend returns JWT token
3. Token stored in localStorage
4. API service automatically includes token in requests
5. Protected routes verify token via middleware

## Data Models

### Car Model
```javascript
{
  owner: ObjectId,
  brand: String,
  model: String,
  year: Number,
  category: String,
  seating_capacity: Number,
  fuel_type: String,
  pricePerDay: Number,
  transmission: String,
  image: String,
  location: String,
  description: String,
  isAvailable: Boolean
}
```

### Booking Model
```javascript
{
  car: ObjectId,
  user: ObjectId,
  owner: ObjectId,
  pickupDate: Date,
  returnDate: Date,
  totalAmount: Number,
  status: String (pending/completed/cancelled),
  price: Number
}
```

## Running the Application

### Start Backend
```bash
cd server
npm install
npm start
```

### Start Frontend
```bash
cd client
npm install
npm run dev
```

## Testing the Integration

1. Register a new user
2. Browse available cars
3. Book a car
4. View bookings in "My Bookings"
5. Change role to owner (via API or database)
6. Add cars as owner
7. Manage bookings as owner

## Notes

- All protected routes require authentication token
- Image uploads use ImageKit for storage
- Booking availability is checked before creation
- Owner can only manage their own cars and bookings
