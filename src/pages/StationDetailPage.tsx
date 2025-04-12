import  { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Users, Train, Clock, MapPin, Navigation, Download, CreditCard } from 'lucide-react';
import { getStation, getRoutes } from '../data/stations';
import AmenityCard from '../components/AmenityCard';
import TrainCard from '../components/TrainCard';
import TicketQueueCard from '../components/TicketQueueCard';
import NavigationMap from '../components/NavigationMap';
import StatusBadge from '../components/StatusBadge';

export default function StationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const station = getStation(id || '');
  const routes = getRoutes(id || '');
  const [isFavorite, setIsFavorite] = useState(station?.isFavorite || false);
  const [activeTab, setActiveTab] = useState<'amenities' | 'trains' | 'tickets'>('amenities');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  if (!station) {
    return (
      <div className="p-4 text-center">
        <p>Station not found</p>
        <Link to="/stations" className="btn btn-primary mt-4">Back to Stations</Link>
      </div>
    );
  }
  
  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Get header image based on station
  const getStationImage = () => {
    if (id === 'chennai-central') {
      return "https://images.unsplash.com/photo-1580754385168-62e52be3ed9f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMHBsYXRmb3JtfGVufDB8fHx8MTc0MzU3NTg5NHww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
    }
    return "https://images.unsplash.com/photo-1556276845-78962e2783f5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMHBsYXRmb3JtfGVufDB8fHx8MTc0MzU3NTg5NHww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800";
  };
  
  return (
    <div className="animate-fade-in">
      {/* Station Header */}
      <div className="relative">
        <img 
          src={getStationImage()} 
          alt={station.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{station.name}</h1>
              <div className="flex items-center text-sm">
                <MapPin size={12} className="mr-1" />
                <span>{station.city}, {station.state}</span>
              </div>
              <div className="flex items-center text-sm mt-1">
                <Train size={12} className="mr-1" />
                <span>Station Code: {station.code}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-white"
            >
              <Heart size={24} className={isFavorite ? 'fill-[var(--accent)]' : ''} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <Users size={16} className="mr-1" />
          <StatusBadge type={station.crowdLevel}>
            {station.crowdLevel === 'low' ? 'Not Crowded' : 
             station.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
          </StatusBadge>
        </div>
        <div className="flex items-center">
          <Train size={16} className="mr-1" />
          <span className="text-sm">
            Next: {station.platforms[0]?.currentTrain?.departureTime || 'N/A'}
          </span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">Live</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 flex space-x-3">
        <Link 
          to={`/navigation/${id}/${routes[0]?.id || ''}`}
          className="flex-1 btn btn-primary"
        >
          <Navigation size={18} />
          <span>Navigate</span>
        </Link>
        
        <Link 
          to="/ticket-booking"
          className="flex-1 btn bg-[var(--secondary)] text-white"
        >
          <CreditCard size={18} />
          <span>Book Tickets</span>
        </Link>
      </div>
      
      {/* Navigation Cards */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Quick Navigation</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {routes.map(route => (
            <Link 
              key={route.id}
              to={`/navigation/${id}/${route.id}`}
              className="card bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary-light)]/10 hover:from-[var(--primary)]/20 hover:to-[var(--primary-light)]/20 border border-[var(--primary-light)]/20"
            >
              <div className="flex flex-col items-center text-center">
                <Navigation size={24} className="text-[var(--primary)] mb-2" />
                <h3 className="font-medium">{route.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{route.estimatedTime} • {route.difficulty}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'amenities' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('amenities')}
          >
            Amenities
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'trains' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('trains')}
          >
            Trains
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'tickets' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tickets')}
          >
            Ticket Counters
          </button>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Amenities */}
          {activeTab === 'amenities' && (
            <div className="space-y-3">
              {station.amenities.map(amenity => (
                <AmenityCard key={amenity.id} amenity={amenity} stationId={station.id} />
              ))}
            </div>
          )}
          
          {/* Trains */}
          {activeTab === 'trains' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Current Trains</h3>
                <div className="space-y-3">
                  {station.platforms.map(platform => 
                    platform.currentTrain && (
                      <TrainCard key={platform.number} train={platform.currentTrain} />
                    )
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Upcoming Trains</h3>
                <div className="space-y-3">
                  {station.upcomingTrains.map(train => (
                    <TrainCard key={train.number} train={train} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Ticket Counters */}
          {activeTab === 'tickets' && (
            <div className="space-y-3">
              {station.ticketCounters.map(counter => (
                <TicketQueueCard key={counter.name} counter={counter} />
              ))}
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  Skip the Lines
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Book your tickets online and avoid waiting in queues
                </p>
                <Link to="/ticket-booking" className="btn btn-primary w-full">
                  Book Tickets Online
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Station Map */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Station Map</h2>
          {routes.length > 0 && (
            <NavigationMap waypoints={routes[0].waypoints} title="Interactive Station Map" />
          )}
          
          <div className="mt-4">
            <button 
              className="btn btn-primary w-full flex justify-center items-center" 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download size={18} />
              <span>Download Offline Map (2.4 MB)</span>
            </button>
            
            {isDownloading && (
              <div className="mt-2">
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[var(--primary)] h-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">{downloadProgress}% complete</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 