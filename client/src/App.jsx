import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from './pages/Homepage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import AdminNavbar from './components/AdminNavbar/AdminNavbar'
import VolunteerNavbar from './components/VolunteerNavbar/VolunteerNavbar';
import HotelNavbar from './components/HotelNavbar/HotelNavbar';
import Register from './pages/Register'
import Login from './pages/Login'
import Contact from './pages/Contact'
import ProfilePage from './pages/ProfilePage';
import { About } from "./pages/About"
import Error from './pages/Error'
import DonateFood from './pages/Doners/DonateFood'
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DonationTable from './pages/Admin/DonationTable';
import UsersTable from './pages/Admin/UsersTable';
import VolunteerDashboard from './pages/volunteers/VolunteerDashboard';
import AssignedDonations from './pages/volunteers/AssignedDonations';
import GetRecommendation from './pages/volunteers/GetRecommendation';
import HotelDashboard from './pages/Hotels/HotelDashboard';
import HotelDashboardAnalytics from './pages/Hotels/HotelDashboardAnalytics';
import FoodRequestForm from './pages/NGOs/FoodRequestForm';
import RequestsTable from './pages/Admin/RequestsTable';
import Settings from './pages/Admin/Settings';
import MyDonationHistory from './pages/volunteers/MyDonationHistory';
import MyMatchingRequests from './pages/volunteers/MyMatchingRequests';
import VolunteerSettings from './pages/volunteers/VolunteerSettings';
import GoogleMap from './pages/volunteers/GoogleMap';
import HotelDonationHistory from './pages/Hotels/HotelDonationHistory';
import FoodWastage from './pages/Hotels/FoodWastage';
import HotelSettings from './pages/Hotels/HotelSettings';
import ContactMessages from './pages/Admin/ContactMessages';
import UserContactHistory from './pages/UserContactHistory';
import AddLogDetails from './pages/Hotels/AddLogDetails';
import NGODonations from './pages/NGOs/NGODonations';
import GetRoute from './pages/volunteers/GetRoute';
import GetDeliveryRoute from './pages/volunteers/GetDeliveryRoute';
import { useAuth } from "./store/auth";
import { LoadScript } from "@react-google-maps/api";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isVolunteerRoute = location.pathname.startsWith('/volunteer');
  const isHotelRoute = location.pathname.startsWith('/hotel');


  return (
    <>
      {isAdminRoute ? (
        <AdminNavbar />
      ) : isVolunteerRoute ? (
        <VolunteerNavbar />
      ) : isHotelRoute ? (
        <HotelNavbar />
      ) : (
        <Navbar />
      )}
    </>
  );
}

function App() {
  const { apiKey } = useAuth();
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/contact-history' element={<UserContactHistory />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/donatefood' element={<DonateFood />} />
          <Route path='/foodrequest' element={<FoodRequestForm />} />
          <Route path='*' element={<Error />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/getdonations" element={<DonationTable />} />
            <Route path="/admin/getusers" element={<UsersTable />} />
            <Route path="/admin/requests" element={<RequestsTable />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/contacts" element={<ContactMessages />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['volunteer']} />}>
            <Route path="/volunteer" element={<VolunteerDashboard />} />
            <Route path="/volunteer/assigneddonations" element={<AssignedDonations />} />
            <Route path="/volunteer/getrecommendations" element={<GetRecommendation />} />
            <Route path="/volunteer/mydonationhistory" element={<MyDonationHistory />} />
            <Route path="/volunteer/mymatchingrequests" element={<MyMatchingRequests />} />
            <Route path="/volunteer/mysettings" element={<VolunteerSettings />} />
            <Route path="/volunteer/gmap" element={<GoogleMap />} />
            <Route path="/getroute/:pickupLat/:pickupLng" element={<GetRoute />} />
            <Route path="/getdeliveryroute/:donationLat/:donationLng/:deliveredTo" element={<GetDeliveryRoute />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['hotel']} />}>
            <Route path="/hotel" element={<HotelDashboard />} />
            <Route path="/hotel/analytics" element={<HotelDashboardAnalytics />} />
            <Route path="/hotel/history" element={<HotelDonationHistory />} />
            <Route path="/hotel/foodwastage" element={<FoodWastage />} />
            <Route path="/hotel/settings" element={<HotelSettings />} />
            <Route path="/hotel/add-log" element={<AddLogDetails />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['NGO']} />}>
            <Route path="/ngo/donations" element={<NGODonations />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </LoadScript>
  );
}

export default App;
