import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MapPin, Train, Users, Compass } from 'lucide-react';
import { getStationList, findNearestStation } from '../data/stations';
import StatusBadge from '../components/StatusBadge';
import { useGeolocation } from '../hooks/useGeolocation';

export default function StationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedStations, setDisplayedStations] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const stations = getStationList();
  const { latitude, longitude, loading } = useGeolocation();
  
  // Initial sort by nearest station when location is available
  useEffect(() => {
    if (!loading && latitude && longitude) {
      sortStationsByDistance();
    } else {
      setDisplayedStations(stations);
    }
  }, [latitude, longitude, loading]);
  
  // Filter stations when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      if (latitude && longitude) {
        sortStationsByDistance();
      } else {
        setDisplayedStations(stations);
      }
      return;
    }
    
    setIsSearching(true);
    
    const filteredStations = stations.filter(station => 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setDisplayedStations(filteredStations);
    setIsSearching(false);
  }, [searchQuery]);
  
  const sortStationsByDistance = () => {
    if (!latitude || !longitude) return;
    
    const stationsWithDistance = [...stations].map(station => {
      if (station.coordinates) {
        const distance = calculateDistance(
          latitude,
          longitude,
          station.coordinates.latitude,
          station.coordinates.longitude
        );
        return { ...station, distance };
      }
      return { ...station, distance: Infinity };
    });
    
    stationsWithDistance.sort((a, b) => a.distance - b.distance);
    setDisplayedStations(stationsWithDistance);
  };
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };
  
  const formatDistance = (distance?: number): string => {
    if (!distance || distance === Infinity) return '';
    if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
    return `${distance.toFixed(1)} km`;
  };
  
  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4">Select Station</h1>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for stations..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Station List */}
      <div className="space-y-3">
        {isSearching ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Searching...</p>
          </div>
        ) : (
          displayedStations.map(station => (
            <Link key={station.id} to={`/station/${station.id}`} className="block">
              <div className="card border border-transparent hover:border-[var(--primary-light)]">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold">{station.name}</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{station.city}, {station.state}</span>
                      {station.distance && station.distance !== Infinity && (
                        <span className="ml-2 inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          <Compass size={10} className="mr-1" />
                          {formatDistance(station.distance)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Heart 
                    size={20} 
                    className={station.isFavorite ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-gray-300'} 
                  />
                </div>
                
                <div className="flex justify-between mt-3 text-sm">
                  <div className="flex items-center">
                    <Train size={14} className="mr-1 text-gray-500" />
                    <span>{station.platforms.length} Platforms</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-gray-500" />
                    <StatusBadge type={station.crowdLevel}>
                      {station.crowdLevel === 'low' ? 'Not Crowded' : 
                       station.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
        
        {!isSearching && displayedStations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No stations found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
 