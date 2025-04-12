import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Smartphone, Calendar, MapPin, CreditCard, Edit, Camera, Save, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Raj Sharma',
    email: 'raj.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '1989-05-15',
    address: 'Anna Nagar, Chennai',
    emergencyContact: '+91 87654 32109'
  });
  
  const navigate = useNavigate();
  
  // Check login status on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      setUserName(sessionStorage.getItem('userName') || 'User');
      setUserRole(sessionStorage.getItem('userRole') || 'client');
      // In a real app, we would fetch user data from an API here
    } else {
      // Redirect to login if not logged in
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the profile
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };
  
  // Get role display name
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Station Admin';
      case 'masterAdmin': return 'Master Admin';
      default: return 'Passenger';
    }
  };
  
  const recentBookings = [
    {
      id: 'PNR8564721934',
      from: 'Chennai Central',
      to: 'Bangalore City Junction',
      date: '2023-08-15',
      status: 'Completed'
    },
    {
      id: 'PNR7653412098',
      from: 'Bangalore City Junction',
      to: 'Chennai Central',
      date: '2023-09-02',
      status: 'Upcoming'
    }
  ];
  
  return (
    <div className="p-4 pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="relative mb-6">
        <div className="h-32 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-t-xl"></div>
        <div className="absolute bottom-0 transform translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-[var(--primary)]">
                  {userData.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-[var(--primary)]">
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="mt-16 text-center mb-6">
        <h1 className="text-xl font-bold">{userData.fullName}</h1>
        <p className="text-gray-600 text-sm">
          {getRoleDisplay(userRole)} • Member since 2023
        </p>
        {!isEditing && (
          <button 
            className="mt-2 inline-flex items-center text-sm text-[var(--primary)]"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={14} className="mr-1" />
            Edit Profile
          </button>
        )}
      </div>
      
      {/* Profile Details Form */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Personal Information</h2>
          {isEditing && (
            <button 
              className="flex items-center text-sm text-[var(--primary)]"
              onClick={handleSaveProfile}
            >
              <Save size={16} className="mr-1" />
              Save Changes
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex border-b pb-3">
            <div className="w-10 text-gray-500">
              <User size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Full Name</div>
              {isEditing ? (
                <input 
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{userData.fullName}</div>
              )}
            </div>
          </div>
          
          <div className="flex border-b pb-3">
            <div className="w-10 text-gray-500">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Email</div>
              {isEditing ? (
                <input 
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{userData.email}</div>
              )}
            </div>
          </div>
          
          <div className="flex border-b pb-3">
            <div className="w-10 text-gray-500">
              <Smartphone size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Phone Number</div>
              {isEditing ? (
                <input 
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{userData.phone}</div>
              )}
            </div>
          </div>
          
          <div className="flex border-b pb-3">
            <div className="w-10 text-gray-500">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Date of Birth</div>
              {isEditing ? (
                <input 
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{new Date(userData.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
              )}
            </div>
          </div>
          
          <div className="flex border-b pb-3">
            <div className="w-10 text-gray-500">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Address</div>
              {isEditing ? (
                <input 
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{userData.address}</div>
              )}
            </div>
          </div>
          
          <div className="flex">
            <div className="w-10 text-gray-500">
              <Smartphone size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Emergency Contact</div>
              {isEditing ? (
                <input 
                  type="tel"
                  name="emergencyContact"
                  value={userData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-[var(--primary)]"
                />
              ) : (
                <div>{userData.emergencyContact}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent Bookings</h2>
          <button className="text-sm text-[var(--primary)] flex items-center">
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentBookings.map(booking => (
            <div key={booking.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{booking.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  booking.status === 'Completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="text-sm">
                {booking.from} → {booking.to}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Saved Payment Methods */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Payment Methods</h2>
          <button className="text-sm text-[var(--primary)]">
            <span>Add New</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <CreditCard className="text-blue-700" size={20} />
                </div>
                <div>
                  <div className="font-medium">UPI</div>
                  <div className="text-sm text-gray-500">raj.sharma@okaxis</div>
                </div>
              </div>
              <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Default
              </div>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <CreditCard className="text-purple-700" size={20} />
              </div>
              <div>
                <div className="font-medium">Credit Card</div>
                <div className="text-sm text-gray-500">•••• •••• •••• 4532</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 