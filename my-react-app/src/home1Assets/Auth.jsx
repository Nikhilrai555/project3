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

    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-6">
  {/* Back Button */}
  <button
    onClick={() => {
      navigate('/');
    }}
    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
  >
    Back
  </button>

  {/* Form Title */}
  <h2 className="text-2xl font-bold">{isSignup ? 'Signup' : 'Login'}</h2>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    className="bg-gray-800 p-6 rounded shadow-md space-y-4 w-80"
  >
    {isSignup && (
      <>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </>
    )}
    <input
      type="text"
      placeholder="Email"
      name="email"
      onChange={handleChange}
      className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      onChange={handleChange}
      className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {isSignup && (
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}

    <button
      type="submit"
      onClick={handleSubmit}
      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold"
    >
      {isSignup ? 'Signup' : 'Login'}
    </button>
  </form>

  {/* Toggle Between Login/Signup */}
  <button
    onClick={switchMode}
    className="text-blue-400 hover:underline"
  >
    {isSignup
      ? 'Already have an account? Sign in'
      : "Don't have an account? Sign up"}
  </button>
</div>

  )
}
export default Signup
