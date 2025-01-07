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
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/donatefood' element={<DonateFood />} />
        <Route path='*' element={<Error />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/getdonations" element={<DonationTable />} />
          <Route path="/admin/getusers" element={<UsersTable />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['volunteer']} />}>
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/volunteer/assigneddonations" element={<AssignedDonations />} />
          <Route path="/volunteer/getrecommendations" element={<GetRecommendation />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['hotel']} />}>
          <Route path="/hotel" element={<HotelDashboard />} />
          <Route path="/hotel/analytics" element={<HotelDashboardAnalytics />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
