import {useContext} from 'react';
import AuthContext from '../context/authContext';
import {UseAuthContextType} from '../context/authContext';

const useAuth = (): UseAuthContextType => {
    return useContext(AuthContext)
}

export default useAuth;