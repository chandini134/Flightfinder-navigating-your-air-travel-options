import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const {
    setUsername,
    setEmail,
    setPassword,
    usertype,
    setUsertype,
    register,
     // appears unused here, you may remove if truly not needed
  } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingUsername"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="floatingUsername">Username</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <select
        className="form-select form-select-lg mb-3"
        value={usertype}
        onChange={(e) => setUsertype(e.target.value)}
        required
      >
        <option value="">Select user type</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
        <option value="flight-operator">Flight Operator</option>
      </select>

      <button type="submit" className="btn btn-primary">
        Sign up
      </button>

      <p>
        Already registered?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setIsLogin(true)}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Register;
