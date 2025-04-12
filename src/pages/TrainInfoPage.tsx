import  { useState, useEffect } from 'react';
import { Search, Filter, X, ArrowDownUp, Clock, Train as TrainIcon } from 'lucide-react';
import { getStationList } from '../data/stations';
import TrainCard from '../components/TrainCard';

export default function TrainInfoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    station?: string;
    status?: 'all' | 'onTime' | 'delayed';
    sortBy?: 'time' | 'station';
  }>({
    status: 'all',
    sortBy: 'time'
  });
  
  const stations = getStationList();
  
  // Get all trains from all stations
  const currentTrains = stations.flatMap(station => 
    station.platforms
      .filter(platform => platform.currentTrain)
      .map(platform => ({
        ...platform.currentTrain!,
        stationName: station.name,
        stationId: station.id
      }))
  );
  
  const upcomingTrains = stations.flatMap(station => 
    station.upcomingTrains.map(train => ({
      ...train,
      stationName: station.name,
      stationId: station.id
    }))
  );
  
  // Apply filters and sorting
  const applyFilters = (trains: any[]) => {
    let filtered = [...trains];
    
    // Filter by station
    if (selectedFilters.station) {
      filtered = filtered.filter(train => 
        train.stationId === selectedFilters.station
      );
    }
    
    // Filter by status
    if (selectedFilters.status !== 'all') {
      filtered = filtered.filter(train => {
        if (selectedFilters.status === 'onTime') {
          return !train.status.toLowerCase().includes('delay');
        } else {
          return train.status.toLowerCase().includes('delay');
        }
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(train => 
        train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        train.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        train.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        train.stationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    if (selectedFilters.sortBy === 'time') {
      filtered.sort((a, b) => {
        // Convert times to minutes for comparison
        const timeA = convertTimeToMinutes(a.arrivalTime);
        const timeB = convertTimeToMinutes(b.arrivalTime);
        return timeA - timeB;
      });
    } else if (selectedFilters.sortBy === 'station') {
      filtered.sort((a, b) => a.stationName.localeCompare(b.stationName));
    }
    
    return filtered;
  };
  
  const convertTimeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const filteredCurrentTrains = applyFilters(currentTrains);
  const filteredUpcomingTrains = applyFilters(upcomingTrains);
  
  const handleFilterChange = (key: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetFilters = () => {
    setSelectedFilters({
      status: 'all',
      sortBy: 'time'
    });
    setSearchQuery('');
  };
  
  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4">Train Information</h1>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for trains by name, number, or destination..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setShowFilterMenu(prev => !prev)}
        >
          <Filter size={18} />
        </button>
      </div>
      
      {/* Filter Menu Dropdown */}
      {showFilterMenu && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 relative z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filter Trains</h3>
            <button onClick={() => setShowFilterMenu(false)}>
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Station</label>
              <select 
                className="w-full p-2 border border-gray-200 rounded-lg" 
                value={selectedFilters.station || ''}
                onChange={(e) => handleFilterChange('station', e.target.value || undefined)}
              >
                <option value="">All Stations</option>
                {stations.map(station => (
                  <option key={station.id} value={station.id}>{station.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-lg text-sm flex-1 ${
                    selectedFilters.status === 'all' 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('status', 'all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm flex-1 ${
                    selectedFilters.status === 'onTime' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('status', 'onTime')}
                >
                  On Time
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm flex-1 ${
                    selectedFilters.status === 'delayed' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('status', 'delayed')}
                >
                  Delayed
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-lg text-sm flex-1 flex items-center justify-center ${
                    selectedFilters.sortBy === 'time' 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('sortBy', 'time')}
                >
                  <Clock size={14} className="mr-1" />
                  Time
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm flex-1 flex items-center justify-center ${
                    selectedFilters.sortBy === 'station' 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('sortBy', 'station')}
                >
                  <TrainIcon size={14} className="mr-1" />
                  Station
                </button>
              </div>
            </div>
            
            <div className="flex items-center pt-2">
              <button 
                className="text-[var(--primary)] text-sm flex items-center"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
              <div className="flex-1"></div>
              <button 
                className="bg-[var(--primary)] text-white px-4 py-1 rounded-lg text-sm"
                onClick={() => setShowFilterMenu(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Filter Badges */}
      {(selectedFilters.station || selectedFilters.status !== 'all' || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFilters.station && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <span>Station: {stations.find(s => s.id === selectedFilters.station)?.name}</span>
              <button 
                className="ml-1"
                onClick={() => handleFilterChange('station', undefined)}
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {selectedFilters.status !== 'all' && (
            <div className={`px-3 py-1 rounded-full text-sm flex items-center text-white ${
              selectedFilters.status === 'onTime' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <span>Status: {selectedFilters.status === 'onTime' ? 'On Time' : 'Delayed'}</span>
              <button 
                className="ml-1"
                onClick={() => handleFilterChange('status', 'all')}
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {searchQuery && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <span>Search: {searchQuery}</span>
              <button 
                className="ml-1"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <button 
            className="text-[var(--primary)] text-sm underline"
            onClick={resetFilters}
          >
            Clear All
          </button>
        </div>
      )}
      
      {/* Train Counter */}
      <div className="mb-2 text-sm text-gray-600">
        <span>
          {filteredCurrentTrains.length + filteredUpcomingTrains.length} trains found
        </span>
      </div>
      
      {/* Current Trains */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Current Trains</h2>
          <button 
            className="flex items-center text-sm text-gray-500"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <ArrowDownUp size={14} className="mr-1" />
            <span>Sort</span>
          </button>
        </div>
        
        {filteredCurrentTrains.length > 0 ? (
          <div className="space-y-3">
            {filteredCurrentTrains.map((train, index) => (
              <div key={index}>
                <TrainCard train={train} />
                <div className="text-xs text-gray-500 text-right mt-1">
                  Station: {train.stationName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No current trains matching your search</p>
          </div>
        )}
      </div>
      
      {/* Upcoming Trains */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Upcoming Trains</h2>
          <button 
            className="flex items-center text-sm text-gray-500"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <ArrowDownUp size={14} className="mr-1" />
            <span>Sort</span>
          </button>
        </div>
        
        {filteredUpcomingTrains.length > 0 ? (
          <div className="space-y-3">
            {filteredUpcomingTrains.map((train, index) => (
              <div key={index}>
                <TrainCard train={train} />
                <div className="text-xs text-gray-500 text-right mt-1">
                  Station: {train.stationName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No upcoming trains matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
 