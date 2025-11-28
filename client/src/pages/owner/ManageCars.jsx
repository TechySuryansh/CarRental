import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/owner/cars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCars(response.data.cars);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (carId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/owner/toggle-car',
        { carId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCars();
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/owner/delete-car',
        { carId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Car deleted successfully');
        fetchCars();
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Cars</h1>
        <a href="/owner/add-car" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Car
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                  ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {car.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{car.brand} {car.name}</h3>
                  <p className="text-sm text-gray-500">{car.transmission} • {car.fuelType}</p>
                </div>
                <p className="text-blue-600 font-bold">₹{car.pricePerDay}/day</p>
              </div>

              <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleToggleAvailability(car._id)}
                  className={`flex items-center gap-2 text-sm font-medium 
                    ${car.isAvailable ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-gray-600'}`}
                >
                  {car.isAvailable ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                  {car.isAvailable ? 'Active' : 'Inactive'}
                </button>

                <button
                  onClick={() => handleDeleteCar(car._id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete Car"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No cars listed yet.</p>
          <a href="/owner/add-car" className="text-blue-600 hover:underline mt-2 inline-block">
            List your first car
          </a>
        </div>
      )}
    </div>
  );
};

export default ManageCars;