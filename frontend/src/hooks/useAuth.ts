import {useContext} from 'react';
import AuthContext, {UseAuthContextType} from '../context/authContext';

const useAuth = (): UseAuthContextType => {
    return useContext(AuthContext)
}

export default useAuth;