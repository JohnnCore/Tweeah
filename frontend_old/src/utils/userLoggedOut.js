import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const UserLoggedOut = ({ children , ...rest}) =>{
    const navigate = useNavigate()
    
    let {user} = useContext(AuthContext)

    if (!user) {
        return children;
    } else {
        navigate(-1); // Navigate back to the previous page
        return null;
    }
}

export default UserLoggedOut;