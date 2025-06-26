import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookFlight.css';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ticketBookingDate } = useContext(GeneralContext);

  // Flight info
  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [startCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [startTime, setStartTime] = useState('');

  // User inputs
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate);
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const priceMultiplier = {
    'economy': 1,
    'premium-economy': 2,
    'business': 3,
    'first-class': 4
  };

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    try {
      const res = await axios.get(`http://localhost:6002/fetch-flight/${id}`);
      const data = res.data;
      setFlightName(data.flightName);
      setFlightId(data.flightId);
      setBasePrice(data.basePrice);
      setStartCity(data.origin);
      setDestinationCity(data.destination);
      setStartTime(data.departureTime);
    } catch (err) {
      console.error("Error fetching flight data:", err);
    }
  };

  const handlePassengerChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setNumberOfPassengers(count);
    setPassengerDetails(new Array(count).fill({}));
  };

  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  useEffect(() => {
    const multiplier = priceMultiplier[coachType] || 0;
    setTotalPrice(multiplier * basePrice * numberOfPassengers);
  }, [numberOfPassengers, coachType, basePrice]);

  const bookFlight = async () => {
    const bookingData = {
      user: localStorage.getItem('userId'),
      flight: id,
      flightName,
      flightId,
      departure: startCity,
      journeyTime: startTime,
      destination: destinationCity,
      email,
      mobile,
      passengers: passengerDetails,
      totalPrice,
      journeyDate,
      seatClass: coachType
    };

    try {
      await axios.post('http://localhost:6002/book-ticket', bookingData);
      alert("Booking successful!");
      navigate('/bookings');
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed!");
    }
  };

  return (
    <div className='BookFlightPage'>
      <div className="BookingFlightPageContainer">
        <h2>Book Ticket</h2>
        <span>
          <p><b>Flight Name:</b> {flightName}</p>
          <p><b>Flight No:</b> {flightId}</p>
        </span>
        <span>
          <p><b>Base Price:</b> ₹{basePrice}</p>
        </span>

        <span>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <label>Mobile</label>
          </div>
        </span>

        <span className='span3'>
          <div className="form-floating mb-3">
            <input type="number" className="form-control" value={numberOfPassengers} onChange={handlePassengerChange} />
            <label>No. of Passengers</label>
          </div>
          <div className="form-floating mb-3">
            <input type="date" className="form-control" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
            <label>Journey Date</label>
          </div>
          <div className="form-floating">
            <select className="form-select" value={coachType} onChange={(e) => setCoachType(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
            <label>Seat Class</label>
          </div>
        </span>

        <div className="new-passengers">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className='new-passenger' key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" value={passengerDetails[index]?.name || ''} onChange={(e) => handlePassengerDetailsChange(index, 'name', e.target.value)} />
                  <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" value={passengerDetails[index]?.age || ''} onChange={(e) => handlePassengerDetailsChange(index, 'age', e.target.value)} />
                  <label>Age</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h6><b>Total Price:</b> ₹{totalPrice}</h6>
        <button className='btn btn-primary' onClick={bookFlight}>Book Now</button>
      </div>
    </div>
  );
};

export default BookFlight;
