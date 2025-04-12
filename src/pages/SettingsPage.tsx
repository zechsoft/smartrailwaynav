import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Moon, Sun, Globe, Volume2, VolumeX, Eye, LogOut, Lock, Info } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState('english');
  const [fontSize, setFontSize] = useState('medium');
  const [locationAccess, setLocationAccess] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  
  // Check login status on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserRole(sessionStorage.getItem('userRole') || 'client');
    }
  }, []);
  
  // Toggle setting with animation
  const toggleSetting = (setting: string, value: boolean) => {
    switch (setting) {
      case 'darkMode':
        setDarkMode(value);
        break;
      case 'notifications':
        setNotifications(value);
        break;
      case 'soundEffects':
        setSoundEffects(value);
        break;
      case 'locationAccess':
        setLocationAccess(value);
        break;
      case 'offlineMode':
        setOfflineMode(value);
        break;
      case 'highContrast':
        setHighContrast(value);
        break;
      default:
        break;
    }
  };
  
  // Clear cache button handler
  const handleClearCache = () => {
    // Mock implementation that would clear cached data
    setTimeout(() => {
      alert('Cache cleared successfully');
    }, 1000);
  };
  
  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    setIsLoggedIn(false);
    window.location.href = '/auth';
  };
  
  // Get role display name
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Station Admin';
      case 'masterAdmin': return 'Master Admin';
      default: return 'Passenger';
    }
  };
  
  return (
    <div className="p-4 animate-fade-in">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      
      {/* User Account Section */}
      {isLoggedIn ? (
        <div className="card mb-6">
          <h2 className="font-medium mb-4">Account</h2>
          <div className="py-2">
            <Link to="/profile" className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-3">
                  {sessionStorage.getItem('userName')?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-medium">{sessionStorage.getItem('userName') || 'User'}</div>
                  <div className="text-xs text-gray-500">{getRoleDisplay(userRole)}</div>
                </div>
              </div>
              <div className="text-gray-500">Edit</div>
            </Link>
          </div>
          
          {(userRole === 'admin' || userRole === 'masterAdmin') && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link 
                to="/admin"
                className="btn bg-[var(--primary)] text-white w-full"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="card mb-6">
          <h2 className="font-medium mb-4">Account</h2>
          <Link to="/auth" className="btn btn-primary w-full">
            Sign In / Register
          </Link>
        </div>
      )}
      
      {/* Display Settings */}
      <div className="card mb-6">
        <h2 className="font-medium mb-4">Display</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {darkMode ? <Moon size={20} className="mr-3" /> : <Sun size={20} className="mr-3" />}
              <span>Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={(e) => toggleSetting('darkMode', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Eye size={20} className="mr-3" />
              <span>High Contrast</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={highContrast}
                onChange={(e) => toggleSetting('highContrast', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Bell size={20} className="mr-3" />
              <span>Font Size</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <button 
                className={`flex-1 py-2 px-3 rounded-lg text-sm ${fontSize === 'small' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100'}`}
                onClick={() => setFontSize('small')}
              >
                Small
              </button>
              <button 
                className={`flex-1 py-2 px-3 rounded-lg text-sm ${fontSize === 'medium' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100'}`}
                onClick={() => setFontSize('medium')}
              >
                Medium
              </button>
              <button 
                className={`flex-1 py-2 px-3 rounded-lg text-sm ${fontSize === 'large' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100'}`}
                onClick={() => setFontSize('large')}
              >
                Large
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preferences */}
      <div className="card mb-6">
        <h2 className="font-medium mb-4">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell size={20} className="mr-3" />
              <span>Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={(e) => toggleSetting('notifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {soundEffects ? <Volume2 size={20} className="mr-3" /> : <VolumeX size={20} className="mr-3" />}
              <span>Sound Effects</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={soundEffects}
                onChange={(e) => toggleSetting('soundEffects', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin size={20} className="mr-3" />
              <span>Location Access</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={locationAccess}
                onChange={(e) => toggleSetting('locationAccess', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe size={20} className="mr-3" />
              <span>Language</span>
            </div>
            <select 
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
              <option value="bengali">Bengali</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Data & Storage */}
      <div className="card mb-6">
        <h2 className="font-medium mb-4">Data & Storage</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe size={20} className="mr-3" />
              <span>Offline Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={offlineMode}
                onChange={(e) => toggleSetting('offlineMode', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <span>Storage Used</span>
              <span className="text-sm text-gray-500">24.5 MB</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary)]" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Maps: 18.2 MB</span>
              <span>Data: 6.3 MB</span>
            </div>
          </div>
          
          <button 
            className="btn bg-gray-100 w-full"
            onClick={handleClearCache}
          >
            Clear Cache Data
          </button>
        </div>
      </div>
      
      {/* Security & Privacy */}
      <div className="card mb-6">
        <h2 className="font-medium mb-4">Security & Privacy</h2>
        
        <div className="space-y-3">
          <Link to="/privacy-policy" className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Lock size={20} className="mr-3 text-gray-600" />
              <span>Privacy Policy</span>
            </div>
            <div className="text-gray-400">
              <ArrowLeft size={16} className="transform rotate-180" />
            </div>
          </Link>
          
          <Link to="/terms-of-service" className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Info size={20} className="mr-3 text-gray-600" />
              <span>Terms of Service</span>
            </div>
            <div className="text-gray-400">
              <ArrowLeft size={16} className="transform rotate-180" />
            </div>
          </Link>
          
          {isLoggedIn && (
            <button 
              className="flex items-center text-[var(--danger)] py-2 w-full" 
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 my-4">
        <p>Railway Station Guide v1.2.0</p>
        <p className="mt-1">© 2023 Indian Railways</p>
      </div>
    </div>
  );
}
 