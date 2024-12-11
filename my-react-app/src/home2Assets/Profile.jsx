import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataAsync } from '../features/userSlice';
import {useNavigate} from "react-router-dom";
import Navbar2 from './Navbar2'
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error); 

  useEffect(() => {
    dispatch(fetchUserDataAsync());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-black text-white min-h-screen p-6">
    <Navbar2 />
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <p className="mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="mb-6">
        <span className="font-semibold">Total PnL:</span> {user.totalPnl}
      </p>

      <h3 className="text-xl font-bold mb-4">Your Trade Calls</h3>
      {user.trades && user.trades.length > 0 ? (
        <ul className="space-y-4">
          {user.trades.map((trade, index) => (
            <li
              key={trade._id}
              className="bg-gray-700 rounded-lg p-4 shadow-md"
            >
              <p>
                <span className="font-semibold">Stock Name:</span>{' '}
                {trade.ticker}
              </p>
              {trade.type && (
                <p>
                  <span className="font-semibold">Strategy Type:</span>{' '}
                  {trade.type}
                </p>
              )}
              {trade.description && (
                <p>
                  <span className="font-semibold">Description:</span>{' '}
                  {trade.description}
                </p>
              )}
              {trade.price && (
                <p>
                  <span className="font-semibold">Entry Price:</span>{' '}
                  {trade.price}
                </p>
              )}
              {trade.tp && (
                <p>
                  <span className="font-semibold">Take Profit:</span>{' '}
                  {trade.tp}
                </p>
              )}
              {trade.sl && (
                <p>
                  <span className="font-semibold">Stop Loss:</span> {trade.sl}
                </p>
              )}
              {trade.pnl && (
                <p>
                  <span className="font-semibold">Profit and Loss:</span>{' '}
                  {trade.pnl}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">You have not made any trade calls yet.</p>
      )}

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate('/home2')}
      >
        Go Back
      </button>
    </div>
  </div>
  );
};

export default Profile;


