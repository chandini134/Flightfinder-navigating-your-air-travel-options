import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType) {
      navigate('/');
    } else {
      setIsAllowed(true);
    }
  }, [navigate]);

  return isAllowed ? children : null;
};

export default AuthProtector;
