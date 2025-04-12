import  { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Home, Train, QrCode, Info, AlertTriangle, MapPin, User, Settings, LogOut } from 'lucide-react';
import { useTime } from '../hooks/useTime';
import { notifications } from '../data/stations';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { formattedTime } = useTime();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Check login status on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserName(sessionStorage.getItem('userName') || 'User');
      setUserRole(sessionStorage.getItem('userRole') || 'client');
    }
  }, []);
  
  // Handle clicking outside notifications or user menu to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close notifications if clicked outside
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node) && 
        showNotifications
      ) {
        setShowNotifications(false);
      }
      
      // Close user menu if clicked outside
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) && 
        showUserMenu
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showUserMenu]);
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // If opening notifications, close user menu
    if (!showNotifications) {
      setShowUserMenu(false);
    }
  };
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    // If opening user menu, close notifications
    if (!showUserMenu) {
      setShowNotifications(false);
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/auth');
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Get role display name
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Station Admin';
      case 'masterAdmin': return 'Master Admin';
      default: return 'Passenger';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-red-500 text-white text-center py-2">
          You are currently offline. Some features may be limited.
        </div>
      )}
      
      {/* App Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-4 shadow-md z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Indian Railways Guide</h1>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={notificationRef}>
              <button
                className="relative"
                onClick={toggleNotifications}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-8 right-0 w-72 bg-white rounded-lg shadow-lg z-50 animate-fade-in">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-gray-500 hover:text-gray-700 text-xs">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.isRead ? 'opacity-60' : ''}`}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-100 text-center">
                    <button className="text-[var(--primary)] text-sm">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={toggleUserMenu}
                className="flex items-center"
              >
                {isLoggedIn ? (
                  <div className="w-8 h-8 rounded-full bg-white text-[var(--primary)] flex items-center justify-center">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User size={20} />
                )}
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-lg z-50 animate-fade-in">
                  {isLoggedIn ? (
                    <>
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-medium truncate">{userName}</p>
                        <p className="text-xs text-gray-500">{getRoleDisplay(userRole)}</p>
                      </div>
                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Profile
                        </Link>
                        <Link 
                          to="/settings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-1">
                      <Link 
                        to="/auth" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign in
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <button>
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex justify-between items-center mt-3 bg-white/10 rounded-lg p-2 text-xs backdrop-blur-sm">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} mr-1`}></div>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={12} className="mr-1" />
            <span>GPS Active</span>
          </div>
          <div className="flex items-center">
            <span>{formattedTime}</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-100 z-10">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          <Link to="/" className={`flex flex-col items-center py-3 px-4 ${location.pathname === '/' ? 'text-[var(--primary)]' : 'text-gray-500'}`}>
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/stations" className={`flex flex-col items-center py-3 px-4 ${location.pathname === '/stations' ? 'text-[var(--primary)]' : 'text-gray-500'}`}>
            <Train size={20} />
            <span className="text-xs mt-1">Stations</span>
          </Link>
          <Link to="/scan" className={`flex flex-col items-center py-3 px-4 ${location.pathname === '/scan' ? 'text-[var(--primary)]' : 'text-gray-500'}`}>
            <QrCode size={20} />
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link to="/info" className={`flex flex-col items-center py-3 px-4 ${location.pathname === '/info' ? 'text-[var(--primary)]' : 'text-gray-500'}`}>
            <Info size={20} />
            <span className="text-xs mt-1">Info</span>
          </Link>
          <Link to="/emergency" className={`flex flex-col items-center py-3 px-4 ${location.pathname === '/emergency' ? 'text-[var(--primary)]' : 'text-gray-500'}`}>
            <AlertTriangle size={20} />
            <span className="text-xs mt-1">Help</span>
          </Link>
        </div>
      </nav>
      
      {/* Emergency Button */}
      <Link to="/emergency" className="fixed bottom-20 right-5 bg-[var(--danger)] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-20 animate-pulse">
        <AlertTriangle size={20} />
      </Link>
    </div>
  );
}
 