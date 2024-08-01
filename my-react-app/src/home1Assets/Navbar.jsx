import { useNavigate }  from "react-router-dom"
const Navbar = () => {
    const navigate = useNavigate()
    const user =null
  return (
   <>
    <nav><button onClick={()=>{navigate('/auth')}}>Get Started</button></nav>
        <h1>Welcome to our application</h1>
        <button onClick={()=>{navigate('/auth')}
        }>Get Started</button>
   </>
  )
}
export default Navbar