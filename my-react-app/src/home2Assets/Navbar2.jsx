import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('profile')));
  const [intervalId, setIntervalId] = useState(null);

  const logOut = () => {
    dispatch(logout());
    localStorage.removeItem('profile');
    setUser(null);
  };

  useEffect(() => {
    // Set user when component mounts
    setUser(JSON.parse(localStorage.getItem('profile')));

    // Check for changes in local storage every 500ms
    const id = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem('profile'));
      if (JSON.stringify(storedUser) !== JSON.stringify(user)) {
        setUser(storedUser);
      }
    }, 500);
    setIntervalId(id);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, intervalId]);

  return (
    <nav>
      <button onClick={() => navigate('/')}>Back</button>
      {user ? (
        <div>
          <h1>{user?.result?.name?.charAt(0)}</h1>
          <h1>{user?.result?.name}</h1>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <div><button onClick={() => navigate('/auth')}>Login</button></div>
      )}
      <button onClick={() => navigate('/home2/leaderboard')}>Leaderboard</button>
      <button onClick={() => navigate('/home2/feed')}>Feed</button>
      <button onClick={() => navigate('/home2/profile')}>Profile</button>
      <button onClick={() => navigate('/home2/takeTrade')}>Take Trade</button>
    </nav>
  );
};

export default Navbar2;
