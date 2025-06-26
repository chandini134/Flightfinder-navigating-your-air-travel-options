import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';

const NewFlight = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [flightName, setFlightName] = useState(localStorage.getItem('username'));
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [journeyDate, setJourneyDate] = useState(''); // ✅ Added

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:6002/fetch-user/${id}`);
        setUserDetails(response.data);
      } catch (err) {
        console.error("User fetch error", err);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const inputs = {
      flightName,
      flightId,
      origin,
      destination,
      departureTime: startTime,
      arrivalTime,
      basePrice,
      totalSeats,
      journeyDate // ✅ Send it to backend
    };

    try {
      await axios.post('http://localhost:6002/add-flight', inputs); // ✅ Corrected endpoint
      alert('Flight added successfully!');
      setFlightId('');
      setOrigin('');
      setDestination('');
      setStartTime('');
      setArrivalTime('');
      setTotalSeats(0);
      setBasePrice(0);
      setJourneyDate('');
    } catch (err) {
      alert('Something went wrong while adding flight.');
      console.error(err);
    }
  };

  const cityOptions = [
    "Chennai", "Banglore", "Hyderabad", "Mumbai", "Indore",
    "Delhi", "Pune", "Trivendrum", "Bhopal", "Kolkata", "varanasi", "Jaipur"
  ];

  return (
    <div className='NewFlightPage'>
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval Required!!</h3>
            <p>Your application is under processing. It needs an approval from the administrator. Kindly please be patient!!</p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <div className="NewFlightPageContainer">
            <h2>Add New Flight</h2>

            <span className='newFlightSpan1'>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={flightName} disabled />
                <label>Flight Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={flightId} onChange={(e) => setFlightId(e.target.value)} />
                <label>Flight ID</label>
              </div>
            </span>

            <span>
              <div className="form-floating">
                <select className="form-select mb-3" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  <option value="" disabled>Select</option>
                  {cityOptions.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <label>Departure City</label>
              </div>
              <div className="form-floating mb-3">
                <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>Departure Time</label>
              </div>
            </span>

            <span>
              <div className="form-floating">
                <select className="form-select mb-3" value={destination} onChange={(e) => setDestination(e.target.value)}>
                  <option value="" disabled>Select</option>
                  {cityOptions.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <label>Destination City</label>
              </div>
              <div className="form-floating mb-3">
                <input type="time" className="form-control" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
                <label>Arrival Time</label>
              </div>
            </span>

            <span className='newFlightSpan2'>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} />
                <label>Total Seats</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} />
                <label>Base Price</label>
              </div>
            </span>

            {/* ✅ Journey Date */}
            <div className="form-floating mb-3">
              <input type="date" className="form-control" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
              <label>Journey Date</label>
            </div>

            <button className='btn btn-primary' onClick={handleSubmit}>Add Now</button>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default NewFlight;
