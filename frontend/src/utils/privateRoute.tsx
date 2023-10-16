import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ReactElement } from 'react'

type PropsType = {
    children: ReactElement | ReactElement[]
}

const PrivateRoute = ({children}: PropsType) =>{
    let {state} = useAuth(); 

    if(!state?.isAuthenticated)
    {
        return(
            <Navigate to="/login" />
        )
    }
    return children
}

export default PrivateRoute;