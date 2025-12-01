import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { ownerAPI } from '../../services/api';

export const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    year: new Date().getFullYear(),
    category: 'Sedan',
    pricePerDay: '',
    transmission: 'Manual',
    fuel_type: 'Petrol',
    seating_capacity: 4,
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('image', image);
      data.append('carData', JSON.stringify(formData));

      const response = await ownerAPI.addCar(data);

      if (response.data.success) {
        alert('Car added successfully');
        navigate('/owner/manage-cars');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
        <p className="mt-2 text-sm text-gray-600">List your car for rent and start earning.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column - Car Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Car Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="e.g. Toyota"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="e.g. Camry"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="2024"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="50"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="e.g. New York"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                  <select
                    name="seating_capacity"
                    value={formData.seating_capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                  >
                    {[2, 4, 5, 7, 8].map(num => (
                      <option key={num} value={num}>{num} Seater</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tell us more about your car..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Car Image</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="car-image"
                />
                <label htmlFor="car-image" className="cursor-pointer flex flex-col items-center justify-center h-full min-h-[300px]">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <img src={assets.upload_icon} alt="Upload" className="w-8 h-8 opacity-60" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Car Image</h3>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </label>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Tips for great photos</h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Use good lighting</li>
                  <li>Show the entire car</li>
                  <li>Avoid blurry images</li>
                  <li>Clean the car before taking photos</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/owner/manage-cars')}
              className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Listing Car...
                </span>
              ) : 'List Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
