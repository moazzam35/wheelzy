'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching user data
    setUserData({
      name: 'John Doe',
      email: 'user@example.com',
      membership: 'Premium',
      joinDate: '2024-01-15',
    });

    // Simulate recent orders
    setRecentOrders([
      { id: 1, car: 'Tesla Model S', date: '2024-03-10', status: 'Delivered', price: '$89,990' },
      { id: 2, car: 'BMW M3', date: '2024-02-28', status: 'In Transit', price: '$72,500' },
      { id: 3, car: 'Porsche 911', date: '2024-01-20', status: 'Processing', price: '$115,000' },
    ]);
  }, []);

  const stats = [
    { name: 'Total Orders', value: '12', change: '+2', changeType: 'positive' },
    { name: 'Favorites', value: '8', change: '+1', changeType: 'positive' },
    { name: 'Test Drives', value: '3', change: '0', changeType: 'neutral' },
    { name: 'Messages', value: '5', change: '-2', changeType: 'negative' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {userData?.name || 'User'}! Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">{stat.value.charAt(0)}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : stat.changeType === 'negative'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Account Information
              </h3>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userData?.name || 'Loading...'}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userData?.email || 'Loading...'}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Membership</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {userData?.membership || 'Standard'}
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Member since</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userData?.joinDate || 'Loading...'}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6 flex space-x-3">
                <Link
                  href="/user/profile"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/user/settings"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Account Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Orders
              </h3>
              <div className="mt-5">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Car
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {order.car}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'In Transit'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {order.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/user/orders"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div>
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Quick Actions
              </h3>
              <div className="mt-5 space-y-4">
                <Link
                  href="/cars"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Cars
                </Link>
                <Link
                  href="/sell"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Sell Your Car
                </Link>
                <Link
                  href="/testdrive"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Schedule Test Drive
                </Link>
                <Link
                  href="/financing"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Check Financing
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Route Structure Demo
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600">
                  This is the user dashboard route at:
                </p>
                <code className="block text-xs bg-gray-100 p-2 rounded">
                  app/(user)/dashboard/page.js
                </code>
                <p className="text-sm text-gray-600 mt-4">
                  Other user routes:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• /user/profile</li>
                  <li>• /user/orders</li>
                  <li>• /user/favorites</li>
                  <li>• /user/settings</li>
                  <li>• /user/messages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}