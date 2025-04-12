import  { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StationsPage from './pages/StationsPage';
import StationDetailPage from './pages/StationDetailPage';
import ScanPage from './pages/ScanPage';
import NavigationPage from './pages/NavigationPage';
import ARNavigationPage from './pages/ARNavigationPage';
import TrainInfoPage from './pages/TrainInfoPage';
import EmergencyPage from './pages/EmergencyPage';
import AmenityDetailPage from './pages/AmenityDetailPage';
import TicketBookingPage from './pages/TicketBookingPage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/stations" element={<Layout><StationsPage /></Layout>} />
      <Route path="/station/:id" element={<Layout><StationDetailPage /></Layout>} />
      <Route path="/scan" element={<Layout><ScanPage /></Layout>} />
      <Route path="/navigation/:stationId/:routeId" element={<Layout><NavigationPage /></Layout>} />
      <Route path="/ar-navigation/:stationId/:routeId" element={<ARNavigationPage />} />
      <Route path="/info" element={<Layout><TrainInfoPage /></Layout>} />
      <Route path="/emergency" element={<Layout><EmergencyPage /></Layout>} />
      <Route path="/station/:stationId/amenity/:amenityId" element={<Layout><AmenityDetailPage /></Layout>} />
      <Route path="/ticket-booking" element={<Layout><TicketBookingPage /></Layout>} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
    </Routes>
  );
}
 