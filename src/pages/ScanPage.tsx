import  { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Mic, AlertCircle, X, List, MapPin, User, Clock, HelpCircle, Compass, Play, Square } from 'lucide-react';
import { getStation, findNearestStation } from '../data/stations';
import { useGeolocation } from '../hooks/useGeolocation';
import NearbyStationBanner from '../components/NearbyStationBanner';

export default function ScanPage() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannedStation, setScannedStation] = useState<string | null>(null);
  const [showAmenitySelection, setShowAmenitySelection] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nearestStation, setNearestStation] = useState<any>(null);
  const [voiceText, setVoiceText] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [audioRanges, setAudioRanges] = useState([10, 15, 20, 15, 10]);
  
  const { latitude, longitude, loading } = useGeolocation();
  
  // Get nearest station when location is available
  useEffect(() => {
    if (!loading && latitude && longitude) {
      const closest = findNearestStation(latitude, longitude);
      if (closest) {
        setNearestStation(closest);
      }
    }
  }, [latitude, longitude, loading]);
  
  useEffect(() => {
    if (isListening) {
      // Simulate voice animation
      const interval = setInterval(() => {
        setAudioRanges(prev => prev.map(() => Math.floor(Math.random() * 40 + 10)));
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isListening]);
  
  // Setup camera for QR scanning
  const startCamera = async () => {
    if (!videoRef.current) return;
    
    try {
      const constraints = {
        video: { facingMode: 'environment' }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraActive(true);
      setScanning(true);
      
      // Simulate finding a QR code after 3 seconds
      setTimeout(() => {
        mockScanQR('chennai-central');
      }, 3000);
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check permissions or try another device.');
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setScanning(false);
  };
  
  // Mock QR scanning functionality
  const mockScanQR = (stationId: string) => {
    setScanning(true);
    
    // Simulate QR code scan with a delay
    setTimeout(() => {
      stopCamera();
      setScanning(false);
      setScannedStation(stationId);
      setShowAmenitySelection(true);
    }, 1500);
  };
  
  const startVoiceRecognition = () => {
    setIsListening(true);
    setVoiceText('');
    
    // Simulate voice input
    const phrases = [
      'Listening...',
      'Searching for stations...',
      'Looking for Chennai Central...',
      'Found Chennai Central Station'
    ];
    
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < phrases.length) {
        setVoiceText(phrases[idx]);
        idx++;
      } else {
        clearInterval(interval);
        setIsListening(false);
        
        // Simulate finding station
        setTimeout(() => {
          mockScanQR('chennai-central');
        }, 500);
      }
    }, 800);
  };
  
  const navigateToAmenity = (stationId: string, amenityType: string) => {
    // Find the route ID for the specific amenity type
    let routeId = '';
    
    switch (amenityType) {
      case 'ticket':
        routeId = `${stationId}-ticket`;
        break;
      case 'platform':
        routeId = `${stationId}-platform`;
        break;
      case 'waiting':
        routeId = `${stationId}-waiting`;
        break;
      case 'washroom':
        routeId = `${stationId}-washroom`;
        break;
      default:
        routeId = `${stationId}-ticket`;
    }
    
    navigate(`/navigation/${stationId}/${routeId}`);
  };

  const navigateToAmenityDetail = (stationId: string, amenityId: string) => {
    navigate(`/station/${stationId}/amenity/${amenityId}`);
  };
  
  const closeSelectionModal = () => {
    setShowAmenitySelection(false);
    setScannedStation(null);
  };
  
  const goToStationInfo = (stationId: string) => {
    navigate(`/station/${stationId}`);
  };
  
  // Get station data for the amenity selection
  const stationData = scannedStation ? getStation(scannedStation) : null;
  
  return (
    <div className="p-4 animate-fade-in relative">
      <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
      
      {/* Nearby Station Banner (If location is available) */}
      {nearestStation && (
        <NearbyStationBanner station={nearestStation} />
      )}
      
      {/* QR Scanner */}
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Scan Station QR Code</h2>
        <div className="relative">
          {cameraActive ? (
            <div className="bg-black h-64 rounded-lg flex flex-col items-center justify-center mb-3 relative overflow-hidden">
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
              />
              {scanning && (
                <div className="absolute inset-0">
                  <div className="w-full h-1 bg-[var(--primary)] animate-[scan_2s_ease-in-out_infinite] z-10"></div>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-40 h-40 border-2 border-white relative">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white"></div>
                </div>
              </div>
              <button 
                className="absolute bottom-4 right-4 z-30 bg-white p-2 rounded-full"
                onClick={stopCamera}
              >
                <X size={20} />
              </button>
            </div>
          ) : scanning ? (
            <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center mb-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5">
                <div className="w-full h-1 bg-[var(--primary)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
              <QrCode size={48} className="text-[var(--primary)] mb-3" />
              <p className="text-sm">Scanning QR code...</p>
            </div>
          ) : (
            <div 
              className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center mb-3 relative overflow-hidden cursor-pointer"
              onClick={startCamera}
            >
              <img 
                src="https://images.unsplash.com/photo-1514250609276-c577268ef8fb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxRUiUyMGNvZGUlMjB0cmFpbiUyMHN0YXRpb258ZW58MHx8fHwxNzQzNTc2NDYxfDA&ixlib=rb-4.0.3&fit=fillmax&h=400&w=400" 
                alt="QR code scanner view"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              <div className="z-10 flex flex-col items-center">
                <div className="w-40 h-40 border-2 border-[var(--primary)] relative">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]"></div>
                </div>
                <p className="text-sm mt-4 text-center bg-black/40 text-white px-4 py-1 rounded-full">
                  Tap to scan
                </p>
              </div>
              
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          )}
          <p className="text-xs text-gray-500 mb-3 flex items-start">
            <AlertCircle size={14} className="mr-1 mt-0.5 text-[var(--warning)]" />
            <span>Make sure the QR code is well-lit and clearly visible</span>
          </p>
        </div>
      </div>
      
      {/* Demo Buttons */}
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Quick Test Stations</h2>
        <div className="space-y-2">
          <button 
            className="btn btn-primary w-full"
            onClick={() => mockScanQR('chennai-central')}
          >
            <span>Chennai Central</span>
          </button>
          <button 
            className="btn btn-primary w-full"
            onClick={() => mockScanQR('central')}
          >
            <span>Mumbai Central</span>
          </button>
          <button 
            className="btn btn-primary w-full"
            onClick={() => mockScanQR('southern')}
          >
            <span>Southern Station</span>
          </button>
          <button 
            className="btn btn-primary w-full"
            onClick={() => mockScanQR('egmore')}
          >
            <span>Chennai Egmore</span>
          </button>
        </div>
      </div>
      
      {/* Voice Navigation */}
      <div className="card">
        <h2 className="font-medium mb-3">Voice Navigation</h2>
        <button 
          className="btn w-full flex items-center justify-center bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-white"
          onClick={startVoiceRecognition}
          disabled={isListening}
        >
          {isListening ? <Square size={18} /> : <Mic size={18} />}
          <span>{isListening ? 'Stop Listening' : 'Start Voice Guidance'}</span>
        </button>
        
        {isListening && (
          <>
            <div className="flex justify-center mt-3 space-x-1 h-10 items-end">
              {audioRanges.map((height, i) => (
                <div 
                  key={i}
                  className="w-2 bg-gradient-to-t from-[var(--primary)] to-[var(--success)]"
                  style={{ height: `${height}px` }}
                ></div>
              ))}
            </div>
            
            <div className="mt-2 text-center font-medium text-[var(--primary)] text-sm">
              {voiceText || "Listening..."}
            </div>
          </>
        )}
        
        <p className="text-xs text-gray-500 mt-3">
          Try saying "Take me to Central Station" or "Find the nearest washroom"
        </p>
      </div>
      
      {/* Amenity Selection Modal */}
      {showAmenitySelection && stationData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full max-h-[80vh] overflow-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="font-bold text-lg">{stationData.name}</h2>
              <button 
                onClick={closeSelectionModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Select where you want to navigate to:
              </p>
              
              <div className="space-y-2">
                <button 
                  className="btn w-full justify-between bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 text-gray-800"
                  onClick={() => navigateToAmenityDetail(stationData.id, 'a2')}
                >
                  <span className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-2">
                      <List size={16} className="text-[var(--primary)]" />
                    </div>
                    Ticket Counter
                  </span>
                  <MapPin size={16} className="text-[var(--primary)]" />
                </button>
                
                <button 
                  className="btn w-full justify-between bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 text-gray-800"
                  onClick={() => navigateToAmenity(stationData.id, 'platform')}
                >
                  <span className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-2">
                      <QrCode size={16} className="text-[var(--primary)]" />
                    </div>
                    Platforms
                  </span>
                  <MapPin size={16} className="text-[var(--primary)]" />
                </button>
                
                <button 
                  className="btn w-full justify-between bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 text-gray-800"
                  onClick={() => navigateToAmenityDetail(stationData.id, 'a3')}
                >
                  <span className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-2">
                      <Clock size={16} className="text-[var(--primary)]" />
                    </div>
                    Waiting Rooms
                  </span>
                  <MapPin size={16} className="text-[var(--primary)]" />
                </button>
                
                <button 
                  className="btn w-full justify-between bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 text-gray-800"
                  onClick={() => navigateToAmenityDetail(stationData.id, 'a1')}
                >
                  <span className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-2">
                      <User size={16} className="text-[var(--primary)]" />
                    </div>
                    Washrooms
                  </span>
                  <MapPin size={16} className="text-[var(--primary)]" />
                </button>
                
                {/* All amenities from data */}
                {stationData.amenities.slice(4, 7).map(amenity => (
                  <button 
                    key={amenity.id}
                    className="btn w-full justify-between bg-[var(--primary-light)]/10 hover:bg-[var(--primary-light)]/20 text-gray-800"
                    onClick={() => navigateToAmenityDetail(stationData.id, amenity.id)}
                  >
                    <span className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-2">
                        <HelpCircle size={16} className="text-[var(--primary)]" />
                      </div>
                      {amenity.name}
                    </span>
                    <MapPin size={16} className="text-[var(--primary)]" />
                  </button>
                ))}
                
                <div className="border-t my-3 pt-3">
                  <button 
                    className="btn w-full bg-[var(--primary)] text-white"
                    onClick={() => goToStationInfo(stationData.id)}
                  >
                    <span>View Station Information</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 