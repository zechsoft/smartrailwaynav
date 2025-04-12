import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Clock3, Train, MapPin, QrCode, AlertTriangle, Info, RotateCw, Compass } from 'lucide-react';
import { getStationList, findNearestStation } from '../data/stations';
import TrainCard from '../components/TrainCard';
import { useGeolocation } from '../hooks/useGeolocation';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);
  const [nearestStation, setNearestStation] = useState<any>(null);
  
  const stations = getStationList();
  const favoriteStations = stations.filter(station => station.isFavorite);
  const chennaiCentral = stations.find(station => station.id === 'chennai-central');
  
  const { latitude, longitude, error, loading } = useGeolocation();
  
  // Find the nearest station when location is available
  useEffect(() => {
    if (!loading && latitude && longitude) {
      const closest = findNearestStation(latitude, longitude);
      if (closest) {
        setNearestStation(closest);
      }
    }
    if (!loading) {
      setLocationPermissionAsked(true);
    }
  }, [latitude, longitude, loading]);
  
  return (
    <div className="p-4 animate-fade-in">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for stations or services..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Hero Image */}
      <div className="relative rounded-xl overflow-hidden mb-4 h-40 md:h-48">
        <img 
          src="https://images.unsplash.com/photo-1572853738843-815896e16e9d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMGNoZW5uYWklMjBjZW50cmFsJTIwcGxhdGZvcm18ZW58MHx8fHwxNzQzNTkxNzAzfDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
          alt="Chennai Beach Sunrise" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold mb-1">Indian Railways Guide</h2>
            <p className="text-sm">Your personal assistant for hassle-free train travel</p>
          </div>
        </div>
      </div>
      
      {/* Nearest Station (shows when location is detected) */}
      {nearestStation && (
        <div className="card mb-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-light)]/10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold flex items-center">
              <Compass size={18} className="mr-2 text-[var(--primary)]" />
              Nearest Station
            </h2>
            <span className="text-xs bg-[var(--primary-light)]/20 px-2 py-1 rounded-full">Based on your location</span>
          </div>
          
          <Link 
            to={`/station/${nearestStation.id}`}
            className="block p-3 bg-white rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{nearestStation.name}</div>
                <div className="text-xs text-gray-500">{nearestStation.city}, {nearestStation.state}</div>
              </div>
              <ArrowRight size={16} className="text-[var(--primary)]" />
            </div>
          </Link>
        </div>
      )}
      
      {/* Location Permission Request */}
      {!nearestStation && !error && !locationPermissionAsked && (
        <div className="card mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-start">
            <div className="mr-3 mt-1 p-2 rounded-full bg-blue-100">
              <MapPin size={18} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Enable Location</h3>
              <p className="text-sm text-gray-600 mt-1">Allow location access to find the nearest railway station to you</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="card mb-4">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link to="/stations" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 transition-colors">
            <Train className="text-[var(--primary)]" size={24} />
            <span className="text-xs mt-1">Stations</span>
          </Link>
          <Link to="/scan" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 transition-colors">
            <QrCode className="text-[var(--primary)]" size={24} />
            <span className="text-xs mt-1">Scan QR</span>
          </Link>
          <Link to="/emergency" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--danger)]/10 hover:bg-[var(--danger)]/20 transition-colors">
            <AlertTriangle className="text-[var(--danger)]" size={24} />
            <span className="text-xs mt-1">Emergency</span>
          </Link>
          <Link to="/info" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 transition-colors">
            <Info className="text-[var(--primary)]" size={24} />
            <span className="text-xs mt-1">Train Info</span>
          </Link>
          <Link to="/station/chennai-central" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 transition-colors">
            <MapPin className="text-[var(--primary)]" size={24} />
            <span className="text-xs mt-1">Platform Guide</span>
          </Link>
          <Link to="/ticket-booking" className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 transition-colors">
            <CreditCard className="text-[var(--primary)]" size={24} />
            <span className="text-xs mt-1">Book Ticket</span>
          </Link>
        </div>
      </div>
      
      {/* Featured Station */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Featured Station</h2>
          <Link to={`/station/chennai-central`} className="text-sm text-[var(--primary)]">
            View Details
          </Link>
        </div>
        <div className="relative rounded-lg overflow-hidden h-40">
          <img 
            src="https://images.unsplash.com/photo-1580754385168-62e52be3ed9f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMHBsYXRmb3JtfGVufDB8fHx8MTc0MzU3NTg5NHww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
            alt="Chennai Central Railway Station Platform" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30 flex items-end">
            <div className="p-3 text-white w-full">
              <h3 className="font-bold text-lg">Chennai Central</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm">12 Platforms</span>
                <div className="bg-[var(--primary)]/80 text-white text-xs px-2 py-0.5 rounded-full">
                  Major Junction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Stations */}
      {favoriteStations.length > 0 && (
        <div className="card mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Favorite Stations</h2>
            <button className="text-[var(--primary)]">
              <RotateCw size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {favoriteStations.map(station => (
              <Link 
                key={station.id} 
                to={`/station/${station.id}`}
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{station.name}</div>
                    <div className="text-xs text-gray-500">{station.city}, {station.state}</div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Live Updates */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Live Updates</h2>
          <div className="flex items-center text-xs">
            <Clock size={12} className="mr-1" />
            <span>Real-time</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {chennaiCentral && chennaiCentral.platforms.map(platform => 
            platform.currentTrain && <TrainCard key={platform.number} train={platform.currentTrain} />
          )}
        </div>
      </div>
    </div>
  );
}

// Added missing component import
const CreditCard = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
 