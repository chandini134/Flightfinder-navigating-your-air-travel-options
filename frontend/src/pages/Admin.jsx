import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, bookingRes, flightRes] = await Promise.all([
        axios.get('http://localhost:6002/fetch-users'),
        axios.get('http://localhost:6002/fetch-bookings'),
        axios.get('http://localhost:6002/fetch-flights')
      ]);

      setUserCount(userRes.data.length - 1);
      setUsers(userRes.data.filter(user => user.approval === 'not-approved'));
      setBookingCount(bookingRes.data.length);
      setFlightsCount(flightRes.data.length);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleOperatorAction = async (id, action) => {
    try {
      const endpoint = action === 'approve' ? 'approve-operator' : 'reject-operator';
      await axios.post(`http://localhost:6002/${endpoint}`, { id });
      alert(`Operator ${action}d!`);
      fetchData();
    } catch (err) {
      console.error(`${action} request failed`, err);
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-page-cards">
        <DashboardCard title="Users" count={userCount} onClick={() => navigate('/all-users')} />
        <DashboardCard title="Bookings" count={bookingCount} onClick={() => navigate('/all-bookings')} />
        <DashboardCard title="Flights" count={flightsCount} onClick={() => navigate('/all-flights')} />
      </div>

      <div className="admin-requests-container">
        <h3>New Operator Applications</h3>
        <div className="admin-requests">
          {users.length === 0 ? (
            <p>No new requests..</p>
          ) : (
            users.map(user => (
              <div className="admin-request" key={user._id}>
                <span><b>Operator name:</b> {user.username}</span>
                <span><b>Operator email:</b> {user.email}</span>
                <div className="admin-request-actions">
                  <button className="btn btn-primary" onClick={() => handleOperatorAction(user._id, 'approve')}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleOperatorAction(user._id, 'reject')}>Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, onClick }) => (
  <div className="card admin-card">
    <h4>{title}</h4>
    <p>{count}</p>
    <button className="btn btn-primary" onClick={onClick}>View all</button>
  </div>
);

export default Admin;
