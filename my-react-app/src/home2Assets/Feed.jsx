import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTradesAsync } from '../features/tradeSlice';

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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
      
          {feedTrade && feedTrade.map((t, index) => (
          <li key={index}>
            <strong>{t.ticker}</strong>
            {t.type && <p>{t.type}</p>}
            {t.description && <p>{t.description}</p>}
           {t.price && <p>{t.price}</p>}
            {t.tp && <p>{t.tp}</p>}
           {t.sl && <p>{t.sl}</p>}
           {t.pnl && <p>{t.pnl}</p>}
           {t.creator && <p>Created by: {t.creator.name || t.creator.email}</p>}

   </li>
        ))}
      </ul>
      <button onClick={() => navigate('/home2')}>Go Back</button>
    </div>
  );
};

export default Feed;
