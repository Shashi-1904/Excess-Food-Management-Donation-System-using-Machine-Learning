import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from './pages/Homepage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import AdminNavbar from './components/AdminNavbar/AdminNavbar'
// import VolunteerNavbar from './components/Navbar/VolunteerNavbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Contact from './pages/Contact'
import { About } from "./pages/About"
import Error from './pages/Error'
import DonateFood from './pages/Doners/DonateFood'
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DonationTable from './pages/Admin/DonationTable';
import UsersTable from './pages/Admin/UsersTable';
// import VolunteerDashboard from "./pages/Volunteer/VolunteerDashboard";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  // const isVolunteerRoute = location.pathname.startsWith('/volunteer');

  return (
    <>
      {isAdminRoute ? (
        <AdminNavbar />
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
        <Route path='/donatefood' element={<DonateFood />} />
        <Route path='*' element={<Error />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/getdonations" element={<DonationTable />} />
          <Route path="/admin/getusers" element={<UsersTable />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
