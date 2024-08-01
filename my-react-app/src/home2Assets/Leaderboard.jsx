import { useNavigate } from 'react-router-dom'
const Leaderboard = () => {
    const navigate = useNavigate()
  return (
    <div><h1>Leaderboard</h1>
    <button onClick={() => navigate('/home2')}>Back</button>
    </div>
  )
}
export default Leaderboard