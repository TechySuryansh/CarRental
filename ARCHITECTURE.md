# Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Redux)                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Public     │  │     User     │  │    Owner     │     │
│  │    Pages     │  │    Pages     │  │    Pages     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │  API Service    │                        │
│                  │  (axios)        │                        │
│                  └────────┬────────┘                        │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │  Redux Store    │                        │
│                  │  (Auth State)   │                        │
│                  └─────────────────┘                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                         BACKEND                              │
│                    (Node.js + Express)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Routes    │  │ Controllers  │  │  Middleware  │     │
│  │              │  │              │  │              │     │
│  │ - User       │  │ - User       │  │ - Auth       │     │
│  │ - Owner      │  │ - Owner      │  │ - Multer     │     │
│  │ - Booking    │  │ - Booking    │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │     Models      │                        │
│                  │                 │                        │
│                  │ - User          │                        │
│                  │ - Car           │                        │
│                  │ - Booking       │                        │
│                  └────────┬────────┘                        │
└───────────────────────────┼─────────────────────────────────┘
                            │
                    MongoDB Connection
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                        DATABASE                              │
│                      (MongoDB Atlas)                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Users     │  │     Cars     │  │   Bookings   │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User Action (Login)
    │
    ▼
Login Component
    │
    ▼
Redux Action (loginUser)
    │
    ▼
API Service (userAPI.login)
    │
    ▼
Backend (/api/user/login)
    │
    ▼
User Controller (loginUser)
    │
    ▼
MongoDB (User Collection)
    │
    ▼
JWT Token Generated
    │
    ▼
Response to Frontend
    │
    ▼
Redux State Updated
    │
    ▼
Token Stored in localStorage
    │
    ▼
User Logged In
```

### 2. Car Browsing Flow

```
User Visits /cars
    │
    ▼
Cars Component Mounts
    │
    ▼
useEffect Hook
    │
    ▼
API Service (carAPI.getAllCars)
    │
    ▼
Backend (/api/owner/all-cars)
    │
    ▼
Owner Controller (getAllAvailableCars)
    │
    ▼
MongoDB (Car Collection)
    │
    ▼
Filter: isAvailable = true
    │
    ▼
Response with Cars Array
    │
    ▼
Component State Updated
    │
    ▼
Cars Rendered in UI
```

### 3. Booking Creation Flow

```
User Selects Dates
    │
    ▼
Clicks "Book Now"
    │
    ▼
Form Validation
    │
    ▼
Check Authentication
    │
    ▼
API Service (bookingAPI.createBooking)
    │
    ▼
Backend (/api/booking/create-booking)
    │
    ▼
Auth Middleware (verify token)
    │
    ▼
Booking Controller (createBooking)
    │
    ▼
Check Car Availability
    │
    ▼
Calculate Price
    │
    ▼
Create Booking in MongoDB
    │
    ▼
Response with Booking Data
    │
    ▼
Navigate to My Bookings
```

### 4. Owner Dashboard Flow

```
Owner Visits /owner
    │
    ▼
Dashboard Component Mounts
    │
    ▼
API Service (ownerAPI.getDashboardData)
    │
    ▼
Backend (/api/owner/dashboard-data)
    │
    ▼
Auth Middleware (verify token)
    │
    ▼
Owner Controller (getDashboardData)
    │
    ▼
MongoDB Queries:
    - Count Cars
    - Count Bookings
    - Calculate Revenue
    - Get Recent Bookings
    │
    ▼
Response with Dashboard Data
    │
    ▼
Component State Updated
    │
    ▼
Statistics Rendered
```

## Component Hierarchy

```
App
├── NavBar
│   ├── Login Modal
│   └── Menu Links
│
├── Routes
│   ├── Home
│   │   ├── Hero
│   │   ├── FeaturedSection (API: carAPI.getAllCars)
│   │   ├── Banner
│   │   ├── Testimonial
│   │   └── Newsletter
│   │
│   ├── Cars (API: carAPI.getAllCars)
│   │   └── CarCard (multiple)
│   │
│   ├── CarDetails (API: carAPI.getAllCars, bookingAPI.createBooking)
│   │   └── Booking Form
│   │
│   ├── MyBookings (API: bookingAPI.getUserBookings)
│   │   └── Booking List
│   │
│   └── Owner
│       ├── Layout
│       │   └── Sidebar
│       │
│       ├── Dashboard (API: ownerAPI.getDashboardData)
│       │   ├── Stats Cards
│       │   └── Recent Bookings Table
│       │
│       ├── AddCar (API: ownerAPI.addCar)
│       │   └── Car Form
│       │
│       ├── ManageCars (API: ownerAPI.getCars, toggleCarAvailability, deleteCar)
│       │   └── Car Cards with Actions
│       │
│       └── ManageBookings (API: bookingAPI.getOwnerBookings, changeBookingStatus)
│           └── Bookings Table
│
└── Footer
```

## API Service Architecture

```
api.js
│
├── Axios Instance
│   ├── Base URL: VITE_BACKEND_URL
│   ├── Headers: Content-Type: application/json
│   └── Interceptor: Auto-inject JWT token
│
├── userAPI
│   ├── register(userData)
│   ├── login(userData)
│   └── getUserData()
│
├── carAPI
│   ├── getAllCars()
│   └── getCarById(id)
│
├── ownerAPI
│   ├── changeRole()
│   ├── addCar(formData)
│   ├── getCars()
│   ├── toggleCarAvailability(carId)
│   ├── deleteCar(carId)
│   ├── getDashboardData()
│   └── updateImage(formData)
│
└── bookingAPI
    ├── checkAvailability(data)
    ├── createBooking(bookingData)
    ├── getUserBookings()
    ├── getOwnerBookings()
    └── changeBookingStatus(bookingId, status)
```

## Database Schema Relationships

```
┌─────────────┐
│    User     │
│             │
│ _id         │◄─────────┐
│ name        │          │
│ email       │          │
│ password    │          │
│ role        │          │
└─────────────┘          │
       ▲                 │
       │                 │
       │ owner           │ user
       │                 │
┌──────┴──────┐   ┌──────┴──────┐
│    Car      │   │   Booking   │
│             │   │             │
│ _id         │◄──┤ car         │
│ owner       │   │ user        │
│ brand       │   │ owner       │
│ model       │   │ pickupDate  │
│ pricePerDay │   │ returnDate  │
│ isAvailable │   │ price       │
│ ...         │   │ status      │
└─────────────┘   └─────────────┘
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────┐
│                    Authentication                         │
└──────────────────────────────────────────────────────────┘

1. User Login
   ├── Email + Password → Backend
   ├── Backend validates credentials
   ├── JWT token generated with user._id
   └── Token sent to frontend

2. Token Storage
   ├── Stored in localStorage
   └── Key: 'token'

3. Protected Requests
   ├── API Service reads token from localStorage
   ├── Adds to Authorization header: "Bearer <token>"
   └── Backend middleware verifies token

4. Token Verification (Backend)
   ├── Extract token from header
   ├── Verify with JWT_SECRET
   ├── Decode user._id
   ├── Fetch user from database
   └── Attach user to req.user

5. Logout
   ├── Remove token from localStorage
   ├── Clear Redux auth state
   └── Redirect to home
```

## State Management

```
Redux Store
│
└── auth
    ├── user: JWT token or null
    ├── loading: boolean
    └── error: error object or null

Actions:
├── loginUser (async thunk)
├── registerUser (async thunk)
└── logout (reducer)

Flow:
User Action → Dispatch Action → API Call → Update State → UI Re-render
```

## Security Layers

```
1. Frontend
   ├── Check user state before rendering protected pages
   ├── Redirect to home if not authenticated
   └── Hide sensitive UI elements

2. API Service
   ├── Automatically include JWT token
   └── Handle 401 errors

3. Backend Middleware
   ├── Verify JWT token
   ├── Check token expiration
   ├── Validate user exists
   └── Attach user to request

4. Controllers
   ├── Verify ownership (user can only access their data)
   ├── Check role (owner vs user)
   └── Validate input data

5. Database
   ├── Schema validation
   ├── Required fields
   └── Data types
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
└─────────────────────────────────────────────────────────┘

Frontend (Vercel/Netlify)
    │
    ├── Build: npm run build
    ├── Static files served via CDN
    └── Environment: VITE_BACKEND_URL

Backend (Heroku/Railway/Render)
    │
    ├── Node.js server
    ├── Environment variables
    └── MongoDB connection

Database (MongoDB Atlas)
    │
    ├── Cloud-hosted
    ├── Automatic backups
    └── Connection string in env

File Storage (ImageKit)
    │
    ├── Car images
    ├── User avatars
    └── CDN delivery
```

This architecture ensures:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
