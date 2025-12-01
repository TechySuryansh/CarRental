import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User APIs
export const userAPI = {
  register: (userData) => api.post('/api/user/register', userData),
  login: (userData) => api.post('/api/user/login', userData),
  getUserData: () => api.get('/api/user/data'),
};

// Car APIs
export const carAPI = {
  getAllCars: () => api.get('/api/owner/all-cars'),
  getCarById: (id) => api.get(`/api/owner/cars/${id}`),
};

// Owner APIs
export const ownerAPI = {
  changeRole: () => api.post('/api/owner/change-role'),
  addCar: (formData) => {
    return axios.post(`${API_URL}/api/owner/add-car`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCars: () => api.get('/api/owner/cars'),
  toggleCarAvailability: (carId) => api.post('/api/owner/toggle-car', { carId }),
  deleteCar: (carId) => api.post('/api/owner/delete-car', { carId }),
  getDashboardData: () => api.get('/api/owner/dashboard-data'),
  updateImage: (formData) => {
    return axios.post(`${API_URL}/api/owner/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Booking APIs
export const bookingAPI = {
  checkAvailability: (data) => api.post('/api/booking/check-availability', data),
  createBooking: (bookingData) => api.post('/api/booking/create-booking', bookingData),
  getUserBookings: () => api.get('/api/booking/user-bookings'),
  getOwnerBookings: () => api.get('/api/booking/owner-bookings'),
  changeBookingStatus: (bookingId, status) => 
    api.post('/api/booking/change-booking-status', { bookingId, status }),
};

export default api;
