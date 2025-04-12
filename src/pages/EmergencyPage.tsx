import  { useState } from 'react';
import { Phone, AlertTriangle, HelpCircle, Users, Shield, MapPin, MessageSquare } from 'lucide-react';

export default function EmergencyPage() {
  const [isCallInProgress, setIsCallInProgress] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [showCallUI, setShowCallUI] = useState(false);
  
  const emergencyContacts = [
    { 
      id: 'railway-police', 
      name: 'Railway Police', 
      number: '1512', 
      icon: 'AlertTriangle',
      description: 'Report security concerns, thefts, or suspicious activity'
    },
    { 
      id: 'medical', 
      name: 'Medical Emergency', 
      number: '108', 
      icon: 'HelpCircle',
      description: 'For medical assistance, first aid, or health emergencies'
    },
    { 
      id: 'railway-helpline', 
      name: 'Railway Helpline', 
      number: '139', 
      icon: 'Phone',
      description: 'General railway inquiries, booking assistance, or complaints'
    },
    { 
      id: 'women-helpline', 
      name: 'Women Helpline', 
      number: '1091', 
      icon: 'Users',
      description: "For women's safety concerns or harassment complaints"
    },
    { 
      id: 'rpf-control', 
      name: 'RPF Control Room', 
      number: '9717630982', 
      icon: 'Shield',
      description: 'Railway Protection Force for immediate security assistance'
    }
  ];
  
  const handleEmergencyCall = (contactId: string) => {
    const contact = emergencyContacts.find(c => c.id === contactId);
    if (!contact) return;
    
    setIsCallInProgress(contactId);
    setCallDuration(0);
    setShowCallUI(true);
    
    // Simulate call duration timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    // Auto end call after 5 seconds for demo
    setTimeout(() => {
      clearInterval(timer);
      setShowCallUI(false);
      setTimeout(() => {
        setIsCallInProgress(null);
        setCallDuration(0);
      }, 500);
    }, 10000);
  };
  
  const endCall = () => {
    setShowCallUI(false);
    setTimeout(() => {
      setIsCallInProgress(null);
      setCallDuration(0);
    }, 500);
  };
  
  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Get currently active contact
  const activeContact = isCallInProgress 
    ? emergencyContacts.find(c => c.id === isCallInProgress) 
    : null;
  
  return (
    <div className="p-4 animate-fade-in">
      <div className="bg-[var(--danger)] rounded-lg p-4 text-white flex items-center mb-6">
        <AlertTriangle size={24} className="mr-3" />
        <div>
          <h1 className="text-xl font-bold">Emergency Assistance</h1>
          <p className="text-sm opacity-90">Get immediate help from authorities</p>
        </div>
      </div>
      
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Emergency Contacts</h2>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon === 'AlertTriangle' 
              ? AlertTriangle
              : contact.icon === 'HelpCircle'
                ? HelpCircle
                : contact.icon === 'Users'
                  ? Users
                  : contact.icon === 'Shield'
                    ? Shield
                    : Phone;
            
            return (
              <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-3">
                    <Icon size={20} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.number}</p>
                  </div>
                </div>
                <button 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCallInProgress === contact.id
                      ? 'bg-red-500 text-white'
                      : 'bg-[var(--primary)] text-white'
                  }`}
                  onClick={() => handleEmergencyCall(contact.id)}
                  disabled={isCallInProgress !== null}
                >
                  <Phone size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Your Current Location</h2>
        <div className="bg-gray-100 p-3 rounded-lg flex items-start">
          <MapPin size={20} className="mr-2 text-[var(--primary)] mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Chennai Central Railway Station</p>
            <p className="text-sm text-gray-600">Platform 4, Near Waiting Area</p>
            <p className="text-xs text-gray-500 mt-1">
              Your exact location will be shared with emergency services when you make a call
            </p>
          </div>
        </div>
      </div>
      
      <button 
        className="btn w-full bg-[var(--danger)] text-white mb-4"
        onClick={() => handleEmergencyCall('railway-police')}
        disabled={isCallInProgress !== null}
      >
        <AlertTriangle size={18} />
        <span>Emergency: Call Railway Police (1512)</span>
      </button>
      
      <button 
        className="btn w-full bg-[var(--warning)] text-white mb-4"
        onClick={() => handleEmergencyCall('medical')}
        disabled={isCallInProgress !== null}
      >
        <HelpCircle size={18} />
        <span>Call Medical Emergency (108)</span>
      </button>
      
      <div className="card">
        <h2 className="font-medium mb-3">Safety Tips</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Keep your belongings secure and within sight at all times</li>
          <li>Stay behind the yellow line on platforms</li>
          <li>Report unattended baggage to railway staff immediately</li>
          <li>Be aware of emergency exits and assembly points</li>
          <li>Follow instructions from railway staff during emergencies</li>
        </ul>
      </div>
      
      {/* Call UI Overlay */}
      {showCallUI && activeContact && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-fade-in">
          <div className="text-center text-white mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--danger)] flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="animate-pulse" />
            </div>
            <h2 className="text-xl font-bold mb-1">{activeContact.name}</h2>
            <p className="text-lg">{activeContact.number}</p>
            <p className="mt-4 text-gray-300">Call in progress: {formatCallDuration(callDuration)}</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white"
              onClick={endCall}
            >
              <Phone size={20} className="transform rotate-135" />
            </button>
            <button
              className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white"
            >
              <MessageSquare size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-20 left-0 right-0 text-center text-white text-sm">
            <p>Sharing your location with emergency services</p>
            <div className="mt-2 flex justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping mx-1"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping mx-1" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping mx-1" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}