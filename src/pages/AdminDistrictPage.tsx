import  { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Users, Train, CreditCard, ArrowLeft, ArrowRight, AlertTriangle, Eye, BarChart3, Edit3 } from 'lucide-react';
import { getStationList } from '../data/stations';

export default function AdminDistrictPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState<any>({});
  const [stationsInDistrict, setStationsInDistrict] = useState<any[]>([]);

  // Sample district data
  const mockDistrict = {
    id: 'chennai',
    name: 'Chennai District',
    state: 'Tamil Nadu',
    stationIds: ['chennai-central', 'egmore'],
    totalPassengers: 85421,
    totalTrains: 143,
    ticketsSold: 29875,
    revenue: 8345625,
    alerts: [
      { id: 1, type: 'critical', message: 'Power outage at Chennai Central, backup generators active', time: '5 minutes ago' },
      { id: 2, type: 'warning', message: 'Train 12658 Chennai-Bengaluru Mail delayed by 20 minutes', time: '15 minutes ago' },
      { id: 3, type: 'info', message: 'Platform 4 maintenance scheduled from 14:00 to 16:00', time: '1 hour ago' }
    ],
    admins: [
      { id: 1, name: 'Rajesh Kumar', role: 'masterAdmin', email: 'rajesh@railways.in', phone: '+91 98765 43210' },
      { id: 2, name: 'Priya Singh', role: 'admin', email: 'priya@railways.in', phone: '+91 87654 32109' },
      { id: 4, name: 'Sunita Patel', role: 'admin', email: 'sunita@railways.in', phone: '+91 65432 10987' }
    ]
  };

  useEffect(() => {
    // Check if user is logged in and has admin privileges
    const role = sessionStorage.getItem('userRole');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    setUserRole(role);
    
    // Redirect non-admin users
    if (!isLoggedIn || (role !== 'admin' && role !== 'masterAdmin')) {
      navigate('/auth');
      return;
    }
    
    // Get stations for this district
    const allStations = getStationList();
    const districtStations = allStations.filter(station => 
      mockDistrict.stationIds.includes(station.id)
    );
    
    setStationsInDistrict(districtStations);
    setDistrictData(mockDistrict);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading district data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <div className="flex items-center mb-4">
        <Link to="/admin" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">{districtData.name}</h1>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        District overview and management for {districtData.state}
      </p>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Users size={20} className="text-blue-600" />
            </div>
            <div className="text-lg font-bold">{districtData.totalPassengers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Daily Passengers</div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <Train size={20} className="text-purple-600" />
            </div>
            <div className="text-lg font-bold">{districtData.totalTrains}</div>
            <div className="text-xs text-gray-600">Total Trains</div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CreditCard size={20} className="text-green-600" />
            </div>
            <div className="text-lg font-bold">{districtData.ticketsSold.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Tickets Sold Today</div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <BarChart3 size={20} className="text-yellow-600" />
            </div>
            <div className="text-lg font-bold">₹{(districtData.revenue / 100000).toFixed(1)}L</div>
            <div className="text-xs text-gray-600">Daily Revenue</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card mb-6">
        <h2 className="font-semibold mb-4">District Alerts</h2>
        
        <div className="space-y-3">
          {districtData.alerts.map((alert: any) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg text-sm flex items-start ${
                alert.type === 'critical' 
                  ? 'bg-red-50 border border-red-100'
                  : alert.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-100'
                    : 'bg-blue-50 border border-blue-100'
              }`}
            >
              <AlertTriangle 
                size={16} 
                className={`mr-2 mt-0.5 ${
                  alert.type === 'critical' 
                    ? 'text-red-600'
                    : alert.type === 'warning'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                }`} 
              />
              <div className="flex-1">
                <p className={`font-medium ${
                  alert.type === 'critical' 
                    ? 'text-red-800'
                    : alert.type === 'warning'
                      ? 'text-yellow-800'
                      : 'text-blue-800'
                }`}>
                  {alert.message}
                </p>
                <p className={`text-xs mt-1 ${
                  alert.type === 'critical' 
                    ? 'text-red-600'
                    : alert.type === 'warning'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                }`}>
                  {alert.time}
                </p>
              </div>
            </div>
          ))}
          
          <button className="btn w-full mt-2 bg-gray-100">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Stations */}
      <div className="card mb-6">
        <h2 className="font-semibold mb-4">Stations In District</h2>
        
        <div className="space-y-3">
          {stationsInDistrict.map(station => (
            <Link 
              key={station.id} 
              to={`/admin/station/${station.id}`}
              className="flex justify-between items-center p-3 border border-gray-100 hover:border-[var(--primary)]/20 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{station.name}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{station.code}</span>
                  <span className="mx-2">•</span>
                  <span>{station.platforms.length} Platforms</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center text-xs rounded-full px-2 py-0.5 ${
                    station.crowdLevel === 'low' ? 'bg-green-100 text-green-800' : 
                    station.crowdLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    <Users size={12} className="mr-1" />
                    {station.crowdLevel === 'low' ? 'Low Crowd' : 
                     station.crowdLevel === 'medium' ? 'Moderate Crowd' : 
                     'High Crowd'}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-[var(--primary-light)]/10 p-2 rounded-lg text-[var(--primary)]">
                  <Eye size={16} />
                </button>
                <button className="bg-[var(--primary-light)]/10 p-2 rounded-lg text-[var(--primary)]">
                  <Edit3 size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Administrators */}
      <div className="card">
        <h2 className="font-semibold mb-4">District Administrators</h2>
        
        <div className="space-y-3">
          {districtData.admins.map((admin: any) => (
            <div key={admin.id} className="border border-gray-100 rounded-lg p-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{admin.name}</h3>
                  <p className="text-xs text-[var(--primary)]">{
                    admin.role === 'masterAdmin' ? 'Master Admin' : 'Station Admin'
                  }</p>
                  <p className="text-xs text-gray-500 mt-1">{admin.email} • {admin.phone}</p>
                </div>
                <button className="bg-[var(--primary-light)]/10 p-2 rounded-lg text-[var(--primary)]">
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {userRole === 'masterAdmin' && (
            <button className="btn w-full bg-[var(--primary)] text-white mt-2">
              Manage Administrators
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
 