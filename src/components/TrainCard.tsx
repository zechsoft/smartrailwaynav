import  { Train } from '../types';
import StatusBadge from './StatusBadge';
import { Clock, MapPin } from 'lucide-react';

interface TrainCardProps {
  train: Train;
}

export default function TrainCard({ train }: TrainCardProps) {
  const isDelayed = train.status.toLowerCase().includes('delay');
  
  return (
    <div className="card border-l-4 border-l-[var(--primary)] hover:border-l-[var(--accent)]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-[var(--primary)]">{train.number}</h3>
          <div className="font-medium">{train.name}</div>
        </div>
        {train.platform && (
          <StatusBadge type={isDelayed ? 'delay' : 'ontime'}>
            {isDelayed ? train.status : 'On Time'}
          </StatusBadge>
        )}
      </div>
      
      <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>Platform {train.platform}</span>
          </div>
          {train.departureTime ? (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>Departs: {train.departureTime}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>Arrives: {train.arrivalTime}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <span>Next: {train.destination}</span>
          <span className="text-xs opacity-70">Updated {train.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
 