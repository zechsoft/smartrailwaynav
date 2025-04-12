import  { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Compass, MapPin, Navigation, X, AlertTriangle, Info, Map, HelpCircle } from 'lucide-react';
import { getStation, getRoutes } from '../data/stations';

export default function ARNavigationPage() {
  const { stationId, routeId } = useParams<{ stationId: string, routeId: string }>();
  const station = getStation(stationId || '');
  const routes = getRoutes(stationId || '');
  const currentRoute = routes.find(r => r.id === routeId);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [distance, setDistance] = useState(100);
  const [showInfo, setShowInfo] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const [arPoints, setArPoints] = useState<{id: number, x: number, y: number, label: string, distance: number}[]>([]);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [arError, setArError] = useState<string | null>(null);
  
  // Check if AR is supported
  useEffect(() => {
    const checkARSupport = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setArSupported(false);
        setArError("AR is not supported on this device. Camera access is not available.");
        return;
      }
      
      setArSupported(true);
    };
    
    checkARSupport();
  }, []);
  
  // Start AR camera
  const startAR = async () => {
    if (!arSupported) {
      setArError("AR is not supported on this device");
      return;
    }
    
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        videoRef.current.srcObject = stream;
        
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsARActive(true);
              
              // Generate AR points for the current route
              if (currentRoute) {
                generateARPoints();
              }
              
              // Start distance simulation
              startDistanceSimulation();
            })
            .catch(error => {
              console.error('Error playing video:', error);
              setArSupported(false);
              setArError("Could not start camera stream. Autoplay may be blocked by your browser.");
            });
        }
      } else {
        setArSupported(false);
        setArError("AR is not supported on this device");
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setArSupported(false);
      setArError("Could not access camera. Please check permissions.");
    }
  };
  
  // Stop AR camera
  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsARActive(false);
    }
  };
  
  // Generate AR points based on route waypoints
  const generateARPoints = () => {
    if (!currentRoute) return;
    
    // Transform waypoints into AR points with adjusted positions
    const points = currentRoute.waypoints.map((waypoint, index) => {
      // Calculate position based on viewport and add some randomness
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate x and y positions (slightly randomized)
      let x = (waypoint.x / 100) * viewportWidth * 0.8 + Math.random() * 40 - 20;
      let y = (waypoint.y / 100) * viewportHeight * 0.6 + Math.random() * 40 - 20;
      
      // Ensure points are within viewport
      x = Math.max(60, Math.min(viewportWidth - 60, x));
      y = Math.max(60, Math.min(viewportHeight - 150, y));
      
      return {
        id: index + 1,
        x,
        y,
        label: waypoint.label,
        distance: 100 - (index * 30) // Simulated distance that decreases with each point
      };
    });
    
    setArPoints(points);
  };
  
  // Start distance simulation
  const startDistanceSimulation = () => {
    const interval = setInterval(() => {
      setDistance(prev => {
        const newDistance = prev - 2;
        
        // Update current step based on distance
        if (currentRoute && newDistance < 80 && currentStep === 0) {
          setCurrentStep(1);
        } else if (currentRoute && newDistance < 50 && currentStep === 1) {
          setCurrentStep(2);
        } else if (currentRoute && newDistance < 20 && currentStep === 2) {
          setCurrentStep(3);
        }
        
        // Update AR point distances
        setArPoints(prev => prev.map(point => ({
          ...point,
          distance: Math.max(0, point.distance - 2)
        })));
        
        return newDistance > 0 ? newDistance : 0;
      });
      
      // Simulate compass changes
      setCompassHeading(prev => (prev + (Math.random() * 10 - 5)) % 360);
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAR();
    };
  }, []);
  
  if (!station || !currentRoute) {
    return (
      <div className="p-4 text-center">
        <p>Route not found</p>
        <Link to={`/station/${stationId || ''}`} className="btn btn-primary mt-4">Back to Station</Link>
      </div>
    );
  }
  
  // Render AR not supported view
  if (arSupported === false) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="mb-4">
          <Link to={`/navigation/${stationId}/${routeId}`} className="flex items-center text-[var(--primary)]">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Map Navigation</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 bg-[var(--primary)] text-white">
            <h1 className="text-xl font-semibold">AR Navigation Not Available</h1>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg mb-4">
              <AlertTriangle size={24} className="mr-2 text-red-500" />
              <p>{arError || "AR is not supported on this device"}</p>
            </div>
            
            <img 
              src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/e6aa8a75-fd32-43eb-91ec-0fff47331800/public"
              alt="AR not supported" 
              className="w-full h-auto rounded-lg mb-4 border border-gray-200"
            />
            
            <h2 className="text-lg font-medium mb-2">Alternative Navigation Options</h2>
            
            <div className="space-y-4">
              <Link 
                to={`/navigation/${stationId}/${routeId}`}
                className="btn bg-[var(--primary)] text-white w-full"
              >
                <Map size={18} className="mr-2" />
                <span>Use Map Navigation</span>
              </Link>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Why isn't AR working?</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your device may not support camera access through the browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Camera permissions may be blocked in your browser settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your browser may not support the required features for AR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-3">Navigation Steps</h2>
            <div className="ml-2">
              {currentRoute.steps.map((step, index) => (
                <div key={index} className="relative pl-6 pb-5 last:pb-0">
                  <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                    index === 0 
                      ? 'bg-[var(--primary)] ring-4 ring-[var(--primary)]/20' 
                      : 'bg-gray-200'
                  }`}></div>
                  {index < currentRoute.steps.length - 1 && (
                    <div className="absolute left-[7px] top-4 w-0.5 h-full bg-[var(--primary-light)]/30"></div>
                  )}
                  <p className={index === 0 ? 'font-medium' : ''}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-screen">
      {/* AR View */}
      <div className="absolute inset-0 bg-black">
        {isARActive ? (
          <>
            <video 
              ref={videoRef} 
              className="h-full w-full object-cover"
              playsInline
              muted
            ></video>
            
            {/* Canvas overlay for drawing AR elements */}
            <canvas 
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            ></canvas>
            
            {/* AR Point Markers */}
            {arPoints.map((point) => (
              <div 
                key={point.id}
                className="absolute"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 30
                }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] font-bold shadow-lg ring-4 ring-white/30 animate-pulse">
                    {point.id}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded-lg whitespace-nowrap text-sm">
                    {point.label} ({point.distance}m)
                  </div>
                  <div className="absolute h-20 w-1 bg-[var(--primary)]/50 -bottom-20 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            ))}
            
            {/* Direction Arrow */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out"
              style={{ transform: `translate(-50%, -50%) rotate(${compassHeading}deg)` }}
            >
              <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                <Compass size={48} className="text-white" />
              </div>
            </div>
            
            {/* Current Direction */}
            <div className="absolute top-4 left-0 right-0 mx-auto w-4/5 bg-black/70 text-white p-3 rounded-lg text-center">
              <p className="font-bold">{currentRoute.steps[currentStep]}</p>
              <p className="text-sm mt-1 opacity-80">
                {currentStep < currentRoute.steps.length - 1 ? `Next: ${currentRoute.steps[currentStep + 1]}` : 'Destination reached'}
              </p>
            </div>
            
            {/* Distance Indicator */}
            <div className="absolute bottom-32 left-4 bg-black/70 text-white px-3 py-2 rounded-lg flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{distance}m remaining</span>
            </div>
            
            {/* Obstacle Warning (show when distance reaches specific thresholds) */}
            {distance < 70 && distance > 65 && (
              <div className="absolute bottom-1/2 left-1/4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-[var(--warning)]/80 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/70 text-white rounded-lg px-2 py-0.5 text-xs">
                  Caution: Slippery Floor
                </div>
              </div>
            )}
            
            {distance < 40 && distance > 35 && (
              <div className="absolute bottom-1/3 right-1/4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-[var(--warning)]/80 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/70 text-white rounded-lg px-2 py-0.5 text-xs">
                  Caution: Crowd Ahead
                </div>
              </div>
            )}
            
            {/* Controls */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-4">
              <button 
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info size={20} className="text-[var(--primary)]" />
              </button>
              <button 
                className="w-16 h-16 rounded-full bg-[var(--primary)] shadow-lg flex items-center justify-center"
                onClick={stopAR}
              >
                <X size={24} className="text-white" />
              </button>
              <button 
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                onClick={() => {
                  // Take screenshot functionality would go here
                  alert('Screenshot captured');
                }}
              >
                <Camera size={20} className="text-[var(--primary)]" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1577086664693-894d8405334a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwc3RhdGlvbiUyMG5hdmlnYXRpb24lMjBtYXAlMjAzRHxlbnwwfHx8fDE3NDM1ODg2Nzh8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
                alt="Navigation map visualization"
                className="w-full max-w-md rounded-lg opacity-70"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{currentRoute.name}</h2>
            <p className="text-center mb-6">Experience real-time directions with AR navigation</p>
            <div className="space-y-4 w-full max-w-md">
              <button 
                className="btn btn-primary w-full py-4 text-lg"
                onClick={startAR}
              >
                <Camera size={20} className="mr-2" />
                Start AR Navigation
              </button>
              <Link 
                to={`/navigation/${stationId}/${routeId}`}
                className="btn w-full bg-white/10 text-white border border-white/20"
              >
                <MapPin size={20} className="mr-2" />
                Return to Map View
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-white/10 rounded-lg max-w-md w-full">
              <h3 className="font-medium text-center mb-2 flex items-center justify-center">
                <HelpCircle size={16} className="mr-1" />
                What is AR Navigation?
              </h3>
              <p className="text-sm opacity-80 text-center">
                AR Navigation overlays digital directions on your real-world view through the camera. 
                Point your device to see waypoints and follow guided instructions.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Info Panel (only shown when requested) */}
      {showInfo && isARActive && (
        <div className="absolute inset-0 bg-black/80 z-40 p-4 flex flex-col">
          <button 
            className="self-end p-2"
            onClick={() => setShowInfo(false)}
          >
            <X size={24} className="text-white" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center text-white">
            <img 
              src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/68d1fd5a-0dcc-49c3-30dc-d44c4662a600/public"
              alt="Railway station AR navigation points" 
              className="w-full max-w-sm rounded-lg mb-6"
            />
            
            <h2 className="text-xl font-bold mb-4">How to Use AR Navigation</h2>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs">1</span>
                </div>
                <p>Follow the numbered AR markers that appear on your screen</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs">2</span>
                </div>
                <p>The compass shows your current heading direction</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs">3</span>
                </div>
                <p>Warning signs will appear when obstacles are detected</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs">4</span>
                </div>
                <p>Follow the step-by-step directions at the top of the screen</p>
              </li>
            </ul>
            
            <button 
              className="mt-8 btn btn-primary"
              onClick={() => setShowInfo(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      {/* Header Bar (only when AR is not active) */}
      {!isARActive && (
        <div className="absolute top-0 left-0 right-0 p-4">
          <Link to={`/navigation/${stationId}/${routeId}`} className="text-white">
            <ArrowLeft size={24} />
          </Link>
        </div>
      )}
    </div>
  );
}
 