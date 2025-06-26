import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FlightBookings = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, []);

  const fetchUserData = () => {
    const id = localStorage.getItem('userId');
    axios.get(`http://localhost:6002/fetch-user/${id}`)
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.error(err));
  };

  const fetchBookings = () => {
    axios.get('http://localhost:6002/fetch-bookings')
      .then((res) => setBookings(res.data.reverse()))
      .catch((err) => console.error(err));
  };

  const cancelTicket = (id) => {
    axios.put(`http://localhost:6002/cancel-ticket/${id}`)
      .then(() => {
        alert("Ticket cancelled!!");
        fetchBookings();
      })
      .catch((err) => console.error(err));
  };

  const username = localStorage.getItem('username');

  return (
    <div className="user-bookingsPage">
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval Required!!</h3>
            <p>Your application is under processing. It needs an approval from the administrator. Kindly please be patient!</p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <>
            <h1>Bookings</h1>
            <div className="user-bookings">
              {bookings
                .filter((booking) => booking.flightName === username)
                .map((booking) => (
                  <div className="user-booking" key={booking._id}>
                    <p><b>Booking ID:</b> {booking._id}</p>
                    <span>
                      <p><b>Mobile:</b> {booking.mobile}</p>
                      <p><b>Email:</b> {booking.email}</p>
                    </span>
                    <span>
                      <p><b>Flight Id:</b> {booking.flightId}</p>
                      <p><b>Flight name:</b> {booking.flightName}</p>
                    </span>
                    <span>
                      <p><b>On-boarding:</b> {booking.departure}</p>
                      <p><b>Destination:</b> {booking.destination}</p>
                    </span>
                    <span>
                      <div>
                        <p><b>Passengers:</b></p>
                        <ol>
                          {booking.passengers.map((passenger, i) => (
                            <li key={i}>
                              <p><b>Name:</b> {passenger.name}, <b>Age:</b> {passenger.age}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                      {booking.bookingStatus === 'confirmed' && (
                        <p><b>Seats:</b> {booking.seats}</p>
                      )}
                    </span>
                    <span>
                      <p><b>Booking date:</b> {booking.bookingDate.slice(0, 10)}</p>
                      <p><b>Journey date:</b> {booking.journeyDate.slice(0, 10)}</p>
                    </span>
                    <span>
                      <p><b>Journey Time:</b> {booking.journeyTime}</p>
                      <p><b>Total price:</b> {booking.totalPrice}</p>
                    </span>
                    <p style={{ color: booking.bookingStatus === 'cancelled' ? 'red' : 'inherit' }}>
                      <b>Booking status:</b> {booking.bookingStatus}
                    </p>
                    {booking.bookingStatus === 'confirmed' && (
                      <div>
                        <button className="btn btn-danger" onClick={() => cancelTicket(booking._id)}>
                          Cancel Ticket
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        ) : null
      ) : null}
    </div>
  );
};

export default FlightBookings;
