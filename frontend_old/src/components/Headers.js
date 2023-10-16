import React, {useContext} from "react";

import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const  Header = () =>{
    let {user, logoutUser} = useContext(AuthContext)

    return(
        <div style={{zIndex:'100px'}}>
            <Link to={''}>Home</Link>
            <span>|</span>
            {user ? 
                (
                    <Link onClick={logoutUser}>Logout</Link>
                )
                :
                (
                    <Link to={'/login'}>Login</Link>
                )
            }
            {user && <p>Hello {user.name}</p>}
            
        </div>
    )
}

export default Header;