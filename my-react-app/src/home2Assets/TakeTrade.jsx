import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postTradeAsync } from "../features/tradeSlice";

const TakeTrade = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({ticker:'',type:'', description: '',price:'',tp:'',sl:'',strategy:'' });
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTrade.ticker.trim() !== '') {
      try {
       // const response = await axios.post('http://localhost:3001/trades', newTrade);
        dispatch(postTradeAsync(newTrade));
        navigate("/home2/feed");
        console.log(newTrade);
        setTrades([...trades, response.data]);
        setNewTrade({ticker:'',type:'', description: '',price:'',tp:'',sl:'',strategy:'' }); // Reset input fields
      } catch (error) {
        console.error('Error creating trade:', error);
      }
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await axios.get('http://localhost:3001/trades');
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

 
 useEffect(() => {
    fetchTrades();
  }, []);
  return (
    <div>
      <p>Trade Form</p>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ticker"
          value={newTrade.ticker}
          onChange={(e) => setNewTrade({ ...newTrade, ticker: e.target.value })}
        />
        <input
          type="text"
          placeholder="type"
          value={newTrade.type}
          onChange={(e) =>
            setNewTrade({ ...newTrade, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={newTrade.description}
          onChange={(e) => setNewTrade({ ...newTrade, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="price"
          value={newTrade.price}
          onChange={(e) => setNewTrade({ ...newTrade, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="tp"
          value={newTrade.tp}
          onChange={(e) => setNewTrade({ ...newTrade, tp: e.target.value })}
        />
        <input
          type="text"
          placeholder="sl"
          value={newTrade.sl}
          onChange={(e) => setNewTrade({ ...newTrade, sl: e.target.value })}
        />
        <input
          type="text"
          placeholder="strategy"
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
