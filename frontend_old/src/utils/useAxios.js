import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
    const { setUser, setAuthTokens } = useContext(AuthContext);
    const [isRefreshingToken, setIsRefreshingToken] = useState(false);
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    const refreshToken = async () => {
        if (isRefreshingToken) {
            return;
        }

        setIsRefreshingToken(true);
        try {
            const response = await axios.post(`${baseURL}/api/users/token/refresh/`, {
                refresh: authTokens?.refresh
            });

            localStorage.setItem('authTokens', JSON.stringify(response.data));
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
        } catch (error) {
            // Handle token refresh error
        } finally {
            setIsRefreshingToken(false);
        }
    };


// axiosInstance.interceptors.request.use(async req => {
    //     const user = jwtDecode(authTokens?.access);
    //     console.log(dayjs.unix(user.exp).diff(dayjs()));
    //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 5000;

    //     if (!isExpired) {
    //         return req;
    //     }

    //     if (!isRefreshingToken) 
    //     {
    //         setIsRefreshingToken(true);

    //         try {
    //             await refreshToken();

    //             const newAuthTokens = JSON.parse(localStorage.getItem('authTokens'));
    //             req.headers.Authorization = `Bearer ${newAuthTokens.access}`;
    //         } catch (error) {
    //             // Handle token refresh error
    //         } finally {
    //             setIsRefreshingToken(false);
    //         }
    //     }
    //     else 
    //     {
    //         await new Promise(resolve => setTimeout(resolve, 100));
    //     }

    //     return req;
    // });

    // return axiosInstance;

    axiosInstance.interceptors.request.use(
        (config) => {
            console.log(authTokens.access);
            const authTokenss = JSON.parse(localStorage.getItem('authTokens'));
            config.headers.Authorization = `Bearer ${authTokenss?.access}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            
            if (err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    console.log("err");

                    try {
                        await refreshToken();
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }

                        return Promise.reject(_error);
                    }
                }

                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }

            return Promise.reject(err);
        }
    );
    return axiosInstance;

}

export default useAxios;

