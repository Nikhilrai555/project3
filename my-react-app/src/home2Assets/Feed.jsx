import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTradesAsync } from '../features/tradeSlice';
import Navbar2 from './Navbar2'

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTradesAsync());
  }, [dispatch]);

  const feedTrade = useSelector((state) => state.trade.trades);
  const isLoading = useSelector((state) => state.trade.isLoading);
  const error = useSelector((state) => state.trade.error);
  console.log(feedTrade);



  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
  {/* Navbar */}
  <Navbar2 />

  {/* Loading or Error Messages */}
  {isLoading && (
    <p className="text-blue-400 mt-4">Loading...</p>
  )}
  {error && (
    <p className="text-red-500 mt-4">Error: {error}</p>
  )}

  {/* Feed Content */}
  <ul className="w-full max-w-4xl p-4 space-y-4">
    {feedTrade && feedTrade.map((t, index) => (
      <li
        key={index}
        className="bg-gray-800 p-4 rounded shadow-md hover:bg-gray-700 transition"
      >
        <h3 className="text-lg font-bold mb-2">Stock Name: {t.ticker}</h3>
        {t.type && <p className="mb-1"><span className="font-semibold">Strategy Type:</span> {t.type}</p>}
        {t.description && <p className="mb-1"><span className="font-semibold">Description:</span> {t.description}</p>}
        {t.price && <p className="mb-1"><span className="font-semibold">Entry Price:</span> {t.price}</p>}
        {t.tp && <p className="mb-1"><span className="font-semibold">Take Profit:</span> {t.tp}</p>}
        {t.sl && <p className="mb-1"><span className="font-semibold">Stop Loss:</span> {t.sl}</p>}
        {t.pnl && <p className="mb-1"><span className="font-semibold">Profit & Loss:</span> {t.pnl}</p>}
        {t.creator && (
          <p className="mb-1"><span className="font-semibold">Created by:</span> {t.creator.name || t.creator.email}</p>
        )}
      </li>
    ))}
  </ul>

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

export default Feed;
