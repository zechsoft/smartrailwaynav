import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Plus, AlertTriangle, Check, X, Clock, Train, Users, Edit3 } from 'lucide-react';
import { getStation } from '../data/stations';
import StatusBadge from '../components/StatusBadge';

export default function AdminStationPage() {
  const { id } = useParams<{ id: string }>();
  const [station, setStation] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Check authentication and load station data
  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    setUserRole(role);
    
    // Redirect if not admin
    if (!isLoggedIn || (role !== 'admin' && role !== 'masterAdmin')) {
      window.location.href = '/auth';
      return;
    }
    
    // Load station data
    const stationData = getStation(id || '');
    if (stationData) {
      setStation(stationData);
      setEditedData(stationData);
    }
    
    setIsLoading(false);
  }, [id]);
  
  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle amenity data changes
  const handleAmenityChange = (index: number, field: string, value: any) => {
    const updatedAmenities = [...editedData.amenities];
    updatedAmenities[index] = {
      ...updatedAmenities[index],
      [field]: value
    };
    
    handleInputChange('amenities', updatedAmenities);
  };
  
  // Add new amenity
  const addAmenity = () => {
    const newAmenity = {
      id: `a${editedData.amenities.length + 1}`,
      name: 'New Amenity',
      icon: 'Info',
      crowdLevel: 'low',
      location: 'Location',
      details: 'Details about this amenity',
      lastUpdated: 'just now'
    };
    
    handleInputChange('amenities', [...editedData.amenities, newAmenity]);
  };
  
  // Remove amenity
  const removeAmenity = (index: number) => {
    const updatedAmenities = [...editedData.amenities];
    updatedAmenities.splice(index, 1);
    
    handleInputChange('amenities', updatedAmenities);
  };
  
  // Handle platform data changes
  const handlePlatformChange = (index: number, field: string, value: any) => {
    const updatedPlatforms = [...editedData.platforms];
    
    if (field.startsWith('currentTrain.')) {
      const trainField = field.split('.')[1];
      updatedPlatforms[index] = {
        ...updatedPlatforms[index],
        currentTrain: {
          ...updatedPlatforms[index].currentTrain,
          [trainField]: value
        }
      };
    } else {
      updatedPlatforms[index] = {
        ...updatedPlatforms[index],
        [field]: value
      };
    }
    
    handleInputChange('platforms', updatedPlatforms);
  };
  
  // Add new platform
  const addPlatform = () => {
    const newPlatform = {
      number: editedData.platforms.length + 1,
      currentTrain: null
    };
    
    handleInputChange('platforms', [...editedData.platforms, newPlatform]);
  };
  
  // Save changes
  const saveChanges = () => {
    // In a real app, this would call an API endpoint
    setStation(editedData);
    setIsEditing(false);
    
    // Simulate API call
    setTimeout(() => {
      alert('Station details updated successfully!');
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading station data...</p>
      </div>
    );
  }
  
  if (!station) {
    return (
      <div className="p-4">
        <p>Station not found</p>
        <Link to="/admin" className="btn btn-primary mt-4">Back to Admin Dashboard</Link>
      </div>
    );
  }
  
  return (
    <div className="p-4 pb-24 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/admin" className="mr-3">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Station Management</h1>
        </div>
        {isEditing ? (
          <div className="flex space-x-2">
            <button 
              className="btn bg-gray-100"
              onClick={() => {
                setIsEditing(false);
                setEditedData(station);
              }}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={saveChanges}
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={18} />
            <span>Edit Station</span>
          </button>
        )}
      </div>
      
      {/* Station Overview */}
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Station Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
            {isEditing ? (
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={editedData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              <p>{station.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Station Code</label>
            {isEditing ? (
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={editedData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
              />
            ) : (
              <p>{station.code}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              ) : (
                <p>{station.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              ) : (
                <p>{station.state}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crowd Level</label>
            {isEditing ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={editedData.crowdLevel}
                onChange={(e) => handleInputChange('crowdLevel', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <StatusBadge type={station.crowdLevel}>
                {station.crowdLevel === 'low' ? 'Not Crowded' : 
                station.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
              </StatusBadge>
            )}
          </div>
        </div>
      </div>
      
      {/* Amenities Management */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Amenities</h2>
          {isEditing && (
            <button 
              className="btn bg-[var(--primary-light)]/10 text-[var(--primary)]"
              onClick={addAmenity}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {(isEditing ? editedData.amenities : station.amenities).map((amenity: any, index: number) => (
            <div key={amenity.id} className="border border-gray-100 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    className="font-medium w-full p-2 border border-gray-300 rounded-lg"
                    value={amenity.name}
                    onChange={(e) => handleAmenityChange(index, 'name', e.target.value)}
                  />
                ) : (
                  <h3 className="font-medium">{amenity.name}</h3>
                )}
                
                {isEditing && (
                  <button 
                    className="text-[var(--danger)]"
                    onClick={() => removeAmenity(index)}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={amenity.icon}
                      onChange={(e) => handleAmenityChange(index, 'icon', e.target.value)}
                    >
                      <option value="User">User</option>
                      <option value="CreditCard">CreditCard</option>
                      <option value="Clock">Clock</option>
                      <option value="Package">Package</option>
                      <option value="Coffee">Coffee</option>
                      <option value="Info">Info</option>
                      <option value="MapPin">MapPin</option>
                      <option value="HelpCircle">HelpCircle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Crowd Level</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={amenity.crowdLevel}
                      onChange={(e) => handleAmenityChange(index, 'crowdLevel', e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={amenity.location}
                      onChange={(e) => handleAmenityChange(index, 'location', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      rows={2}
                      value={amenity.details}
                      onChange={(e) => handleAmenityChange(index, 'details', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Location:</span> {amenity.location}</p>
                  <p><span className="font-medium">Status:</span> <StatusBadge type={amenity.crowdLevel}>
                    {amenity.crowdLevel === 'low' ? 'Not Crowded' : 
                     amenity.crowdLevel === 'medium' ? 'Moderate' : 'Crowded'}
                  </StatusBadge></p>
                  <p className="mt-1">{amenity.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Platforms Management */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Platforms</h2>
          {isEditing && (
            <button 
              className="btn bg-[var(--primary-light)]/10 text-[var(--primary)]"
              onClick={addPlatform}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {(isEditing ? editedData.platforms : station.platforms).map((platform: any, index: number) => (
            <div key={platform.number} className="border border-gray-100 rounded-lg p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Platform {platform.number}</h3>
                {isEditing && platform.currentTrain && (
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-[var(--primary)]"
                      onClick={() => handlePlatformChange(index, 'currentTrain', null)}
                    >
                      <X size={16} />
                      <span className="text-xs">Clear Train</span>
                    </button>
                  </div>
                )}
              </div>
              
              {platform.currentTrain ? (
                isEditing ? (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Train Number</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.number}
                          onChange={(e) => handlePlatformChange(index, 'currentTrain.number', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.status.includes('Delayed') ? 'delayed' : 'onTime'}
                          onChange={(e) => {
                            const status = e.target.value === 'delayed' 
                              ? `Delayed by ${platform.currentTrain.delay || 15} min` 
                              : 'On Time';
                            handlePlatformChange(index, 'currentTrain.status', status);
                          }}
                        >
                          <option value="onTime">On Time</option>
                          <option value="delayed">Delayed</option>
                        </select>
                      </div>
                      
                      {platform.currentTrain.status.includes('Delayed') && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Delay (min)</label>
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            value={platform.currentTrain.delay || 15}
                            onChange={(e) => handlePlatformChange(index, 'currentTrain.delay', parseInt(e.target.value))}
                          />
                        </div>
                      )}
                      
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Train Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.name}
                          onChange={(e) => handlePlatformChange(index, 'currentTrain.name', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Arrival Time</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.arrivalTime}
                          onChange={(e) => handlePlatformChange(index, 'currentTrain.arrivalTime', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Departure Time</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.departureTime}
                          onChange={(e) => handlePlatformChange(index, 'currentTrain.departureTime', e.target.value)}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                          value={platform.currentTrain.destination}
                          onChange={(e) => handlePlatformChange(index, 'currentTrain.destination', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[var(--primary)]">{platform.currentTrain.number}</h4>
                        <p>{platform.currentTrain.name}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>To: {platform.currentTrain.destination}</p>
                          <p>
                            <span className="font-medium">Arrival:</span> {platform.currentTrain.arrivalTime}
                            <span className="mx-2">•</span>
                            <span className="font-medium">Departure:</span> {platform.currentTrain.departureTime}
                          </p>
                        </div>
                      </div>
                      <StatusBadge type={platform.currentTrain.status.includes('Delayed') ? 'delay' : 'ontime'}>
                        {platform.currentTrain.status}
                      </StatusBadge>
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg text-center text-gray-500">
                  {isEditing ? (
                    <button 
                      className="btn bg-[var(--primary-light)]/10 text-[var(--primary)]"
                      onClick={() => handlePlatformChange(index, 'currentTrain', {
                        number: 'XXXXX',
                        name: 'New Train',
                        destination: 'Destination',
                        platform: platform.number,
                        arrivalTime: '00:00',
                        departureTime: '00:00',
                        status: 'On Time',
                        lastUpdated: 'just now'
                      })}
                    >
                      <Plus size={16} />
                      <span>Add Train</span>
                    </button>
                  ) : (
                    <p>No train currently on this platform</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Manage ticket counters */}
      <div className="card mb-4">
        <h2 className="font-medium mb-3">Ticket Counters</h2>
        <div className="space-y-4">
          {(isEditing ? editedData.ticketCounters : station.ticketCounters).map((counter: any, index: number) => (
            <div key={index} className="border border-gray-100 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    className="font-medium w-full p-2 border border-gray-300 rounded-lg"
                    value={counter.name}
                    onChange={(e) => {
                      const updatedCounters = [...editedData.ticketCounters];
                      updatedCounters[index] = { ...updatedCounters[index], name: e.target.value };
                      handleInputChange('ticketCounters', updatedCounters);
                    }}
                  />
                ) : (
                  <h3 className="font-medium">{counter.name}</h3>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Queue Status</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={counter.currentQueue.status}
                      onChange={(e) => {
                        const updatedCounters = [...editedData.ticketCounters];
                        updatedCounters[index] = { 
                          ...updatedCounters[index], 
                          currentQueue: { 
                            ...updatedCounters[index].currentQueue, 
                            status: e.target.value 
                          } 
                        };
                        handleInputChange('ticketCounters', updatedCounters);
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">People in Queue</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={counter.currentQueue.total}
                      onChange={(e) => {
                        const updatedCounters = [...editedData.ticketCounters];
                        updatedCounters[index] = { 
                          ...updatedCounters[index], 
                          currentQueue: { 
                            ...updatedCounters[index].currentQueue, 
                            total: parseInt(e.target.value)
                          } 
                        };
                        handleInputChange('ticketCounters', updatedCounters);
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Waiting Time</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      value={counter.currentQueue.averageWaitTime}
                      onChange={(e) => {
                        const updatedCounters = [...editedData.ticketCounters];
                        updatedCounters[index] = { 
                          ...updatedCounters[index], 
                          currentQueue: { 
                            ...updatedCounters[index].currentQueue, 
                            averageWaitTime: e.target.value
                          } 
                        };
                        handleInputChange('ticketCounters', updatedCounters);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  <div className="mb-2">
                    <StatusBadge type={counter.currentQueue.status}>
                      {counter.currentQueue.status === 'low' ? 'Low Queue' : 
                       counter.currentQueue.status === 'medium' ? 'Moderate Queue' : 'High Queue'}
                    </StatusBadge>
                    <span className="ml-2">{counter.currentQueue.total} people</span>
                    <span className="ml-2">•</span>
                    <span className="ml-2">{counter.currentQueue.averageWaitTime} wait</span>
                  </div>
                  
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        counter.currentQueue.status === 'low' ? 'bg-green-500' : 
                        counter.currentQueue.status === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${counter.currentQueue.queuePercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-2">
                    <p><span className="font-medium">Services:</span> {counter.services.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Admin Actions */}
      <div className="card">
        <h2 className="font-medium mb-3">Admin Actions</h2>
        
        <div className="space-y-3">
          <button className="btn w-full flex justify-between items-center bg-[var(--primary-light)]/10 text-[var(--primary)]">
            <div className="flex items-center">
              <Train size={18} className="mr-2" />
              <span>Update Train Schedule</span>
            </div>
            <ArrowLeft size={16} className="transform rotate-180" />
          </button>
          
          <button className="btn w-full flex justify-between items-center bg-[var(--primary-light)]/10 text-[var(--primary)]">
            <div className="flex items-center">
              <Edit3 size={18} className="mr-2" />
              <span>Edit Station Layout</span>
            </div>
            <ArrowLeft size={16} className="transform rotate-180" />
          </button>
          
          <button className="btn w-full flex justify-between items-center bg-[var(--primary-light)]/10 text-[var(--primary)]">
            <div className="flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              <span>Manage Emergency Info</span>
            </div>
            <ArrowLeft size={16} className="transform rotate-180" />
          </button>
          
          <button className="btn w-full flex justify-between items-center bg-[var(--primary-light)]/10 text-[var(--primary)]">
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              <span>Staff Management</span>
            </div>
            <ArrowLeft size={16} className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
 