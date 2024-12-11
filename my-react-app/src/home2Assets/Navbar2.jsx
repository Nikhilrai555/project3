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
    <nav className="bg-black text-white p-4 flex items-center justify-between">
      {/* Left Section */}
      <div>
        <button
          onClick={() => navigate('/home2')}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          Back
        </button>
      </div>

      {/* Middle Section */}
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-lg font-bold">
                {user?.result?.name?.charAt(0)}
              </span>
            </div>
            <h1 className="text-lg font-medium">{user?.result?.name}</h1>
            <button
              onClick={logOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/home2/leaderboard')}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          Leaderboard
        </button>
        <button
          onClick={() => navigate('/home2/feed')}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          Feed
        </button>
        <button
          onClick={() => navigate('/home2/profile')}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          Profile
        </button>
        <button
          onClick={() => navigate('/home2/takeTrade')}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          Take Trade
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
