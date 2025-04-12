import  { Amenity } from '../types';
import StatusBadge from './StatusBadge';
import { HelpCircle, User, CreditCard, Clock, Package, Coffee, Info, MapPin, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AmenityCardProps {
  amenity: Amenity;
  stationId: string;
}

export default function AmenityCard({ amenity, stationId }: AmenityCardProps) {
  // Map icon string to Lucide component
  const getIcon = () => {
    switch (amenity.icon) {
      case 'User': return <User size={20} />;
      case 'CreditCard': return <CreditCard size={20} />;
      case 'Clock': return <Clock size={20} />;
      case 'Package': return <Package size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'Info': return <Info size={20} />;
      case 'MapPin': return <MapPin size={20} />;
      case 'Droplet': return <Droplet size={20} />;
      default: return <HelpCircle size={20} />;
    }
  };
  
  return (
    <Link to={`/station/${stationId}/amenity/${amenity.id}`}>
      <div className="card hover:border-[var(--primary-light)] border border-transparent">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[var(--primary-light)]/10 p-2 text-[var(--primary)]">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{amenity.name}</h3>
            <div className="text-sm text-gray-600 mt-1">{amenity.location}</div>
            <div className="flex mt-2 justify-between items-center">
              <StatusBadge type={amenity.crowdLevel}>
                {amenity.crowdLevel === 'low' ? 'Not Crowded' : 
                amenity.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
              </StatusBadge>
              <div className="text-xs text-gray-500">{amenity.lastUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
 