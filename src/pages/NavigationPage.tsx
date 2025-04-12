import  { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Navigation, MapPin, Clock, Play, Pause, Maximize, MessageCircle, AlertTriangle, Camera, Info, Download } from 'lucide-react';
import { getStation, getRoutes } from '../data/stations';
import NavigationMap from '../components/NavigationMap';
import ARModePopup from '../components/ARModePopup';
import DetailedStationMap from '../components/DetailedStationMap';

export default function NavigationPage() {
  const { stationId, routeId } = useParams<{ stationId: string, routeId: string }>();
  const station = getStation(stationId || '');
  const routes = getRoutes(stationId || '');
  const currentRoute = routes.find(r => r.id === routeId);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showDirections, setShowDirections] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [distanceRemaining, setDistanceRemaining] = useState(100);
  const [nextDirection, setNextDirection] = useState('');
  const [showARPrompt, setShowARPrompt] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Set up initial direction based on route
  useEffect(() => {
    if (currentRoute && currentRoute.steps.length > 0) {
      setNextDirection(currentRoute.steps[0]);
    }
  }, [currentRoute]);
  
  // Handle play/pause safely
  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    } else {
      // Play with error handling
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            simulateDirections();
            simulateNavigation();
          })
          .catch(error => {
            // Auto-play was prevented or another error occurred
            console.log("Playback error:", error);
            setIsPlaying(false);
          });
      }
    }
  };
  
  // Simulate real-time navigation directions
  const simulateDirections = () => {
    // Show initial direction
    setShowDirections(true);
    
    if (!currentRoute) return;
    
    // Use actual route steps instead of hardcoded ones
    const steps = currentRoute.steps.map((step, index) => ({
      message: step,
      duration: 4000 + (index * 1000) // Increasing duration for each step
    }));
    
    let totalDelay = 0;
    
    steps.forEach((step, index) => {
      const id = setTimeout(() => {
        setCurrentStep(index);
        setNextDirection(steps[index + 1]?.message || "You have arrived at your destination!");
      }, totalDelay);
      
      totalDelay += step.duration;
      
      // Save the last timeout ID to clear it if needed
      if (index === steps.length - 1) {
        setTimeoutId(id);
      }
    });
    
    // Hide directions after all steps
    const finalId = setTimeout(() => {
      setShowDirections(false);
      setCurrentStep(0);
    }, totalDelay + 1000);
    
    setTimeoutId(finalId);
  };
  
  // Simulate distance remaining updates
  const simulateNavigation = () => {
    let distance = 100;
    const interval = setInterval(() => {
      distance -= 5;
      if (distance <= 0) {
        clearInterval(interval);
        distance = 0;
      }
      setDistanceRemaining(distance);
    }, 2000);
    
    return () => clearInterval(interval);
  };
  
  // Initialize video when VR view is shown
  useEffect(() => {
    if (showVR && videoRef.current) {
      videoRef.current.load();
    }
    
    return () => {
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
      }
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showVR, isPlaying, timeoutId]);
  
  const handleARButtonClick = () => {
    // First show the info popup about AR mode
    setShowARPrompt(true);
  };
  
  const downloadMap = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          alert('Map downloaded successfully! Available for offline use.');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  if (!station || !currentRoute) {
    return (
      <div className="p-4 text-center">
        <p>Route not found</p>
        <Link to={`/station/${stationId || ''}`} className="btn btn-primary mt-4">Back to Station</Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link to={`/station/${stationId}`} className="mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">{currentRoute.name}</h1>
        </div>
        
        <div className="card mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium">Navigation Map</h2>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{currentRoute.estimatedTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{currentRoute.difficulty}</span>
              </div>
            </div>
          </div>
          
          <NavigationMap 
            waypoints={currentRoute.waypoints} 
            title={currentRoute.name}
            isDetailed={false}
          />
          
          <div className="mt-4 flex space-x-2">
            <button 
              className="btn btn-primary flex-1"
              onClick={() => setShowVR(!showVR)}
            >
              <Navigation size={18} />
              <span>{showVR ? 'Hide 3D View' : 'Show 3D View'}</span>
            </button>
            
            <button 
              onClick={handleARButtonClick}
              className="btn bg-[var(--secondary)] text-white"
            >
              <Camera size={18} />
              <span>AR View</span>
            </button>
          </div>
        </div>
        
        {/* Current Navigation Step */}
        <div className="card mb-4 bg-[var(--primary)]/5 border border-[var(--primary)]/20">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Current Direction</h2>
            <span className="text-sm bg-[var(--primary)] text-white px-2 py-0.5 rounded-full">
              {distanceRemaining}m remaining
            </span>
          </div>
          
          <div className="mt-3 p-3 bg-white rounded-lg border border-[var(--primary)]/20">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-3 shrink-0">
                <span>{currentStep + 1}</span>
              </div>
              <div>
                <p className="font-medium">{currentRoute.steps[currentStep]}</p>
                {nextDirection && (
                  <p className="text-sm text-gray-500 mt-1">
                    Next: {nextDirection}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Steps */}
        <div className="card mb-4">
          <h2 className="font-medium mb-3">All Navigation Steps</h2>
          <div className="ml-2">
            {currentRoute.steps.map((step, index) => (
              <div key={index} className="relative pl-6 pb-5 last:pb-0">
                <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                  index === currentStep 
                    ? 'bg-[var(--primary)] ring-4 ring-[var(--primary)]/20' 
                    : index < currentStep 
                      ? 'bg-[var(--success)]' 
                      : 'bg-gray-200'
                }`}></div>
                {index < currentRoute.steps.length - 1 && (
                  <div className="absolute left-[7px] top-4 w-0.5 h-full bg-[var(--primary-light)]/30"></div>
                )}
                <p className={index === currentStep ? 'font-medium' : ''}>{step}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Offline Map Download */}
        <div className="card mb-4">
          <h2 className="font-medium mb-3">Offline Access</h2>
          
          <button 
            className="btn btn-primary w-full" 
            onClick={downloadMap}
            disabled={isDownloading}
          >
            <Download size={18} />
            <span>{isDownloading ? 'Downloading...' : 'Download Offline Map (2.4 MB)'}</span>
          </button>
          
          {isDownloading && (
            <div className="mt-3">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--primary)]"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{downloadProgress}% complete</span>
                <span>{Math.round((2.4 * downloadProgress) / 100 * 10) / 10} MB / 2.4 MB</span>
              </div>
            </div>
          )}
        </div>
        
        {/* VR Navigation */}
        {showVR && (
          <div className="card">
            <h2 className="font-medium mb-3">3D Navigation Preview</h2>
            <div className="bg-white rounded-lg mb-4 p-2">
              <DetailedStationMap 
                waypoints={currentRoute.waypoints}
                title={station.name}
                currentStep={currentStep}
              />
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                id="vr-video"
                className="w-full h-auto"
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1577086664693-894d8405334a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMG5hdmlnYXRpb24lMjBtYXAlMjAzRHxlbnwwfHx8fDE3NDM1ODg2Nzh8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-walking-through-a-train-station-1253-large.mp4" type="video/mp4" />
              </video>
              
              {/* VR Controls */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                <button 
                  className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
                  onClick={togglePlayback}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white">
                  <Maximize size={18} />
                </button>
              </div>
              
              {/* Real-time Directions */}
              {showDirections && (
                <div className="absolute top-4 left-0 right-0 flex justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center">
                    <MessageCircle size={16} className="mr-2" />
                    <span>{currentRoute.steps[currentStep]}</span>
                  </div>
                </div>
              )}
              
              {/* Waypoint Indicators */}
              {currentRoute.waypoints.map((waypoint, index) => (
                <div 
                  key={index}
                  className="absolute w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)]"
                  style={{
                    left: `${waypoint.x}%`,
                    top: `${waypoint.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {index + 1}
                  <div className="absolute bottom-[-20px] whitespace-nowrap bg-black/70 text-white rounded-lg px-2 py-0.5 text-xs">
                    {waypoint.label} 
                    {index === 0 ? ` (${distanceRemaining}m)` : ` (${60 + distanceRemaining}m)`}
                  </div>
                </div>
              ))}
              
              {/* Distance Indicator */}
              <div className="absolute left-4 bottom-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                {distanceRemaining}m remaining
              </div>
              
              {/* Obstacle Warning (simulated) */}
              {isPlaying && distanceRemaining < 50 && (
                <div className="absolute left-1/2 bottom-1/3 transform -translate-x-1/2 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-[var(--warning)]/80 flex items-center justify-center">
                    <AlertTriangle size={24} className="text-white" />
                  </div>
                  <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/70 text-white rounded-lg px-2 py-0.5 text-xs">
                    Caution: Wet Floor
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Navigation Instructions</h3>
              <ul className="text-xs space-y-2">
                <li>• Press play to start 3D navigation with step-by-step voice guidance</li>
                <li>• Warning markers will appear when obstacles are detected</li>
                <li>• Distance markers will update as you progress through the route</li>
                <li>• For a more immersive experience, try the AR View option</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* AR Mode Popup */}
      {showARPrompt && (
        <ARModePopup 
          stationId={stationId || ''} 
          routeId={routeId || ''}
          onClose={() => setShowARPrompt(false)}
        >
          <p className="text-sm text-gray-600 mb-4">
            AR Navigation uses your camera to overlay directions on your real-world view. 
            This creates an immersive experience with real-time guidance.
          </p>
          
          <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-4">
            <div className="flex items-start">
              <Info size={16} className="mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
              <p>
                If AR doesn't work on your device, you'll be provided with 
                alternative navigation options automatically.
              </p>
            </div>
          </div>
        </ARModePopup>
      )}
    </div>
  );
}
 