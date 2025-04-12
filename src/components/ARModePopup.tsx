import  { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Map } from 'lucide-react';

interface ARModePopupProps {
  stationId: string;
  routeId: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function ARModePopup({ stationId, routeId, onClose, children }: ARModePopupProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-sm w-full animate-fade-in">
        <div className="p-4 bg-[var(--primary)] text-white rounded-t-xl">
          <h2 className="font-bold text-lg">AR Navigation Available</h2>
          <p className="text-sm opacity-90">Experience real-time directions in your surroundings</p>
        </div>
        
        <div className="p-4">
          <img 
            src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/68d1fd5a-0dcc-49c3-30dc-d44c4662a600/public" 
            alt="AR Navigation Preview" 
            className="w-full rounded-lg mb-4 border"
          />
          
          {children}
          
          <div className="space-y-2 mt-4">
            <Link 
              to={`/ar-navigation/${stationId}/${routeId}`} 
              className="btn btn-primary w-full"
            >
              <Camera size={18} />
              <span>Start AR Navigation</span>
            </Link>
            
            <button 
              className="btn w-full bg-gray-100 text-gray-800"
              onClick={onClose}
            >
              <Map size={18} />
              <span>Continue with Map View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 