import  { lazy } from 'react';

// Regular Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const StationsPage = lazy(() => import('./pages/StationsPage'));
const StationDetailPage = lazy(() => import('./pages/StationDetailPage'));
const ScanPage = lazy(() => import('./pages/ScanPage'));
const NavigationPage = lazy(() => import('./pages/NavigationPage'));
const ARNavigationPage = lazy(() => import('./pages/ARNavigationPage'));
const TrainInfoPage = lazy(() => import('./pages/TrainInfoPage'));
const EmergencyPage = lazy(() => import('./pages/EmergencyPage'));
const AmenityDetailPage = lazy(() => import('./pages/AmenityDetailPage'));
const TicketBookingPage = lazy(() => import('./pages/TicketBookingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminListPage = lazy(() => import('./pages/AdminListPage'));
const AdminStationPage = lazy(() => import('./pages/AdminStationPage'));
const AdminDistrictPage = lazy(() => import('./pages/AdminDistrictPage'));

export const routes = [
  { path: '/', element: HomePage },
  { path: '/stations', element: StationsPage },
  { path: '/station/:id', element: StationDetailPage },
  { path: '/scan', element: ScanPage },
  { path: '/navigation/:stationId/:routeId', element: NavigationPage },
  { path: '/ar-navigation/:stationId/:routeId', element: ARNavigationPage },
  { path: '/info', element: TrainInfoPage },
  { path: '/emergency', element: EmergencyPage },
  { path: '/station/:stationId/amenity/:amenityId', element: AmenityDetailPage },
  { path: '/ticket-booking', element: TicketBookingPage },
  { path: '/auth', element: AuthPage },
  { path: '/profile', element: ProfilePage },
  { path: '/settings', element: SettingsPage },
  
  // Admin Routes
  { path: '/admin', element: AdminDashboard },
  { path: '/admin/list', element: AdminListPage },
  { path: '/admin/station/:id', element: AdminStationPage },
  { path: '/admin/district/:id', element: AdminDistrictPage }
];

// Auth check middleware
export const requireAuth = (role?: string) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userRole = sessionStorage.getItem('userRole');
  
  if (!isLoggedIn) {
    return false;
  }
  
  if (role && userRole !== role) {
    return false;
  }
  
  return true;
};
 