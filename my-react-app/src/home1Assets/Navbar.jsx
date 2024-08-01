import { useNavigate }  from "react-router-dom"
const Navbar = () => {
    const navigate = useNavigate()
    const user =null
  return (
   <div className="bg-gray-950 text-white ">
    <nav ><button className="bg-gray-950 text-white" onClick={()=>{navigate('/auth')}}>Get Started</button></nav>
        <h1 className="text-xl font-bold text-red-500" >Welcome to our application</h1>
        <button onClick={()=>{navigate('/auth')}
        }>Get Started</button>
   </div>
  )
}
export default Navbar