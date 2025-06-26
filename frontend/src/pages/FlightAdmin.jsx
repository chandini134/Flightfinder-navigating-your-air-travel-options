import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlightAdmin.css';
import { useNavigate } from 'react-router-dom';

const FlightAdmin = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchUserData();
    fetchCounts();
  }, []);

  const fetchUserData = () => {
    const id = localStorage.getItem('userId');
    axios.get(`http://localhost:6002/fetch-user/${id}`)
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.error(err));
  };

  const fetchCounts = () => {
    const username = localStorage.getItem('username');

    axios.get('http://localhost:6002/fetch-bookings')
      .then((res) => {
        const count = res.data.filter(b => b.flightName === username).length;
        setBookingCount(count);
      });

    axios.get('http://localhost:6002/fetch-flights')
      .then((res) => {
        const count = res.data.filter(f => f.flightName === username).length;
        setFlightsCount(count);
      });
  };

  return (
    <div className="flightAdmin-page">
      {userDetails && (
        <>
          {userDetails.approval === 'not-approved' && (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. It needs approval from the administrator. Please be patient!!</p>
            </div>
          )}

          {userDetails.approval === 'rejected' && (
            <div className="notApproved-box">
              <h3>Application Rejected!!</h3>
              <p>We are sorry to inform you that your application has been rejected.</p>
            </div>
          )}

          {userDetails.approval === 'approved' && (
            <div className="admin-page-cards">
              <div className="card admin-card transactions-card">
                <h4>Bookings</h4>
                <p>{bookingCount}</p>
                <button className="btn btn-primary" onClick={() => navigate('/flight-bookings')}>View all</button>
              </div>

              <div className="card admin-card deposits-card">
                <h4>Flights</h4>
                <p>{flightsCount}</p>
                <button className="btn btn-primary" onClick={() => navigate('/flights')}>View all</button>
              </div>

              <div className="card admin-card loans-card">
                <h4>New Flight</h4>
                <p>(new route)</p>
                <button className="btn btn-primary" onClick={() => navigate('/new-flight')}>Add now</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlightAdmin;
