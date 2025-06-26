import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:6002/fetch-bookings');
      setBookings(response.data.reverse());
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6002/cancel-ticket/${id}`);
      alert('Ticket cancelled!');
      fetchBookings();
    } catch (err) {
      alert('Cancellation failed!');
    }
  };

  const userBookings = bookings.filter((booking) => booking.user === userId);

  return (
    <div className="user-bookingsPage">
      <h1>My Bookings</h1>

      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="user-bookings">
          {userBookings.map((booking) => (
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
                <p><b>Passengers:</b></p>
                <ol>
                  {booking.passengers?.map((passenger, i) => (
                    <li key={i}>
                      <p><b>Name:</b> {passenger.name}, <b>Age:</b> {passenger.age}</p>
                    </li>
                  ))}
                </ol>
                {booking.bookingStatus === 'confirmed' && <p><b>Seats:</b> {booking.seats}</p>}
              </span>

              <span>
                <p><b>Booking date:</b> {booking.bookingDate?.slice(0, 10)}</p>
                <p><b>Journey date:</b> {booking.journeyDate?.slice(0, 10)}</p>
              </span>

              <span>
                <p><b>Journey Time:</b> {booking.journeyTime}</p>
                <p><b>Total price:</b> ₹{booking.totalPrice}</p>
              </span>

              <p style={{ color: booking.bookingStatus === 'cancelled' ? 'red' : 'black' }}>
                <b>Booking status:</b> {booking.bookingStatus}
              </p>

              {booking.bookingStatus === 'confirmed' && (
                <button className="btn btn-danger" onClick={() => cancelTicket(booking._id)}>
                  Cancel Ticket
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
