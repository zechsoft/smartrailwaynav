import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Users, Train, Clock, Package, RotateCw, Filter, Search, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has admin privileges
    const role = sessionStorage.getItem('userRole');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    setUserRole(role);
    setLoading(false);
    
    // Redirect non-admin users
    if (!isLoggedIn || (role !== 'admin' && role !== 'masterAdmin')) {
      navigate('/auth');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-sm text-gray-600 mb-4">
        {userRole === 'masterAdmin' 
          ? 'Master Administrator Control Panel' 
          : 'Station Administrator Dashboard'}
      </p>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Users size={20} className="text-blue-600" />
            </div>
            <div className="text-xl font-bold">1,245</div>
            <div className="text-xs text-gray-600">Current Passengers</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <Train size={20} className="text-purple-600" />
            </div>
            <div className="text-xl font-bold">32</div>
            <div className="text-xs text-gray-600">Active Trains</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CreditCard size={20} className="text-green-600" />
            </div>
            <div className="text-xl font-bold">3,892</div>
            <div className="text-xs text-gray-600">Tickets Booked Today</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div className="text-xl font-bold">98.2%</div>
            <div className="text-xs text-gray-600">On-Time Performance</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search stations, trains, or tickets..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>
        
        <div className="flex mt-2 justify-between">
          <button className="flex items-center text-sm text-gray-600">
            <Filter size={14} className="mr-1" />
            <span>Filter</span>
          </button>
          <button className="flex items-center text-sm text-[var(--primary)]">
            <RotateCw size={14} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card mb-4 border-l-4 border-l-[var(--warning)]">
        <h2 className="font-semibold mb-3 flex items-center">
          <AlertTriangle size={18} className="mr-2 text-[var(--warning)]" />
          Recent Alerts
        </h2>
        
        <div className="space-y-2">
          <div className="p-2 bg-red-50 rounded-lg text-sm border border-red-100">
            <div className="font-medium text-red-800">Train 12658 Delayed</div>
            <p className="text-red-700 text-xs">Chennai-Bengaluru Mail is delayed by 20 minutes</p>
          </div>
          
          <div className="p-2 bg-yellow-50 rounded-lg text-sm border border-yellow-100">
            <div className="font-medium text-yellow-800">Platform 4 Maintenance</div>
            <p className="text-yellow-700 text-xs">Scheduled maintenance from 14:00 to 16:00</p>
          </div>
          
          <div className="p-2 bg-blue-50 rounded-lg text-sm border border-blue-100">
            <div className="font-medium text-blue-800">Crowd Alert</div>
            <p className="text-blue-700 text-xs">Heavy crowding reported at Central Concourse</p>
          </div>
        </div>
        
        <button className="mt-3 text-sm text-[var(--primary)] flex items-center">
          <span>View all alerts</span>
          <ArrowRight size={14} className="ml-1" />
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Today's Schedule</h2>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">24 trains</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between p-2 border-l-4 border-l-green-500 bg-green-50 rounded-r-lg">
            <div>
              <div className="font-medium">Chennai Express (12243)</div>
              <div className="text-xs text-gray-600">Platform 1 • Departs 15:00</div>
            </div>
            <div className="text-green-700 text-sm font-medium">On Time</div>
          </div>
          
          <div className="flex justify-between p-2 border-l-4 border-l-red-500 bg-red-50 rounded-r-lg">
            <div>
              <div className="font-medium">Bengaluru Mail (12658)</div>
              <div className="text-xs text-gray-600">Platform 2 • Departs 16:15</div>
            </div>
            <div className="text-red-700 text-sm font-medium">Delayed 20m</div>
          </div>
          
          <div className="flex justify-between p-2 border-l-4 border-l-green-500 bg-green-50 rounded-r-lg">
            <div>
              <div className="font-medium">Howrah Mail (12839)</div>
              <div className="text-xs text-gray-600">Platform 4 • Departs 17:00</div>
            </div>
            <div className="text-green-700 text-sm font-medium">On Time</div>
          </div>
        </div>
        
        <button className="mt-3 text-sm text-[var(--primary)] flex items-center">
          <span>View full schedule</span>
          <ArrowRight size={14} className="ml-1" />
        </button>
      </div>

      {/* Management Tools */}
      <div className="card">
        <h2 className="font-semibold mb-3">Management Tools</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-[var(--primary)]/5 rounded-lg flex flex-col items-center">
            <Users size={24} className="text-[var(--primary)] mb-2" />
            <span className="text-sm">Staff Management</span>
          </button>
          
          <button className="p-3 bg-[var(--primary)]/5 rounded-lg flex flex-col items-center">
            <Train size={24} className="text-[var(--primary)] mb-2" />
            <span className="text-sm">Train Operations</span>
          </button>
          
          <button className="p-3 bg-[var(--primary)]/5 rounded-lg flex flex-col items-center">
            <Package size={24} className="text-[var(--primary)] mb-2" />
            <span className="text-sm">Inventory</span>
          </button>
          
          <button className="p-3 bg-[var(--primary)]/5 rounded-lg flex flex-col items-center">
            <CreditCard size={24} className="text-[var(--primary)] mb-2" />
            <span className="text-sm">Ticket Reports</span>
          </button>
        </div>
        
        {userRole === 'masterAdmin' && (
          <div className="mt-4 p-3 bg-[var(--secondary)]/10 rounded-lg">
            <h3 className="font-medium text-[var(--secondary)] mb-2">Master Admin Controls</h3>
            <div className="text-sm text-gray-600 mb-3">
              Access advanced system controls and multi-station management tools
            </div>
            <button className="w-full py-2 bg-[var(--secondary)] text-white rounded-lg text-sm">
              Open System Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
 