import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardAsync } from '../features/leaderBoardSlice';
import { useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2'



const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.leaderboard);
  const navigate = useNavigate();
  const handleRowClick = (userId) => {
    navigate(`/home2/profile/${userId}`);
  };


  useEffect(() => {
    dispatch(fetchLeaderboardAsync());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      <Navbar2/>
  {/* Title */}
  <h2 className="text-2xl font-bold my-6">Leaderboard</h2>

  {/* Table */}
  <div className="overflow-x-auto w-full max-w-4xl">
    <table className="table-auto w-full border-collapse border border-gray-700">
      {/* Table Header */}
      <thead className="bg-gray-800 text-left">
        <tr>
          <th className="px-4 py-2 border border-gray-700">Rank</th>
          <th className="px-4 py-2 border border-gray-700">Name</th>
          <th className="px-4 py-2 border border-gray-700">Email</th>
          <th className="px-4 py-2 border border-gray-700">Total PnL</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            onClick={()=>handleRowClick(user._id)}
            className={`hover:bg-gray-700 transition ${
              index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
            }`}
          >
            <td className="px-4 py-2 border border-gray-700 text-center">
              {index + 1}
            </td>
            <td className="px-4 py-2 border border-gray-700">{user.name}</td>
            <td className="px-4 py-2 border border-gray-700">{user.email}</td>
            <td
              className={`px-4 py-2 border border-gray-700 ${
                user.totalPnl >= 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {user.totalPnl}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Back Button */}
  <button
    onClick={() => navigate('/home2')}
    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold"
  >
    Go Back
  </button>
</div>

  );
};

export default Leaderboard;
