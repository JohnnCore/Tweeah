import React, { createContext, useContext } from 'react';
import useAxios from '../utils/useAxios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const api = useAxios(); // Create the API instance using the useAxios hook

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
