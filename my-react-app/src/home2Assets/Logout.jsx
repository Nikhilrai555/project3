import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    return (
    <div><button onClick={() => navigate('/')}>Logout</button></div>
  )
}
export default Logout