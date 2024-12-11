import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from './Navbar2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, clearProfile } from '../features/userProfileSlice';
import { useNavigate } from 'react-router-dom';


const AnyUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);


  const { name, email, totalPnl, trades, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile(id));

    return () => {
      dispatch(clearProfile()); // Clear state on unmount
    };
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Navbar2 />
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-6">
        <p className="text-lg"><strong>Name:</strong> {name}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Total PnL:</strong> {totalPnl}</p>
      </div>
      <h3 className="text-xl font-semibold mb-2">Trade Calls</h3>
      <ul className="space-y-4">
        {trades.map((trade) => (
          <li key={trade._id} className="bg-gray-800 p-4 rounded">
            <p><strong>Ticker:</strong> {trade.ticker}</p>
            <p><strong>Type:</strong> {trade.type}</p>
            <p><strong>Description:</strong> {trade.description}</p>
            <p><strong>Entry Price:</strong> {trade.price}</p>
            <p><strong>Take Profit:</strong> {trade.tp}</p>
            <p><strong>Stop Loss:</strong> {trade.sl}</p>
            <p><strong>Profit/Loss:</strong> {trade.pnl}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/home2')}
        className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
      >
        Go Back
      </button>
    </div>
  );
};

export default AnyUserProfile;
