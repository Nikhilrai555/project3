import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { useLocation } from "react-router-dom"
const Navbar2 = () => {
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const logOut = ()=>{
        dispatch(logout())
        setUser(null)
    }
    useEffect(()=>{
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[]) 
    console.log(user)
  return (
    <><nav>
        <button onClick={() => navigate('/')}>back</button>
        {user?
         (<div>
            <h1>{user.result.name.charAt(0)}</h1>
            <h1>{user.result.name}</h1>
            <button onClick={logOut}>Logout </button>
        </div>)
        :
        (<div><button onClick={() => navigate('/auth')}>Login</button></div>)}
    <button onClick={() => navigate('/home2/leaderboard')}>Leaderboard</button>
    <button onClick={() => navigate('/home2/feed')}>Feed</button>
    <button onClick={() => navigate('/home2/profile')}>Profile</button>
    <button onClick={() => navigate('/home2/takeTrade')}>Take Trade</button> 
    
    
     </nav></>
  )
}
export default Navbar2