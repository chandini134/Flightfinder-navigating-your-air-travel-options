import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchFlights();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:6002/fetch-user/${id}`);
      setUserDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6002/fetch-flights');
      setFlights(response.data);
    } catch (err) {
      console.error("Failed to fetch flights", err);
    }
  };

  const renderFlightCard = (flight) => (
    <div className="allFlights-Flight" key={flight._id}>
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
        <p><b>Base price:</b> {flight.basePrice}</p>
        <p><b>Total seats:</b> {flight.totalSeats}</p>
      </span>
      <div>
        <button className="btn btn-primary" onClick={() => navigate(`/edit-flight/${flight._id}`)}>
          Edit details
        </button>
      </div>
    </div>
  );

  return (
    <div className="allFlightsPage">
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval Required!!</h3>
            <p>Your application is under processing. It needs approval from the administrator. Please be patient.</p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <>
            <h1>All Flights</h1>
            <div className="allFlights">
              {flights
                .filter((flight) => flight.flightName === localStorage.getItem('username'))
                .map(renderFlightCard)}
            </div>
          </>
        ) : null
      ) : null}
    </div>
  );
};

export default Flights;
