import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [Flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, [navigate]);

  const fetchFlights = async () => {
    const now = new Date();
    const depDate = new Date(departureDate);
    const retDate = new Date(returnDate);

    if (checkBox) {
      if (departure && destination && departureDate && returnDate) {
        if (depDate > now && retDate > depDate) {
          setError('');
          const response = await axios.get('http://localhost:6002/fetch-flights');
          setFlights(response.data);
        } else {
          setError('Please check the dates');
        }
      } else {
        setError('Please fill all the inputs');
      }
    } else {
      if (departure && destination && departureDate) {
        if (depDate >= now) {
          setError('');
          const response = await axios.get('http://localhost:6002/fetch-flights');
          setFlights(response.data);
        } else {
          setError('Please check the dates');
        }
      } else {
        setError('Please fill all the inputs');
      }
    }
  };

  const handleTicketBooking = (id, origin, dest) => {
    if (userId) {
      setTicketBookingDate(origin === departure ? departureDate : returnDate);
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  };

  const renderFlight = (flight) => (
    <div className="Flight" key={flight._id}>
      <div>
        <p><b>{flight.flightName}</b></p>
        <p><b>Flight Number:</b> {flight.flightId}</p>
      </div>
      <div>
        <p><b>Start:</b> {flight.origin}</p>
        <p><b>Departure Time:</b> {flight.departureTime}</p>
      </div>
      <div>
        <p><b>Destination:</b> {flight.destination}</p>
        <p><b>Arrival Time:</b> {flight.arrivalTime}</p>
      </div>
      <div>
        <p><b>Starting Price:</b> {flight.basePrice}</p>
        <p><b>Available Seats:</b> {flight.totalSeats}</p>
      </div>
      <button className="btn btn-primary" onClick={() => handleTicketBooking(flight._id, flight.origin, flight.destination)}>Book Now</button>
    </div>
  );

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">Embark on an Extraordinary Flight Booking Adventure!</h1>
          <p className="banner-p">
            Unleash your travel desires and book extraordinary flight journeys that will transport you to unforgettable destinations, igniting a sense of adventure like never before.
          </p>
        </div>

        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" onChange={(e) => setCheckBox(e.target.checked)} />
            <label className="form-check-label">Return journey</label>
          </div>

          <div className="Flight-search-container-body">
            {/* Departure City */}
            <div className="form-floating">
              <select className="form-select" value={departure} onChange={(e) => setDeparture(e.target.value)}>
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label>Departure City</label>
            </div>

            {/* Destination City */}
            <div className="form-floating">
              <select className="form-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label>Destination City</label>
            </div>

            {/* Departure Date */}
            <div className="form-floating mb-3">
              <input type="date" className="form-control" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              <label>Journey date</label>
            </div>

            {/* Return Date */}
            {checkBox && (
              <div className="form-floating mb-3">
                <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                <label>Return date</label>
              </div>
            )}

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>
          </div>
          <p className="text-danger">{error}</p>
        </div>

        {/* Flight Results */}
        {Flights.length > 0 && (
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            <div className="Flights">
              {Flights.filter(f => {
                const match1 = f.origin === departure && f.destination === destination;
                const match2 = checkBox && f.origin === destination && f.destination === departure;
                return match1 || match2;
              }).length > 0 ? (
                Flights.filter(f => {
                  const match1 = f.origin === departure && f.destination === destination;
                  const match2 = checkBox && f.origin === destination && f.destination === departure;
                  return match1 || match2;
                }).map(renderFlight)
              ) : (
                <h3>No Flights</h3>
              )}
            </div>
          </div>
        )}

      </div>

      {/* About Section */}
      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            Welcome to our flight ticket booking app, dedicated to providing an exceptional travel experience. Whether commuting, exploring new cities, or planning scenic trips, our app offers diverse flight options tailored to your needs.
          </p>
          <p className="section-description">
            Enjoy a user-friendly interface, easy schedule browsing, fare comparisons, and smooth ticket booking. Customize departure times, seats, and preferences in a few clicks.
          </p>
          <p className="section-description">
            Let us help you create lasting travel memories with confidence, comfort, and convenience.
          </p>
          <span><h5>2023 SB FlightConnect - &copy; All rights reserved</h5></span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
