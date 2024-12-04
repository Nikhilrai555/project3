import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataAsync } from '../features/userSlice';
import {useNavigate} from "react-router-dom";
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
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Total PnL: {user.totalPnl}</p>
      <button onClick={() => navigate('/home2')}>Go Back</button>
    </div>
  );
};

export default Profile;


