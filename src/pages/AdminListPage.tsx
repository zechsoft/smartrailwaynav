import  { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Plus, Edit3, User, Shield, MapPin, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { getStationList } from '../data/stations';

export default function AdminListPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stations, setStations] = useState<any[]>([]);
  const [filteredStations, setFilteredStations] = useState<any[]>([]);
  const [adminList, setAdminList] = useState<any[]>([]);
  const navigate = useNavigate();

  // Sample admin data
  const mockAdmins = [
    { id: 1, name: 'Rajesh Kumar', role: 'masterAdmin', district: 'Chennai', stations: ['chennai-central', 'egmore'], email: 'rajesh@railways.in', phone: '+91 98765 43210', status: 'active' },
    { id: 2, name: 'Priya Singh', role: 'admin', district: 'Chennai', stations: ['chennai-central'], email: 'priya@railways.in', phone: '+91 87654 32109', status: 'active' },
    { id: 3, name: 'Amit Sharma', role: 'admin', district: 'Mumbai', stations: ['central'], email: 'amit@railways.in', phone: '+91 76543 21098', status: 'active' },
    { id: 4, name: 'Sunita Patel', role: 'admin', district: 'Chennai', stations: ['egmore'], email: 'sunita@railways.in', phone: '+91 65432 10987', status: 'inactive' },
    { id: 5, name: 'Deepak Verma', role: 'masterAdmin', district: 'Mumbai', stations: ['central', 'southern'], email: 'deepak@railways.in', phone: '+91 54321 09876', status: 'active' }
  ];

  useEffect(() => {
    // Check if user is logged in and has admin privileges
    const role = sessionStorage.getItem('userRole');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    setUserRole(role);
    setLoading(false);
    
    // Redirect non-admin users
    if (!isLoggedIn || (role !== 'admin' && role !== 'masterAdmin')) {
      navigate('/auth');
      return;
    }
    
    // Get station list
    const allStations = getStationList();
    setStations(allStations);
    setFilteredStations(allStations);
    
    // Set admin list
    setAdminList(mockAdmins);
  }, [navigate]);
  
  // Filter stations based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredStations(stations);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = stations.filter(station => 
      station.name.toLowerCase().includes(query) ||
      station.code.toLowerCase().includes(query) ||
      station.city.toLowerCase().includes(query) ||
      station.state.toLowerCase().includes(query)
    );
    
    setFilteredStations(filtered);
  }, [searchQuery, stations]);
  
  // Filter admins based on search
  const getFilteredAdmins = () => {
    if (!searchQuery) return adminList;
    
    const query = searchQuery.toLowerCase();
    return adminList.filter(admin => 
      admin.name.toLowerCase().includes(query) ||
      admin.district.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query)
    );
  };
  
  // Get station name from ID
  const getStationName = (stationId: string) => {
    const station = stations.find(s => s.id === stationId);
    return station ? station.name : stationId;
  };
  
  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-2">Admin Management</h1>
      <p className="text-sm text-gray-600 mb-4">
        {userRole === 'masterAdmin' 
          ? 'Manage all administrators and stations' 
          : 'View station administrators'}
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search admins or stations..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Admin List */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Administrators</h2>
          {userRole === 'masterAdmin' && (
            <button className="btn bg-[var(--primary-light)]/10 text-[var(--primary)]">
              <Plus size={16} />
              <span>Add Admin</span>
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {getFilteredAdmins().map(admin => (
            <div key={admin.id} className="border border-gray-100 hover:border-[var(--primary)]/20 rounded-lg p-3">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mr-3">
                    {admin.role === 'masterAdmin' ? <Shield size={18} /> : <User size={18} />}
                  </div>
                  <div>
                    <h3 className="font-medium">{admin.name}</h3>
                    <p className="text-xs text-gray-500">{admin.email} • {admin.phone}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center text-xs rounded-full px-2 py-0.5 ${
                        admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-xs text-[var(--primary)]">{
                        admin.role === 'masterAdmin' ? 'Master Admin' : 'Station Admin'
                      }</span>
                    </div>
                  </div>
                </div>
                {userRole === 'masterAdmin' && (
                  <div>
                    <button className="bg-[var(--primary-light)]/10 p-2 rounded-lg text-[var(--primary)]">
                      <Edit3 size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <MapPin size={14} className="text-gray-500 mr-1" />
                  <span className="text-sm font-medium">{admin.district} District</span>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Manages:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {admin.stations.map((stationId: string) => (
                      <Link 
                        key={stationId} 
                        to={`/admin/station/${stationId}`}
                        className="inline-flex items-center text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1"
                      >
                        <Train size={12} className="mr-1" />
                        {getStationName(stationId)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stations List */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Stations</h2>
          {userRole === 'masterAdmin' && (
            <button className="btn bg-[var(--primary-light)]/10 text-[var(--primary)]">
              <Plus size={16} />
              <span>Add Station</span>
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {filteredStations.map(station => (
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
                  <span>{station.city}, {station.state}</span>
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
                  <span className="mx-2">•</span>
                  <span className="text-xs text-gray-500">{station.platforms.length} Platforms</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
 