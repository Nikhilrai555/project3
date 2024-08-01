import {useNavigate} from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate();

  return (
    <div><p>Profile</p>
    <button onClick={() => navigate('/home2')}>Go Back</button>
    </div>
  )
}
export default Profile