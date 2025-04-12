import  { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Volume2, Clock, Info, Camera, Map } from 'lucide-react';
import { getStation } from '../data/stations';
import NavigationMap from '../components/NavigationMap';

export default function AmenityDetailPage() {
  const { stationId, amenityId } = useParams<{ stationId: string, amenityId: string }>();
  const navigate = useNavigate();
  const station = getStation(stationId || '');
  
  if (!station) {
    return (
      <div className="p-4 text-center">
        <p>Station not found</p>
        <Link to="/stations" className="btn btn-primary mt-4">Back to Stations</Link>
      </div>
    );
  }
  
  // Find the amenity in the station data
  const amenity = station.amenities.find(a => a.id === amenityId);
  
  if (!amenity) {
    return (
      <div className="p-4 text-center">
        <p>Amenity not found</p>
        <Link to={`/station/${stationId}`} className="btn btn-primary mt-4">Back to Station</Link>
      </div>
    );
  }
  
  // Find the closest route for navigation
  const findNavigationRoute = () => {
    // This is a simplified logic - in a real app, you'd have specific routes for each amenity
    let routeType = '';
    
    if (amenity.name.toLowerCase().includes('ticket')) {
      routeType = 'ticket';
    } else if (amenity.name.toLowerCase().includes('platform')) {
      routeType = 'platform';
    } else if (amenity.name.toLowerCase().includes('wait')) {
      routeType = 'waiting';
    } else if (amenity.name.toLowerCase().includes('wash')) {
      routeType = 'washroom';
    } else {
      routeType = 'ticket'; // Default fallback
    }
    
    return `${stationId}-${routeType}`;
  };
  
  const handleNavigate = () => {
    const routeId = findNavigationRoute();
    navigate(`/navigation/${stationId}/${routeId}`);
  };
  
  const handleARNavigate = () => {
    const routeId = findNavigationRoute();
    navigate(`/ar-navigation/${stationId}/${routeId}`);
  };
  
  const handleVoiceNavigate = () => {
    // In a real app, this would initiate voice guidance
    alert('Voice navigation starting...');
    const routeId = findNavigationRoute();
    navigate(`/navigation/${stationId}/${routeId}`);
  };

  // Determine image based on amenity type
  const getAmenityImage = () => {
    const type = amenity.name.toLowerCase();
    
    if (type.includes('ticket')) {
      return "https://images.unsplash.com/photo-1580809361436-42a7ec5c8315?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjByYWlsd2F5JTIwdGlja2V0JTIwY291bnRlcnxlbnwwfHx8fDE3NDM1ODk5NzB8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    } else if (type.includes('wait')) {
      return "https://images.unsplash.com/photo-1469132477008-b5de82df867c?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwd2FpdGluZyUyMHJvb218ZW58MHx8fHwxNzQzNTg5OTk4fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    } else if (type.includes('wash')) {
      return "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB3YXNocm9vbXxlbnwwfHx8fDE3NDM1OTAwMzF8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    } else if (type.includes('food')) {
      return "https://images.unsplash.com/photo-1515670589140-0b299eb4546e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY291cnR8ZW58MHx8fHwxNzQzNTkwMDQ5fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    } else if (type.includes('platform')) {
      return "https://images.unsplash.com/photo-1580754385168-62e52be3ed9f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMHBsYXRmb3JtfGVufDB8fHx8MTc0MzU3NTg5NHww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    } else {
      return "https://images.unsplash.com/photo-1556276521-5d97a68009d3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMHBsYXRmb3JtfGVufDB8fHx8MTc0MzU3NTg5NHww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    }
  };
  
  return (
    <div className="animate-fade-in">
      {/* Amenity Header */}
      <div className="relative">
        <img 
          src={getAmenityImage()} 
          alt={amenity.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <Link to={`/station/${stationId}`} className="bg-black/30 p-2 rounded-full text-white">
            <ArrowLeft size={20} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h1 className="text-2xl font-bold">{amenity.name}</h1>
          <div className="flex items-center text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{amenity.location}</span>
          </div>
        </div>
      </div>
      
      {/* Status Section */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className={`w-3 h-3 rounded-full ${
                amenity.crowdLevel === 'low' ? 'bg-green-500' : 
                amenity.crowdLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
              } mr-2`}
            ></div>
            <span className="text-sm font-medium">
              {amenity.crowdLevel === 'low' ? 'Not Crowded' : 
               amenity.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Updated {amenity.lastUpdated}
          </div>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-4">
        <div className="card mb-4">
          <h2 className="font-semibold mb-2">Details</h2>
          <p className="text-gray-700">{amenity.details}</p>
          
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-start">
              <Info size={16} className="text-gray-500 mt-0.5 mr-2" />
              <div className="text-sm text-gray-600">
                <p>Located at <span className="font-medium">{amenity.location}</span> in {station.name}</p>
                <p className="mt-1">Station Code: <span className="font-medium">{station.code}</span></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Options */}
        <div className="card mb-4">
          <h2 className="font-semibold mb-3">Navigation Options</h2>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button 
              className="flex flex-col items-center bg-[var(--primary-light)]/10 p-3 rounded-lg"
              onClick={handleNavigate}
            >
              <Navigation size={24} className="text-[var(--primary)] mb-1" />
              <span className="text-xs">Map</span>
            </button>
            <button 
              className="flex flex-col items-center bg-[var(--primary-light)]/10 p-3 rounded-lg"
              onClick={handleARNavigate}
            >
              <Camera size={24} className="text-[var(--primary)] mb-1" />
              <span className="text-xs">AR View</span>
            </button>
            <button 
              className="flex flex-col items-center bg-[var(--primary-light)]/10 p-3 rounded-lg"
              onClick={handleVoiceNavigate}
            >
              <Volume2 size={24} className="text-[var(--primary)] mb-1" />
              <span className="text-xs">Voice</span>
            </button>
          </div>
          
          <button 
            className="btn btn-primary w-full"
            onClick={handleNavigate}
          >
            <Navigation size={18} />
            <span>Navigate to {amenity.name}</span>
          </button>
        </div>
        
        {/* Estimated Distance */}
        <div className="card mb-4">
          <h2 className="font-semibold mb-3">Estimated Travel</h2>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Clock size={16} className="text-gray-500 mr-2" />
              <span>2-3 minutes</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <span>~100 meters</span>
            </div>
          </div>
        </div>
        
        {/* Preview Map */}
        <div className="card mb-4">
          <h2 className="font-semibold mb-3">Location Preview</h2>
          
          {/* This is a simplified map - in a real app, it would show the actual location */}
          <NavigationMap 
            waypoints={[
              { x: 30, y: 30, label: 'You are here' },
              { x: 70, y: 60, label: amenity.name }
            ]} 
            title={`Path to ${amenity.name}`}
            isDetailed={false}
          />
          
          <div className="mt-4 flex space-x-2">
            <button 
              className="btn flex-1 bg-gray-100"
              onClick={() => navigate(`/station/${stationId}`)}
            >
              <Map size={16} />
              <span>Back to Station</span>
            </button>
            <button 
              className="btn btn-primary flex-1"
              onClick={handleNavigate}
            >
              <Navigation size={16} />
              <span>Start Navigation</span>
            </button>
          </div>
        </div>
        
        {/* Images */}
        <div className="card">
          <h2 className="font-semibold mb-3">Photos</h2>
          <div className="grid grid-cols-2 gap-2">
            <img 
              src={getAmenityImage()} 
              alt={amenity.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <img 
              src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/f4c39a1e-ad04-4139-6bfb-081af2445600/public" 
              alt={`${amenity.name} at ${station.name}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
 