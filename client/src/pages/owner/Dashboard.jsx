import React, { useEffect, useState } from 'react';
import { FaCar, FaCalendarCheck, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { ownerAPI } from '../../services/api';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await ownerAPI.getDashboardData();
      if (response.data.success) {
        setDashboardData(response.data.dashboardData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Cars</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{dashboardData?.totalCars || 0}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <FaCar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{dashboardData?.totalBookings || 0}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <FaCalendarCheck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{dashboardData?.pendingBookings || 0}</h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
              <FaClock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">₹{dashboardData?.monthlyRevenue || 0}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <FaMoneyBillWave size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData?.recentBookings?.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-md object-cover" src={booking.car.image} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{booking.car.name}</div>
                        <div className="text-sm text-gray-500">{booking.car.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.user.name}</div>
                    <div className="text-sm text-gray-500">{booking.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.pickupDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {new Date(booking.returnDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{booking.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!dashboardData?.recentBookings || dashboardData.recentBookings.length === 0) && (
            <div className="p-6 text-center text-gray-500">
              No recent bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
