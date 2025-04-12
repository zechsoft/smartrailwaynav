import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Train, User, ChevronDown, MapPin, Clock, Check } from 'lucide-react';
import { getStationList } from '../data/stations';

export default function TicketBookingPage() {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState<'general' | 'reserved' | 'platform'>('general');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showStationList, setShowStationList] = useState<'from' | 'to' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  
  const stations = getStationList();
  
  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate booking completion
      setTimeout(() => {
        setIsBookingComplete(true);
      }, 1500);
    }
  };
  
  const handleStationSelect = (station: any) => {
    if (showStationList === 'from') {
      setFromStation(station.id);
    } else if (showStationList === 'to') {
      setToStation(station.id);
    }
    setShowStationList(null);
    setSearchQuery('');
  };
  
  const getStationById = (id: string) => {
    return stations.find(station => station.id === id);
  };
  
  const calculateFare = () => {
    // Simplified fare calculation
    const baseAmounts = {
      'general': 45,
      'reserved': 120,
      'platform': 10
    };
    
    return baseAmounts[ticketType] * passengers;
  };
  
  const renderTicketTypeStep = () => (
    <div className="animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Select Ticket Type</h2>
      
      <div className="space-y-3 mb-6">
        <div
          className={`p-4 border rounded-lg flex items-start cursor-pointer ${
            ticketType === 'general' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-gray-200'
          }`}
          onClick={() => setTicketType('general')}
        >
          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
            ticketType === 'general' ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'
          }`}>
            {ticketType === 'general' && <Check size={12} className="text-white" />}
          </div>
          <div>
            <h3 className="font-medium">General Ticket</h3>
            <p className="text-sm text-gray-600 mt-1">Unreserved seating, valid for same-day travel</p>
          </div>
        </div>
        
        <div
          className={`p-4 border rounded-lg flex items-start cursor-pointer ${
            ticketType === 'reserved' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-gray-200'
          }`}
          onClick={() => setTicketType('reserved')}
        >
          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
            ticketType === 'reserved' ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'
          }`}>
            {ticketType === 'reserved' && <Check size={12} className="text-white" />}
          </div>
          <div>
            <h3 className="font-medium">Reserved Ticket</h3>
            <p className="text-sm text-gray-600 mt-1">Reserved seating with assigned berth/seat</p>
          </div>
        </div>
        
        <div
          className={`p-4 border rounded-lg flex items-start cursor-pointer ${
            ticketType === 'platform' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-gray-200'
          }`}
          onClick={() => setTicketType('platform')}
        >
          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
            ticketType === 'platform' ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'
          }`}>
            {ticketType === 'platform' && <Check size={12} className="text-white" />}
          </div>
          <div>
            <h3 className="font-medium">Platform Ticket</h3>
            <p className="text-sm text-gray-600 mt-1">Access to platform only, not valid for travel</p>
          </div>
        </div>
      </div>
      
      <button 
        className="btn btn-primary w-full" 
        onClick={handleContinue}
        disabled={!ticketType}
      >
        Continue
      </button>
    </div>
  );
  
  const renderJourneyDetailsStep = () => (
    <div className="animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Journey Details</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Station</label>
          <div
            className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer"
            onClick={() => setShowStationList('from')}
          >
            {fromStation ? (
              <div>
                <div className="font-medium">{getStationById(fromStation)?.name}</div>
                <div className="text-xs text-gray-500">{getStationById(fromStation)?.code}</div>
              </div>
            ) : (
              <span className="text-gray-500">Select departure station</span>
            )}
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Station</label>
          <div
            className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer"
            onClick={() => setShowStationList('to')}
          >
            {toStation ? (
              <div>
                <div className="font-medium">{getStationById(toStation)?.name}</div>
                <div className="text-xs text-gray-500">{getStationById(toStation)?.code}</div>
              </div>
            ) : (
              <span className="text-gray-500">Select arrival station</span>
            )}
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        
        {ticketType !== 'platform' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Journey</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-200 rounded-lg"
              min={new Date().toISOString().split('T')[0]}
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700"
              onClick={() => setPassengers(prev => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input 
              type="number" 
              className="w-full text-center outline-none"
              min="1"
              max="6"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              readOnly
            />
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700"
              onClick={() => setPassengers(prev => Math.min(6, prev + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <button 
        className="btn btn-primary w-full" 
        onClick={handleContinue}
        disabled={!fromStation || !toStation || (ticketType !== 'platform' && !journeyDate)}
      >
        Continue
      </button>
    </div>
  );
  
  const renderPaymentStep = () => (
    <div className="animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-3">Booking Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Ticket Type:</span>
            <span className="font-medium capitalize">{ticketType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <span className="font-medium">{getStationById(fromStation)?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <span className="font-medium">{getStationById(toStation)?.name}</span>
          </div>
          
          {ticketType !== 'platform' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(journeyDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers:</span>
            <span className="font-medium">{passengers}</span>
          </div>
          
          <div className="border-t my-2 pt-2">
            <div className="flex justify-between font-medium">
              <span>Total Amount:</span>
              <span>₹{calculateFare()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <div className="p-3 border border-[var(--primary)] bg-[var(--primary)]/5 rounded-lg flex items-center">
            <div className="w-5 h-5 rounded-full border border-[var(--primary)] bg-[var(--primary)] flex-shrink-0 mr-3 flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
            <div className="flex items-center">
              <CreditCard size={20} className="mr-2 text-gray-700" />
              <span>UPI Payment</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">Enter your UPI ID to complete the payment</p>
        </div>
      </div>
      
      <button 
        className="btn btn-primary w-full" 
        onClick={handleContinue}
      >
        Pay ₹{calculateFare()}
      </button>
    </div>
  );
  
  const renderBookingComplete = () => (
    <div className="animate-fade-in text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
        <Check size={32} className="text-green-600" />
      </div>
      
      <h2 className="text-lg font-semibold mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your ticket has been booked successfully</p>
      
      <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6 mx-auto max-w-xs">
        <div className="border-dashed border-b-2 border-gray-200 pb-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">PNR Number</div>
            <div className="font-bold tracking-wide text-lg">8564721934</div>
          </div>
        </div>
        
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">From</div>
            <div className="font-medium">{getStationById(fromStation)?.name}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">To</div>
            <div className="font-medium">{getStationById(toStation)?.name}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Date</div>
            <div className="font-medium">
              {ticketType !== 'platform' 
                ? new Date(journeyDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              }
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Passengers</div>
            <div className="font-medium">{passengers}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Type</div>
            <div className="font-medium capitalize">{ticketType}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Amount</div>
            <div className="font-medium">₹{calculateFare()}</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="btn btn-primary w-full">
          Download Ticket
        </button>
        
        <Link to="/" className="btn w-full bg-gray-100">
          Back to Home
        </Link>
      </div>
    </div>
  );
  
  return (
    <div className="p-4 pb-24 animate-fade-in">
      {/* Header */}
      {!isBookingComplete && (
        <div className="flex items-center mb-4">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : null}
            className={`mr-2 ${step === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Book Tickets</h1>
        </div>
      )}
      
      {/* Progress Indicator (only show when not complete) */}
      {!isBookingComplete && (
        <div className="flex mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s === step 
                  ? 'bg-[var(--primary)] text-white' 
                  : s < step 
                    ? 'bg-[var(--primary-light)] text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {s < step ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 ${
                  s < step ? 'bg-[var(--primary-light)]' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Steps */}
      {isBookingComplete ? renderBookingComplete() :
        step === 1 ? renderTicketTypeStep() :
        step === 2 ? renderJourneyDetailsStep() :
        renderPaymentStep()}
      
      {/* Station Selection Modal */}
      {showStationList && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b sticky top-0 bg-white">
              <h3 className="font-medium">Select {showStationList === 'from' ? 'Origin' : 'Destination'} Station</h3>
              <input
                type="text"
                placeholder="Search stations..."
                className="mt-3 w-full p-2 border border-gray-200 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="overflow-y-auto max-h-[50vh]">
              {filteredStations.length > 0 ? (
                filteredStations.map(station => (
                  <div
                    key={station.id}
                    className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleStationSelect(station)}
                  >
                    <div className="font-medium">{station.name}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{station.city}, {station.state}</span>
                      <span>{station.code}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No stations found matching your search
                </div>
              )}
            </div>
            
            <div className="p-3 border-t bg-white sticky bottom-0">
              <button 
                className="btn w-full bg-gray-100"
                onClick={() => setShowStationList(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 