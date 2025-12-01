# Quick Reference Guide

## Start the Application

### Backend
```bash
cd server
npm start
```
**Runs on**: http://localhost:3000

### Frontend
```bash
cd client
npm run dev
```
**Runs on**: http://localhost:5173

## API Service Usage

### Import the API service
```javascript
import { userAPI, carAPI, ownerAPI, bookingAPI } from '../services/api';
```

### User APIs
```javascript
// Register
await userAPI.register({ name, email, password });

// Login
await userAPI.login({ email, password });

// Get user data
await userAPI.getUserData();
```

### Car APIs
```javascript
// Get all available cars
const response = await carAPI.getAllCars();
const cars = response.data.cars;
```

### Owner APIs
```javascript
// Get owner's cars
await ownerAPI.getCars();

// Add car (with FormData)
const formData = new FormData();
formData.append('image', imageFile);
formData.append('carData', JSON.stringify(carData));
await ownerAPI.addCar(formData);

// Toggle availability
await ownerAPI.toggleCarAvailability(carId);

// Delete car
await ownerAPI.deleteCar(carId);

// Get dashboard data
await ownerAPI.getDashboardData();
```

### Booking APIs
```javascript
// Create booking
await bookingAPI.createBooking({
  carId,
  pickupDate,
  returnDate
});

// Get user bookings
await bookingAPI.getUserBookings();

// Get owner bookings
await bookingAPI.getOwnerBookings();

// Change booking status
await bookingAPI.changeBookingStatus(bookingId, status);
```

## Redux Auth State

### Access user state
```javascript
import { useSelector } from 'react-redux';

const { user, loading, error } = useSelector((state) => state.auth);
```

### Logout
```javascript
import { useDispatch } from 'react-redux';
import { logout } from '../redux/Slices/AuthSlice';

const dispatch = useDispatch();
dispatch(logout());
```

## Common Patterns

### Protected Page
```javascript
const { user } = useSelector((state) => state.auth);
const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    navigate('/');
  }
}, [user]);
```

### Fetch Data on Mount
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await carAPI.getAllCars();
    if (response.data.success) {
      setData(response.data.cars);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

### Form Submission
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await bookingAPI.createBooking(data);
    if (response.data.success) {
      alert('Success!');
      navigate('/success-page');
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Error occurred');
  } finally {
    setLoading(false);
  }
};
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
IMAGE_PUBLIC_KEY=your_key
IMAGE_PRIVATE_KEY=your_key
IMAGE_URL_ENDPOINT=your_endpoint
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=USD
```

## File Structure

```
client/src/
├── services/
│   └── api.js              # Centralized API service
├── redux/
│   ├── store.js
│   └── Slices/
│       └── AuthSlice.js    # Auth state management
├── pages/
│   ├── Cars.jsx            # Browse cars
│   ├── CarDetails.jsx      # Car details & booking
│   ├── MyBookings.jsx      # User bookings
│   ├── Home.jsx
│   └── owner/
│       ├── Dashboard.jsx   # Owner dashboard
│       ├── AddCar.jsx      # Add new car
│       ├── ManageCars.jsx  # Manage cars
│       └── ManageBookings.jsx # Manage bookings
└── components/
    ├── Login.jsx           # Login/Register
    ├── NavBar.jsx          # Navigation
    ├── CarCard.jsx         # Car display card
    └── FeaturedSection.jsx # Homepage featured cars
```

## Common Issues & Solutions

### "Token not found" error
- User not logged in
- Token expired
- Check localStorage for 'token' key

### Cars not loading
- Backend not running
- Check VITE_BACKEND_URL in .env
- Check browser console for errors

### Booking creation fails
- User not authenticated
- Car not available
- Invalid dates selected

### Image upload fails
- Check ImageKit credentials
- Verify file size/type
- Check multer middleware

## Testing Flow

1. **Register/Login** → Get token
2. **Browse Cars** → View available cars
3. **Car Details** → Select dates
4. **Book Car** → Create booking
5. **My Bookings** → View booking
6. **Owner Dashboard** → View stats
7. **Add Car** → List new car
8. **Manage Bookings** → Approve/reject

## API Response Format

### Success Response
```javascript
{
  success: true,
  data: { ... },
  message: "Operation successful"
}
```

### Error Response
```javascript
{
  success: false,
  message: "Error message"
}
```

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint
```

## Support

For issues or questions:
1. Check console for errors
2. Verify environment variables
3. Check API responses in Network tab
4. Review TESTING_CHECKLIST.md
5. See API_INTEGRATION.md for details
