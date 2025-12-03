# 🚗 Car Rental Application

A full-stack car rental platform built with React, Node.js, Express, and MongoDB. Users can browse and book cars, while owners can list and manage their vehicles.

## ✨ Features

### For Users
- 🔐 User authentication (Register/Login)
- 🚙 Browse available cars
- 🔍 Search and filter cars
- 📅 Book cars with date selection
- 📋 View booking history
- 💳 Booking management

### For Owners
- 📊 Dashboard with statistics
- ➕ Add new cars with image upload
- ✏️ Manage car listings
- 🔄 Toggle car availability
- 🗑️ Delete cars
- 📦 View and manage bookings
- ✅ Approve/reject booking requests
- ✔️ Mark bookings as complete

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **ImageKit** - Image storage
- **Multer** - File upload

## 📁 Project Structure

```
car-rental/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── services/      # API service layer
│   │   └── assets/        # Static assets
│   └── .env               # Frontend environment variables
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── configs/          # Configuration files
│   └── .env              # Backend environment variables
│
└── Documentation/
    ├── API_INTEGRATION.md
    ├── SETUP_GUIDE.md
    ├── ARCHITECTURE.md
    ├── TESTING_CHECKLIST.md
    ├── TROUBLESHOOTING.md
    └── QUICK_REFERENCE.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- ImageKit account (for image storage)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd car-rental
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
```

4. **Configure environment variables**

Backend (`server/.env`):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGE_PUBLIC_KEY=your_imagekit_public_key
IMAGE_PRIVATE_KEY=your_imagekit_private_key
IMAGE_URL_ENDPOINT=your_imagekit_url
PORT=3000
```

Frontend (`client/.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=USD
```

5. **Start the application**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

6. **Access the application**
- Frontend: https://car-rental-flame-xi.vercel.app/
- Backend: https://carrental-sjyq.onrender.com

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation and setup instructions
- **[API Integration](API_INTEGRATION.md)** - Complete API documentation
- **[Architecture](ARCHITECTURE.md)** - System architecture and data flow
- **[Quick Reference](QUICK_REFERENCE.md)** - Common patterns and code snippets
- **[Testing Checklist](TESTING_CHECKLIST.md)** - Comprehensive testing guide
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions

## 🔑 Key Features Implementation

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token injection in API requests
- Protected routes on both frontend and backend

### Car Management
- Image upload with ImageKit
- CRUD operations for cars
- Availability toggle
- Owner-specific car listings

### Booking System
- Date-based availability checking
- Automatic price calculation
- Booking status management (pending/confirmed/completed/cancelled)
- Conflict prevention for overlapping bookings

### Dashboard
- Real-time statistics
- Revenue tracking
- Recent bookings display
- Owner-specific data filtering

## 🔐 API Endpoints

### User Routes
```
POST   /api/user/register      - Register new user
POST   /api/user/login         - Login user
GET    /api/user/data          - Get user data (protected)
```

### Car Routes
```
GET    /api/owner/all-cars     - Get all available cars (public)
GET    /api/owner/cars         - Get owner's cars (protected)
POST   /api/owner/add-car      - Add new car (protected)
POST   /api/owner/toggle-car   - Toggle availability (protected)
POST   /api/owner/delete-car   - Delete car (protected)
```

### Booking Routes
```
POST   /api/booking/create-booking        - Create booking (protected)
GET    /api/booking/user-bookings         - Get user bookings (protected)
GET    /api/booking/owner-bookings        - Get owner bookings (protected)
POST   /api/booking/change-booking-status - Update status (protected)
POST   /api/booking/check-availability    - Check car availability
```

### Owner Routes
```
POST   /api/owner/change-role      - Change to owner role (protected)
GET    /api/owner/dashboard-data   - Get dashboard stats (protected)
POST   /api/owner/update-image     - Update profile image (protected)
```

## 🧪 Testing

Run through the [Testing Checklist](TESTING_CHECKLIST.md) to verify all features work correctly.

### Quick Test Flow
1. Register a new user
2. Browse available cars
3. Book a car
4. View booking in "My Bookings"
5. Change role to owner (via database)
6. Add a new car
7. Manage bookings as owner

## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

### Quick Fixes
- Backend not connecting? Check MongoDB URI
- Frontend errors? Verify VITE_BACKEND_URL
- Authentication issues? Clear localStorage and re-login
- Images not uploading? Check ImageKit credentials

## 📦 Dependencies

### Frontend
- react, react-dom
- @reduxjs/toolkit, react-redux
- react-router-dom
- axios
- tailwindcss
- react-icons

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- multer
- imagekit

## 🔄 Data Flow

```
User Action → Component → API Service → Backend Route → 
Controller → Database → Response → Component State → UI Update
```

## 🏗️ Architecture Highlights

- **Centralized API Service**: Single source for all API calls
- **Redux State Management**: Centralized auth state
- **Protected Routes**: Both frontend and backend protection
- **Automatic Token Injection**: Via axios interceptors
- **Error Handling**: Consistent error handling across app
- **Loading States**: User feedback during async operations

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway/Render)
```bash
cd server
# Set environment variables in platform
# Deploy with Node.js buildpack
```

### Database
- MongoDB Atlas (already cloud-hosted)
- Ensure IP whitelist includes deployment server

## 📝 Environment Variables

### Required Backend Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `IMAGE_PUBLIC_KEY` - ImageKit public key
- `IMAGE_PRIVATE_KEY` - ImageKit private key
- `IMAGE_URL_ENDPOINT` - ImageKit URL endpoint

### Required Frontend Variables
- `VITE_BACKEND_URL` - Backend API URL
- `VITE_CURRENCY` - Currency symbol (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- ImageKit for image storage
- All open-source contributors

## 📞 Support

For issues or questions:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [API_INTEGRATION.md](API_INTEGRATION.md)
3. Open an issue on GitHub

## 🎯 Future Enhancements

- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Car reviews and ratings
- [ ] Real-time availability updates
- [ ] Mobile app
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode

## 📊 Project Status

✅ **Completed**: Full frontend-backend integration
✅ **Completed**: User authentication
✅ **Completed**: Car management
✅ **Completed**: Booking system
✅ **Completed**: Owner dashboard

---

**Happy Coding! 🚗💨**
