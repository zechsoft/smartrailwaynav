import  { Link } from 'react-router-dom';
import { Compass, Map } from 'lucide-react';
import { Station } from '../types';

interface NearbyStationBannerProps {
  station: Station;
  distance?: number;
}

export default function NearbyStationBanner({ station, distance }: NearbyStationBannerProps) {
  const formatDistance = (distance?: number): string => {
    if (!distance || distance === Infinity) return '';
    if (distance < 1) return `${(distance * 1000).toFixed(0)}m away`;
    return `${distance.toFixed(1)}km away`;
  };
  
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
      <div className="flex items-start">
        <div className="mt-1 p-2 rounded-full bg-blue-100 mr-3">
          <Compass size={18} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Nearby Station</h3>
          <p className="text-sm text-blue-700 mt-1">
            <span className="font-medium">{station.name}</span>
            {distance && <span> • {formatDistance(distance)}</span>}
          </p>
          
          <div className="mt-3 flex space-x-2">
            <Link 
              to={`/station/${station.id}`} 
              className="btn text-xs bg-blue-600 text-white flex-1"
            >
              View Details
            </Link>
            <Link 
              to={`/navigation/${station.id}/${station.id}-ticket`}
              className="btn text-xs bg-white border border-blue-200 flex items-center justify-center"
            >
              <Map size={14} className="mr-1" />
              <span>Navigate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
 