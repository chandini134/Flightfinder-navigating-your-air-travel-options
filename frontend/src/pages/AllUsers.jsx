import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/allUsers.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:6002/fetch-users');
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const renderUserGroup = (type, heading, labelMap) => {
    const filtered = users.filter(user => user.usertype === type);

    return (
      <>
        <h2>{heading}</h2>
        <div className="all-users">
          {filtered.length === 0 ? (
            <p>No {type} accounts found.</p>
          ) : (
            filtered.map(user => (
              <div className="user" key={user._id}>
                <p><b>{labelMap.id}:</b> {user._id}</p>
                <p><b>{labelMap.name}:</b> {user.username}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="all-users-page">
        {renderUserGroup('customer', 'All Customers', {
          id: 'User ID',
          name: 'Username'
        })}

        {renderUserGroup('flight-operator', 'Flight Operators', {
          id: 'Operator ID',
          name: 'Flight Name'
        })}
      </div>
    </>
  );
};

export default AllUsers;
