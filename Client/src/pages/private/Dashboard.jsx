import React from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Profile Info</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user?.name}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">User ID:</span> {user?.id}</p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Logins:</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between">
              <span>Last Login:</span>
              <span className="font-medium">Today</span>
            </div>
            <div className="flex justify-between">
              <span>Account Status:</span>
              <span className="font-medium text-green-500">Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              📝 Update Profile
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              🔒 Change Password  
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              📊 View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Successfully logged in</span>
            </div>
            <span className="text-sm text-gray-500">Just now</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Profile updated</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Password changed</span>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;