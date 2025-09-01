"use client"

import { Overview } from './_components/dashboard';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 space-y-6 p-8 pt-24">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">Welcome to your Asthra management dashboard</p>
          </div>
        </div>

        {/* Overview Cards - Main Content */}
        <div className="max-w-7xl mx-auto">
          <Overview />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
