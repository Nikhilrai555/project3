import { useNavigate }  from "react-router-dom"
const Navbar = () => {
    const navigate = useNavigate()
    const user =null
  return (
   <div className="bg-slate-950 h-screen">
    <nav className="flex items-center justify-between p-6 lg:px-8">
      <h2 className="text-white font-bold text-xl">CryptoCalls</h2>
      <button className=" text-white" onClick={()=>{navigate('/auth')}}>Get Started</button>
      </nav>
      <div className="flex lg:flex-1 items-center justify-around h-full" > 
        <h1 className="text-xl font-bold text-white" >Welcome to our application</h1>
        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quia?</p>
      
        </div>
       
   </div>
  )
}
export default Navbar