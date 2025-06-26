import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:6002/fetch-bookings');
      setBookings(res.data.reverse());
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6002/cancel-ticket/${id}`);
      alert("Ticket cancelled!");
      fetchBookings();
    } catch (err) {
      console.error("Cancel ticket failed:", err);
    }
  };

  return (
    <div className="user-bookingsPage">
      <h1>Bookings</h1>

      <div className="user-bookings">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={() => cancelTicket(booking._id)}
          />
        ))}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, onCancel }) => (
  <div className="user-booking">
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

    <p style={{ color: booking.bookingStatus === 'cancelled' ? 'red' : 'black' }}>
      <b>Booking status:</b> {booking.bookingStatus}
    </p>

    {booking.bookingStatus === 'confirmed' && (
      <div>
        <button className="btn btn-danger" onClick={onCancel}>Cancel Ticket</button>
      </div>
    )}
  </div>
);

export default AllBookings;
