import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home1 from './Home1'
import Home2 from './Home2'
import Leaderboard from './home2Assets/Leaderboard'
import Feed from './home2Assets/Feed'
import Auth from './home1Assets/Auth'
import Logout from './home2Assets/Logout'
import Profile from './home2Assets/Profile'
import TakeTrade from './home2Assets/TakeTrade'



function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/home2" element={<Home2 />} />
      <Route path="/home2/leaderboard" element={<Leaderboard/>}/>
      <Route path ="/home2/feed" element={<Feed/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/home2/logout" element={<Logout/>}/>
      <Route path="/home2/profile" element={<Profile/>}/>
      <Route path="/home2/takeTrade" element={<TakeTrade/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
