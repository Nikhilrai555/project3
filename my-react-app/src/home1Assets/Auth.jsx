import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {GoogleLogin} from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/authSlice'
import { login, signup } from '../features/signinUpSlice'


const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
const Signup = () => {
   const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
   const navigate = useNavigate() 
   const dispatch = useDispatch()
   const [isSignup, setIsSignup] = useState(false)
   const [formData,setFormData] = useState(initialState)
   const handleSubmit = (e)=>{
    e.preventDefault()
    if(isSignup){
       dispatch(signup(formData))
       navigate('/home2')
    }
    else{
      dispatch(login(formData))
      navigate('/home2')
    }
   }
   const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
   }
   const switchMode = ()=>{
    setIsSignup((p)=>!p)
   }
   const handleGoogleLogin = async (response) => {
    const result = jwtDecode(response.credential)
    const token = response.credential
    console.log(result)
    console.log(token)  
    dispatch(setCredentials({ token, result }));
    navigate('/home2')

  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
  };
   
  return (

    <div>
      <button onClick={()=>{navigate('/')}}>back</button>
    <h2>{isSignup ? 'Signup' : 'Login'}</h2>
    <form onSubmit={handleSubmit}>
    {isSignup && (<>
      <input
          type="text"
          placeholder="First Name"
          name='firstName'
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name='lastName'
          onChange={handleChange}
        />
    </>)}
    <input
          type="text"
          placeholder="Email"
          name='email'  
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          name='password'
          onChange={handleChange}
        />
      {isSignup &&
      (<input
      type="text"
      placeholder="Confirm Password"
      name='confirmPassword'
      onChange={handleChange}
    />)}
   
    <button type ="submit" onClick={handleSubmit}>{isSignup ? 'Signup' : 'Login'}</button>
    </form>
    <GoogleLogin
      clientId= {clientID}
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      
    />
    <button onClick ={switchMode}> {isSignup? 'Already have an account? Signin': 'Don\'t have an account? Signup'}</button>
    <p></p>
    </div>
  )
}
export default Signup
