import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postTradeAsync } from "../features/tradeSlice";

const TakeTrade = () => {
  const navigate = useNavigate();
  const [newTrade, setNewTrade] = useState({
    ticker: '',
    type: '',
    description: '',
    price: '',
    tp: '',
    sl: '',
    strategy: ''
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTrade.ticker.trim() !== '') {
      try {
        console.log(newTrade);
        dispatch(postTradeAsync(newTrade));
        setNewTrade({
          ticker: '',
          type: '',
          description: '',
          price: '',
          tp: '',
          sl: '',
          strategy: ''
        });
        navigate("/home2/feed");
      } catch (error) {
        console.error('Error creating trade:', error);
      }
    }
  };

  return (
    <div>
      <p>Trade Form</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticker"
          value={newTrade.ticker}
          onChange={(e) => setNewTrade({ ...newTrade, ticker: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newTrade.type}
          onChange={(e) =>
            setNewTrade({ ...newTrade, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newTrade.description}
          onChange={(e) => setNewTrade({ ...newTrade, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newTrade.price}
          onChange={(e) => setNewTrade({ ...newTrade, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="TP"
          value={newTrade.tp}
          onChange={(e) => setNewTrade({ ...newTrade, tp: e.target.value })}
        />
        <input
          type="text"
          placeholder="SL"
          value={newTrade.sl}
          onChange={(e) => setNewTrade({ ...newTrade, sl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Strategy"
          value={newTrade.strategy}
          onChange={(e) => setNewTrade({ ...newTrade, strategy: e.target.value })}
        />
        <button type="submit">Submit Trade Idea</button>
      </form>

      <h2>Trades</h2>

      <button onClick={() => navigate('/home2')}>Go Back</button>
    </div>
  );
};

export default TakeTrade;
