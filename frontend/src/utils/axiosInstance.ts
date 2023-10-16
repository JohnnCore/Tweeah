import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";


const baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
    const {dispatch, AUTH_ACTIONS, state} = useAuth();
    const accessToken = state.accessToken;
    const refreshToken = state.refreshToken;
    const [isRefreshingToken, setIsRefreshingToken] = useState(false);

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const RefreshToken = async () => {
        if (isRefreshingToken) {
            return;
        }

        setIsRefreshingToken(true);
        try {
            const response = await axios.post(`${baseURL}/api/users/token/refresh/`, {
                refresh: refreshToken,
            });

            dispatch({type:AUTH_ACTIONS.REFRESH, payload:{
                accessToken:response?.data?.access,
                refreshToken: response?.data?.refresh,
            }})
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Tempo de espera

            // localStorage.setItem('accessToken', response.data.access);
            // localStorage.setItem('refreshToken', response.data.refresh);

        } catch (error) {
            console.log(error);
            
        } finally {
            setIsRefreshingToken(false);
        }
    };

    axiosInstance.interceptors.request.use(
        (config) => {
            const NewAccessToken = localStorage.getItem("accessToken");
            console.log("axios",NewAccessToken);
            
            config.headers.Authorization = `Bearer ${NewAccessToken}`;
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
                        await RefreshToken();
                        return axiosInstance(originalConfig);
                    } catch (_error: any) {
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

