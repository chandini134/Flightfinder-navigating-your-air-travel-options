import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFlight = () => {
  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    await axios.get(`http://localhost:6002/fetch-flight/${id}`).then((response) => {
      const data = response.data;
      setFlightName(data.flightName);
      setFlightId(data.flightId);
      setOrigin(data.origin);
      setDestination(data.destination);
      setTotalSeats(data.totalSeats);
      setBasePrice(data.basePrice);

      const formatTime = (timeStr) => {
        const [hour, minute] = timeStr.split(':');
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      };

      setStartTime(formatTime(data.departureTime));
      setArrivalTime(formatTime(data.arrivalTime));
    });
  };

  const handleSubmit = async () => {
    const inputs = {
      _id: id,
      flightName,
      flightId,
      origin,
      destination,
      departureTime: startTime,
      arrivalTime,
      basePrice,
      totalSeats,
    };

    await axios.put('http://localhost:6002/update-flight', inputs).then(() => {
      alert('Flight updated successfully!!');
      setFlightName('');
      setFlightId('');
      setOrigin('');
      setStartTime('');
      setArrivalTime('');
      setDestination('');
      setBasePrice(0);
      setTotalSeats(0);
    });
  };

  return (
    <div className='NewFlightPage'>
      <div className='NewFlightPageContainer'>
        <h2>Edit Flight</h2>

        <span className='newFlightSpan1'>
          <div className='form-floating mb-3'>
            <input type='text' className='form-control' id='floatingInputemail' value={flightName} onChange={(e) => setFlightName(e.target.value)} disabled />
            <label htmlFor='floatingInputemail'>Flight Name</label>
          </div>
          <div className='form-floating mb-3'>
            <input type='text' className='form-control' id='floatingInputmobile' value={flightId} onChange={(e) => setFlightId(e.target.value)} />
            <label htmlFor='floatingInputmobile'>Flight Id</label>
          </div>
        </span>

        <span>
          <div className='form-floating'>
            <select className='form-select form-select-sm mb-3' value={origin} onChange={(e) => setOrigin(e.target.value)}>
              <option value='' disabled>Select</option>
              <option value='Chennai'>Chennai</option>
              <option value='Banglore'>Banglore</option>
              <option value='Hyderabad'>Hyderabad</option>
              <option value='Mumbai'>Mumbai</option>
              <option value='Indore'>Indore</option>
              <option value='Delhi'>Delhi</option>
              <option value='Pune'>Pune</option>
              <option value='Trivendrum'>Trivendrum</option>
              <option value='Bhopal'>Bhopal</option>
              <option value='Kolkata'>Kolkata</option>
              <option value='varanasi'>varanasi</option>
              <option value='Jaipur'>Jaipur</option>
            </select>
            <label htmlFor='floatingSelect'>Departure City</label>
          </div>
          <div className='form-floating mb-3'>
            <input type='time' className='form-control' id='floatingInputmobile' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label htmlFor='floatingInputmobile'>Departure Time</label>
          </div>
        </span>

        <span>
          <div className='form-floating'>
            <select className='form-select form-select-sm mb-3' value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value='' disabled>Select</option>
              <option value='Chennai'>Chennai</option>
              <option value='Banglore'>Banglore</option>
              <option value='Hyderabad'>Hyderabad</option>
              <option value='Mumbai'>Mumbai</option>
              <option value='Indore'>Indore</option>
              <option value='Delhi'>Delhi</option>
              <option value='Pune'>Pune</option>
              <option value='Trivendrum'>Trivendrum</option>
              <option value='Bhopal'>Bhopal</option>
              <option value='Kolkata'>Kolkata</option>
              <option value='varanasi'>varanasi</option>
              <option value='Jaipur'>Jaipur</option>
            </select>
            <label htmlFor='floatingSelect'>Destination City</label>
          </div>
          <div className='form-floating mb-3'>
            <input type='time' className='form-control' id='floatingInputArrivalTime' value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
            <label htmlFor='floatingInputArrivalTime'>Arrival time</label>
          </div>
        </span>

        <span className='newFlightSpan2'>
          <div className='form-floating mb-3'>
            <input type='number' className='form-control' id='floatingInpuSeats' value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} />
            <label htmlFor='floatingInpuSeats'>Total seats</label>
          </div>
          <div className='form-floating mb-3'>
            <input type='number' className='form-control' id='floatingInputBasePrice' value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
            <label htmlFor='floatingInputBasePrice'>Base price</label>
          </div>
        </span>

        <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default EditFlight;
