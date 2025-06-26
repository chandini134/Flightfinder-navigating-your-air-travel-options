import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import Authenticate from './pages/Authenticate';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import AllUsers from './pages/AllUsers';
import AllBookings from './pages/AllBookings';
import AllFlights from './pages/AllFlights';
import NewFlight from './pages/NewFlight';
import EditFlight from './pages/EditFlight';
import BookFlight from './pages/BookFlight';
import FlightAdmin from './pages/FlightAdmin';
import FlightBookings from './pages/FlightBookings';
import Flights from './pages/Flights';

import LoginProtector from './RouteProtectors/LoginProtector';
import AuthProtector from './RouteProtectors/AuthProtector';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginProtector><Authenticate /></LoginProtector>} />
        <Route path="/book-Flight/:id" element={<AuthProtector><BookFlight /></AuthProtector>} />
        <Route path="/bookings" element={<AuthProtector><Bookings /></AuthProtector>} />
        <Route path="/admin" element={<AuthProtector><Admin /></AuthProtector>} />
        <Route path="/all-users" element={<AuthProtector><AllUsers /></AuthProtector>} />
        <Route path="/all-bookings" element={<AuthProtector><AllBookings /></AuthProtector>} />
        <Route path="/all-flights" element={<AuthProtector><AllFlights /></AuthProtector>} />
        <Route path="/flight-admin" element={<AuthProtector><FlightAdmin /></AuthProtector>} />
        <Route path="/flight-bookings" element={<AuthProtector><FlightBookings /></AuthProtector>} />
        <Route path="/flights" element={<AuthProtector><Flights /></AuthProtector>} />
        <Route path="/new-flight" element={<AuthProtector><NewFlight /></AuthProtector>} />
        <Route path="/edit-flight/:id" element={<AuthProtector><EditFlight /></AuthProtector>} />
      </Routes>
    </div>
  );
}

export default App;
