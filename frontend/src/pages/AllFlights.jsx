import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllFlights.css';
import { useNavigate } from 'react-router-dom';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6002/fetch-flights');
      setFlights(response.data);
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  return (
    <div className="allFlightsPage">
      <h1>All Flights</h1>

      <div className="allFlights">
        {flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          flights.map(flight => (
            <FlightCard key={flight._id} flight={flight} />
          ))
        )}
      </div>
    </div>
  );
};

const FlightCard = ({ flight }) => (
  <div className="allFlights-Flight">
    <p><b>_id:</b> {flight._id}</p>

    <span>
      <p><b>Flight Id:</b> {flight.flightId}</p>
      <p><b>Flight name:</b> {flight.flightName}</p>
    </span>

    <span>
      <p><b>Starting station:</b> {flight.origin}</p>
      <p><b>Departure time:</b> {flight.departureTime}</p>
    </span>

    <span>
      <p><b>Destination:</b> {flight.destination}</p>
      <p><b>Arrival time:</b> {flight.arrivalTime}</p>
    </span>

    <span>
      <p><b>Base price:</b> ₹{flight.basePrice}</p>
      <p><b>Total seats:</b> {flight.totalSeats}</p>
    </span>
  </div>
);

export default AllFlights;
