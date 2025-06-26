import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  
  
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  const handleNav = (path) => navigate(path);

  const renderCommon = (items) => (
    <div className="navbar">
      <h3>
        SB Flights {usertype === 'admin' ? '(Admin)' : usertype === 'flight-operator' ? '(Operator)' : ''}
      </h3>
      <div className="nav-options">
        {items.map(({ label, path, action }, idx) => (
          <p key={idx} onClick={action ? action : () => handleNav(path)}>
            {label}
          </p>
        ))}
      </div>
    </div>
  );

  if (!usertype) {
    return renderCommon([
      { label: 'Home', path: '/' },
      { label: 'Login', path: '/auth' },
    ]);
  }

  if (usertype === 'customer') {
    return renderCommon([
      { label: 'Home', path: '/' },
      { label: 'Bookings', path: '/bookings' },
      { label: 'Logout', action: logout },
    ]);
  }

  if (usertype === 'admin') {
    return renderCommon([
      { label: 'Home', path: '/admin' },
      { label: 'Users', path: '/all-users' },
      { label: 'Bookings', path: '/all-bookings' },
      { label: 'Flights', path: '/all-flights' },
      { label: 'Logout', action: logout },
    ]);
  }

  if (usertype === 'flight-operator') {
    return renderCommon([
      { label: 'Home', path: '/flight-admin' },
      { label: 'Bookings', path: '/flight-bookings' },
      { label: 'Flights', path: '/flights' },
      { label: 'Add Flight', path: '/new-flight' },
      { label: 'Logout', action: logout },
    ]);
  }

  return null; // fallback for unexpected usertype
};

export default Navbar;
